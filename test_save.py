from database import save_commits
from github_api import fetch_all_repos, fetch_all_commits

repos = fetch_all_repos('TP200613')
commits = fetch_all_commits('TP200613', repos)

print(f"About to save {len(commits)} commits...")
save_commits('TP200613', commits)
print("Done calling save_commits")