import requests
import os

API_KEY = os.getenv("GITHUB_API_KEY")
BASE_URL = "https://api.github.com/search/repositories"


def search_top_FIVE_repos(query, sort_by="stars", order="desc", num_results=5):
    """
    Searches for the top 5 repositories on GitHub based on the query.
    The results are sorted by the specified criteria (stars, forks, or updated).
    """
    headers = { 
        'Accept': 'application/vnd.github.v3+json',
    }
    params = {
        "q": query,
        "sort": sort_by,
        "order": order,
        "per_page": num_results
    }

    try:
        response = requests.get(BASE_URL, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        items = data.get("items", [])
        top_repos = []
        for repo in items:
            repo_info = {
                "name": repo["name"],
                "owner": repo["owner"]["login"],
                "stars": repo["stargazers_count"],
                "forks": repo["forks_count"],
                "updated_at": repo["updated_at"],
                "url": repo["html_url"],
                "default_branch": repo["default_branch"],
                "Readme": get_raw_readme_url(repo["owner"]["login"], repo["name"], repo["default_branch"]),
            }
            top_repos.append(repo_info)
        return top_repos
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from GitHub API: {e}")
        return []
        
def get_raw_readme_url(owner, repo, branch="main"):
    """
    Constructs the raw URL for the README file of a GitHub repository.
    """
    return f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md"

    


