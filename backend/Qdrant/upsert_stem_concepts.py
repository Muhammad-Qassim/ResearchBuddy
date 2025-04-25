import csv
from uuid import uuid4
from tqdm import tqdm

from qdrant_client.models import PointStruct
from my_qdrant_client import qdrant_client, create_collection_if_not_exists
from embed_utils import embed_text

import os

COLLECTION_NAME = "stem-concepts"
CSV_FILE = os.path.join(os.path.dirname(__file__), "data2", "stem_concepts.csv")

# Ensure the collection exists
create_collection_if_not_exists(COLLECTION_NAME)

def load_concepts_by_domain(csv_file=CSV_FILE):
    concepts = []
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            concepts.append({
                "label": row["label"],
                "domain": row["domain"]
            })
    return concepts

def batch(iterable, size=256):
    for i in range(0, len(iterable), size):
        yield iterable[i:i + size]

def main():
    print("Loading concepts...")
    concepts = load_concepts_by_domain()
    texts = [c["label"] for c in concepts]

    print("Embedding concepts...")
    vectors = embed_text(texts)

    points = []
    for i, concept in enumerate(concepts):
        point = PointStruct(
            id=str(uuid4()),
            vector=vectors[i],
            payload={
                "label": concept["label"],
                "domain": concept["domain"]
            }
        )
        points.append(point)

    print(f"Uploading {len(points)} points to Qdrant in batches...")
    for batch_points in tqdm(batch(points, size=256), desc="Batches"):
        qdrant_client.upsert(collection_name=COLLECTION_NAME, points=batch_points)

    print("Done! All concepts upserted successfully.")

if __name__ == "__main__":
    main()
