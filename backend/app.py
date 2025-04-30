import os
from flask import Flask, Response, jsonify, request, stream_with_context
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from ResearchPaper.semantic_scholar import get_metadata
from ResearchPaper.arxiv import fetch_and_store_arxiv_pdf
from ResearchPaper.pdf_processing import extract_text_from_mongo_pdf
from ResearchPaper.t5_summarizer import load_model, summarize_paper
from Github.github_api import search_top_FIVE_repos
from Github.readme_text import fetch_readme_text
from Github.gemini_summarizer import summarize_repo
from Overview.overview import get_wikipedia_intro
from Overview.overview import get_related_topics_from_qdrant
from Youtube.youtube_api import fetch_youtube_FIVE_video
from Youtube.youtube_api import fetch_youtube_transcript
from Chatbot.rag_handler import run_rag_query
from ResearchPaper.remote_summarizer import summarize_remotely

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

# WIKIPEDIA API route

@app.route("/test-wikipedia", methods=["POST"])
def test_wikipedia():
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided!"}), 400

    # Fetch summary from Wikipedia
    summary = get_wikipedia_intro(query)
    
    if not summary:
        return jsonify({"error": "No summary found!"}), 404
    
    return jsonify({"summary": summary})

@app.route("/overview", methods=["POST"])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def overview():
    topic = request.json.get("topic")
    if not topic:
        return jsonify({"error": "No topic provided!"}), 400
    summary = get_wikipedia_intro(topic)
    related_topics = get_related_topics_from_qdrant(topic)

    if not summary:
        return jsonify({"error": "No summary found!"}), 404
    return jsonify({
        "summary": summary,
        "related_topics": related_topics
    })


# Youtube

@app.route("/test-youtube", methods=["POST"])
def test_youtube():
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided!"}), 400

    # Fetch top 5 YouTube videos based on the query
    videos = fetch_youtube_FIVE_video(query, max_results=5)
    
    if not videos:
        return jsonify({"error": "No videos found!"}), 404
    
    return jsonify(videos)

@app.route("/test-youtube-transcript", methods=["POST"])
def test_transcript():
    data = request.json
    video_id = data.get('video_id')

    if not video_id:
        return jsonify({"error": "No video ID provided!"}), 400
    
    transcript = fetch_youtube_transcript(video_id)

    if not transcript:
        return jsonify({"error": "No transcript found!"}), 404
    
    return jsonify({"transcript": transcript})


# Chatbot API route

@app.route("/chatbot/init", methods=["GET"])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def chatbot_init():
    topic = request.args.get("topic", default="your topic")
    welcome_message = f"Welcome to ResearchBuddy! What do you want to know about {topic}?"
    return jsonify({"message": welcome_message})

@app.route("/chatbot/query", methods=["POST"])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def chatbot_query():
    data = request.get_json()
    user_query = data.get("query")
    topic = data.get("topic")

    if not user_query or not topic:
        return jsonify({"error": "Both 'query' and 'topic' are required."}), 400

    def generate():
        result = run_rag_query(user_query, topic)
        for chunk in result["response"].split("\n"):
            yield f"data: {chunk}\n\n"
        yield f"data: [END]\n\n"

    return Response(stream_with_context(generate()), mimetype="text/event-stream")

@app.route("/chatbot/query", methods=["OPTIONS"])
def preflight_chatbot():
    return '', 204



CORS(app)

if __name__ == "__main__":
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")))
