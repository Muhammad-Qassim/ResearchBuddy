from pdfminer.high_level import extract_text
from io import BytesIO
from MongoDB.mongodb_helper import get_pdf_from_mongo, delete_pdf_from_mongo

def extract_text_from_mongo_pdf(db_name, collection_name, document_name):
    pdf_content = get_pdf_from_mongo(db_name, collection_name, document_name)
    if not pdf_content:
        raise Exception("PDF not found in MongoDB")

    # Extract text from the PDF content
    text = extract_text(BytesIO(pdf_content))
    
    # Optionally, clean up by deleting the PDF from MongoDB after extraction
    delete_pdf_from_mongo(db_name, collection_name, document_name)

    return text