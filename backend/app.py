import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from ResearchPaper.semantic_scholar import get_metadata
from ResearchPaper.arxiv import fetch_and_store_arxiv_pdf
from ResearchPaper.pdf_processing import extract_text_from_mongo_pdf
from ResearchPaper.t5_summarizer import load_model, summarize_paper
from Github.github_api import search_top_FIVE_repos
from Github.readme_text import fetch_readme_text
from Github.gemini_summarizer import summarize_repo

load_dotenv()

app = Flask(__name__)

model, tokenizer = load_model('KASHU101/flan-t5-lora-summarization-optimized-small')

gemini_model= "models/gemini-2.0-flash"

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
    
@app.route("/test-pdf-processing", methods=["POST"])
def test_pdf_processing():
    data = request.json
    arxiv_id = data.get('arxiv_id')

    if not arxiv_id:
        return jsonify({"error": "No ArXiv ID provided!"}), 400

    try:
        # Extract text from PDF stored in MongoDB
        pdf_text = extract_text_from_mongo_pdf('research_papers', 'pdfs', arxiv_id)
        return jsonify({"success": "Text extracted successfully", "text": pdf_text[:500] + "... (truncated)"})
    except Exception as e:
        return jsonify({"error": f"Failed to extract text: {str(e)}"}), 500

@app.route("/test-summarization", methods=["POST"])
def test_summarization():
    data = request.json
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided!"}), 400

    try:
        summary = summarize_paper(model, tokenizer, text)
        return jsonify({"success": "Summary generated successfully", "summary": summary})
    except Exception as e:
        return jsonify({"error": f"Failed to generate summary: {str(e)}"}), 500


@app.route("/process-query", methods=["POST"])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def process_query():
    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({"error": "No query provided!"}), 400

    metadata_list = get_metadata(query)
    if not metadata_list:
        return jsonify({"error": "No suitable papers found!"}), 404

    results = []

    for metadata in metadata_list:
        arxiv_id = metadata['arxivId']

        try:
            fetch_and_store_arxiv_pdf(arxiv_id, 'research_papers', 'pdfs')
        except Exception as e:
            results.append({
                "metadata": metadata,
                "error": f"Failed to fetch PDF: {str(e)}"
            })
            continue

        try:
            pdf_text = extract_text_from_mongo_pdf('research_papers', 'pdfs', arxiv_id)
        except Exception as e:
            results.append({
                "metadata": metadata,
                "error": f"Failed to extract text: {str(e)}"
            })
            continue

        try:
            summary = summarize_paper(model, tokenizer, pdf_text)
        except Exception as e:
            summary = f"Error summarizing: {str(e)}"

        results.append({
            "metadata": metadata,
            "summary": summary
        })

    return jsonify(results)

@app.route("/process-query", methods=["OPTIONS"])
def preflight():
    return '', 204

# GitHub API route

@app.route("/test-github", methods=["POST"])
def test_github():
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided!"}), 400
    
    repo = search_top_FIVE_repos(query, sort_by="default", order="desc", num_results=5)

    if not repo:
        return jsonify({"error": "No repositories found!"}), 404
    
    return jsonify(repo)

@app.route("/test-github-readme", methods=["POST"])
def test_github_readme():
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "No URL provided!"}), 400

    # Fetch README text from the given URL
    readme_text = fetch_readme_text(url)
    
    if not readme_text:
        return jsonify({"error": "Failed to fetch README text!"}), 500
    
    return jsonify({"readme_text": readme_text})  

@app.route("/test-github-readme-summarize", methods=["POST"])
def test_github_readme_summarize():
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "No URL provided!"}), 400

    # Fetch README text from the given URL
    readme_text = fetch_readme_text(url)
    
    if not readme_text:
        return jsonify({"error": "Failed to fetch README text!"}), 500

    # Summarize the README text using the gemini API
    summary = summarize_repo(gemini_model, readme_text)

    return jsonify({"summary": summary})

@app.route("/process-github-query", methods=["POST"])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def process_github_query():
    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({"error": "No query provided!"}), 400

    # Search for top repositories on GitHub
    repo = search_top_FIVE_repos(query, sort_by="default", order="desc", num_results=5)

    if not repo:
        return jsonify({"error": "No repositories found!"}), 404

    results = []

    for repository in repo:
        readme_url = repository["Readme"]
        readme_text = fetch_readme_text(readme_url)

        if not readme_text:
            results.append({
                "repository": repository,
                "error": "Failed to fetch README text!"
            })
            continue

        summary = summarize_repo(gemini_model, readme_text)

        results.append({
            "repository": repository,
            "summary": summary
        })

    return jsonify(results)

@app.route("/process-github-query", methods=["OPTIONS"])
def preflight_github():
    return '', 204


CORS(app)

if __name__ == "__main__":
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")))
