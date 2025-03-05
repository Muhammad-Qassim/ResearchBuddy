import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin


load_dotenv()

app = Flask(__name__)

@app.route("/")
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def home():
    return jsonify({"message": "Flask API is running! yeah!"})


CORS(app)

if __name__ == "__main__":
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")))
