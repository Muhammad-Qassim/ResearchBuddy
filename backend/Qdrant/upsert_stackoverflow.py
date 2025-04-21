import json
from uuid import uuid4

from qdrant_client.models import PointStruct
from my_qdrant_client import qdrant_client, create_collection_if_not_exists
from embed_utils import embed_text

COLLECTION_NAME = "stackexchange-qa"
JSON_FILE = "data/stackoverflow_qa.json" 

create_collection_if_not_exists(COLLECTION_NAME)

def load_qna_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def payload(entry):
    return {
        "title": entry.get("question_title", ""),
        "question": entry.get("question_body", ""),
        "answer": entry.get("answer_body", ""),
        "tags": entry.get("tags", []),
        "source": "stackoverflow_qa.json" # Name of the source file 
    }

def main():
    qna_list = load_qna_data(JSON_FILE)

    points = []
    for entry in qna_list:
        payload = payload(entry)
        combined_text = f"{payload['title']}\n{payload['question']}\n{payload['answer']}"
        vector = embed_text([combined_text])[0]

        point = PointStruct(
            id=str(uuid4()),
            vector=vector,
            payload=payload
        )
        points.append(point)

    qdrant_client.upsert(collection_name=COLLECTION_NAME, points=points)

if __name__ == "__main__":
    main()
