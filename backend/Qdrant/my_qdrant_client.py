from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, CollectionStatus
import os

from dotenv import load_dotenv
load_dotenv()


QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

# Initialize client
qdrant_client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)

def create_collection_if_not_exists(name="stackexchange-qa", vector_size=384, distance=Distance.COSINE):
    collections = qdrant_client.get_collections().collections
    if any(c.name == name for c in collections):
        print(f"Collection '{name}' already exists.")
        return

    print(f"Creating collection '{name}'...")
    qdrant_client.recreate_collection(
        collection_name=name,
        vectors_config=VectorParams(size=vector_size, distance=distance)
    )
    print(f"Collection '{name}' created.")

def collection_ready(name="stackexchange-qa"):
    info = qdrant_client.get_collection(name)
    return info.status == CollectionStatus.GREEN
