import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from ResearchPaper.semantic_scholar import get_metadata
from ResearchPaper.arxiv import fetch_and_store_arxiv_pdf


load_dotenv()

app = Flask(__name__)

# TESTING API
@app.route("/test")
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def home():
    return jsonify({"message": "Flask API is running! yeah!"})

@app.route("/test-metadata", methods=["POST"])
def test_metadata():
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided!"}), 400

    # Fetch Metadata using Semantic Scholar
    metadata = get_metadata(query)
    
    if not metadata:
        return jsonify({"error": "No metadata found!"}), 404
    
    return jsonify(metadata)

@app.route("/test-arxiv", methods=["POST"])
def test_arxiv():
    data = request.json
    arxiv_id = data.get('arxiv_id')
    
    if not arxiv_id:
        return jsonify({"error": "No ArXiv ID provided!"}), 400

    try:
        # Fetch and store PDF using ArXiv ID
        pdf_id = fetch_and_store_arxiv_pdf(arxiv_id, 'research_papers', 'pdfs')
        return jsonify({"success": f"PDF successfully fetched and stored with ID: {pdf_id}"})
    except Exception as e:
        return jsonify({"error": f"Failed to fetch PDF: {str(e)}"}), 500
    

CORS(app)

if __name__ == "__main__":
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")))
