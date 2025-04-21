import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from Qdrant.embed_utils import embed_text
from Qdrant.my_qdrant_client import qdrant_client


COLLECTION_NAME = "stackexchange-qa"

def retrieve_similar_qna(query: str, top_k: int = 5):
    query_vector = embed_text([query])[0]

    search_result = qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=top_k
    )

    results = []
    for point in search_result:
        payload = point.payload
        results.append({
            "title": payload.get("title", ""),
            "question": payload.get("question", ""),
            "answer": payload.get("answer", ""),
            "tags": payload.get("tags", []),
            "source": payload.get("source", ""),
            "score": point.score
        })

    return results

