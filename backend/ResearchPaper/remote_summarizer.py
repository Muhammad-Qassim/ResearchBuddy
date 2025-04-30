import requests
import os
WEBAI_API_URL = os.getenv("WEBAI_API_URL")

def summarize_remotely(text):
    try:
        response = requests.post(WEBAI_API_URL, json={"text": text})
        if response.status_code == 200:
            return response.json().get("summary", "")
        else:
            return f"[ERROR {response.status_code}] Failed to summarize."
    except Exception as e:
        return f"[EXCEPTION] {e}"
