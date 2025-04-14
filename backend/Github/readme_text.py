import requests

def fetch_readme_text(url):
    """
    Fetches the README text from a given URL.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching README text: {e}")
        return None
