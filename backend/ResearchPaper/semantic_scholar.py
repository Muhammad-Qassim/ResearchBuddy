import requests
import os

API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")
BASE_URL = "https://api.semanticscholar.org/graph/v1"

def get_metadata(query):
    url = f"{BASE_URL}/paper/search"
    headers = {"x-api-key": API_KEY}
    params = {
        "query": query,
        "fields": "title,authors,citationCount,year,externalIds",
        "limit": 1
    }

    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        papers = response.json().get("data", [])
        if papers:
            paper = max(papers, key=lambda x: x["citationCount"])
            return {
                "title": paper["title"],
                "authors": [author["name"] for author in paper["authors"]],
                "citationCount": paper["citationCount"],
                "DOI": paper["externalIds"].get("DOI", "N/A"),
                "year": paper["year"],
                "URL": f"https://arxiv.org/pdf/{paper['externalIds'].get('ArXiv', '')}"
            }
    else:
        print(f"Error: {response.status_code}, {response.json()}")
        return {}
