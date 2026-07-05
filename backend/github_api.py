import os
from dotenv import load_dotenv
import requests

load_dotenv()
token = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {token}",
    "Accept": "application/vnd.github+json"
}


def fetch_all_repos(username):
    """Fetch all public repos for a username, handling pagination."""
    all_repos = []
    page = 1
    url = f"https://api.github.com/users/{username}/repos"

    while True:
        params = {"per_page": 100, "page": page}
        response = requests.get(url, headers=headers, params=params)

        if response.status_code != 200:
            break

        data = response.json()
        if not data:
            break

        all_repos.extend(data)
        page += 1

    return all_repos


def fetch_all_commits(username, repos):
    """Fetch all commits across all given repos, handling pagination."""
    all_commits = []

    for repo in repos:
        repo_name = repo["name"]
        commits_url = f"https://api.github.com/repos/{username}/{repo_name}/commits"

        page = 1
        while True:
            params = {"per_page": 100, "page": page}
            response = requests.get(commits_url, headers=headers, params=params)

            if response.status_code != 200:
                break

            data = response.json()
            if not data:
                break

            for commit in data:
                all_commits.append({
                    "repo": repo_name,
                    "date": commit["commit"]["author"]["date"],
                    "message": commit["commit"]["message"]
                })

            page += 1

    return all_commits