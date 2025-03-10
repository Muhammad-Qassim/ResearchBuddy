import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from ResearchPaper.semantic_scholar import get_metadata


load_dotenv()

app = Flask(__name__)

# TESTING API
@app.route("/test")
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def home():
    return jsonify({"message": "Flask API is running! yeah!"})

# PROCESSING PAPERS
@app.route("/process-papers", methods=["GET"])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True) 
def process():
    query = request.args.get('query')

    if not query:
        return jsonify({"error": "No query provided!"}), 400
    

    # Get metadata from semantic scholar
    metadata = get_metadata(query)
    if not metadata:
        return jsonify({"error": "No metadata found!"}), 404
    
    return jsonify({
        "metadata": metadata,
    })
    

CORS(app)

if __name__ == "__main__":
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")))
