import re
from bs4 import BeautifulSoup
from Chatbot.retriever import retrieve_similar_qna
from Chatbot.gemini_prompt import build_prompt
import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-2.0-flash")

def clean_html(text: str) -> str:
    return BeautifulSoup(text, "html.parser").get_text(separator=" ", strip=True)

def smart_truncate(text: str, max_sentences: int = 2) -> str:
    sentences = re.split(r'(?<=[.!?]) +', text.strip())
    return ' '.join(sentences[:max_sentences])

def run_rag_query(user_query: str, topic: str, top_k: int = 5) -> dict:
    context_qna = retrieve_similar_qna(user_query, top_k=top_k)

    cleaned_context = [
        {
            "title": clean_html(item.get("title", "")),
            "question": clean_html(item.get("question", "")),
            "answer": smart_truncate(clean_html(item.get("answer", "")))
        } for item in context_qna
    ]

    full_prompt = build_prompt(user_query, topic, cleaned_context)
    response = model.generate_content(full_prompt)

    return {
        "response": response.text.strip()
    }
