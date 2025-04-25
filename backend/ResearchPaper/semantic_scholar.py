import requests
import os
from ratelimit import limits, sleep_and_retry
from tenacity import retry, wait_exponential, stop_after_attempt, retry_if_exception_type


from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")
BASE_URL = "https://api.semanticscholar.org/graph/v1"

def get_metadata(query):
    url = f"{BASE_URL}/paper/search"
    headers = {"x-api-key": API_KEY}
    params = {
        "query": query,
        "fields": "title,authors,citationCount,year,externalIds",
        "limit": 30  
    }

    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        papers = response.json().get("data", [])
        
        # Filter for papers with an ArXiv ID
        arxiv_papers = [paper for paper in papers if "ArXiv" in paper["externalIds"]]

        top_papers = sorted(arxiv_papers, key=lambda x: x["citationCount"], reverse=True)[:5]
        
        return [{
            "title": paper["title"],
            "authors": [a["name"] for a in paper["authors"]],
            "citationCount": paper["citationCount"],
            "DOI": paper["externalIds"].get("DOI", "N/A"),
            "year": paper["year"],
            "arxivId": paper["externalIds"]["ArXiv"],
            "URL": f"https://arxiv.org/pdf/{paper['externalIds']['ArXiv']}.pdf"
        } for paper in top_papers]
    else:
        print(f"Error: {response.status_code}, {response.json()}")
        return {}