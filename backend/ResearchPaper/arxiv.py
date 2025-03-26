# arxiv.py
import requests
from MongoDB.mongodb_helper import insert_pdf_to_mongo

def fetch_and_store_arxiv_pdf(arxiv_id, db_name='research_papers', collection_name='pdfs'):
    """
    Fetches the arXiv PDF for the given ArXiv ID and stores it in MongoDB.

    Args:
        arxiv_id (str): The ArXiv ID to fetch.
        db_name (str): The database name.
        collection_name (str): The collection name.
        
    Returns:
        str: The ID of the stored PDF document in MongoDB.
    """

    pdf_url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
    response = requests.get(pdf_url)

    if response.status_code == 200:
        pdf_content = response.content
        document_name = arxiv_id 
        pdf_id = insert_pdf_to_mongo(db_name, collection_name, pdf_content, document_name)
        return pdf_id
    else:
        raise Exception("Failed to fetch PDF from ArXiv")