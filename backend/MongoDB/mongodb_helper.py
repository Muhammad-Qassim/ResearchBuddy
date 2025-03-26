import os
from pymongo import MongoClient
from bson.binary import Binary
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_mongo_client():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise ValueError("MONGO_URI is not set in the environment variables.")
    return MongoClient(mongo_uri)

def insert_pdf_to_mongo(db_name, collection_name, pdf_content, document_name):
    client = get_mongo_client()
    db = client[db_name]
    collection = db[collection_name]
    return collection.insert_one({"name": document_name, "pdf_content": Binary(pdf_content)}).inserted_id

def get_pdf_from_mongo(db_name, collection_name, document_name):
    client = get_mongo_client()
    db = client[db_name]
    collection = db[collection_name]
    document = collection.find_one({"name": document_name})
    return document['pdf_content'] if document else None

def delete_pdf_from_mongo(db_name, collection_name, document_name):
    client = get_mongo_client()
    db = client[db_name]
    collection = db[collection_name]
    collection.delete_one({"name": document_name})
