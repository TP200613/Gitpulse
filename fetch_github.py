from github_api import fetch_all_repos, fetch_all_commits
from data_processing import sort_repos_by_recency, get_display_repos
from database import create_tables, save_repos, save_commits, clear_user_data

create_tables()

username = input("Enter a GitHub username: ")

repos = fetch_all_repos(username)
print(f"Found {len(repos)} repos for {username}")

all_commits = fetch_all_commits(username, repos)
print(f"Total commits found across all repos: {len(all_commits)}")

clear_user_data(username)
save_repos(username, repos)
save_commits(username, all_commits)

sorted_names, latest_dates = sort_repos_by_recency(all_commits)

print(f"\nShowing top 10 of {len(sorted_names)} repos:")
for name in get_display_repos(sorted_names):
    print(f"- {name} (last commit: {latest_dates[name]})")

if len(sorted_names) > 10:
    search_term = input("\nMore repos exist — search for one (or press Enter to skip): ")
    if search_term:
        matches = get_display_repos(sorted_names, search_term=search_term)
        print(f"\nMatching repos: {matches}")


from database import get_top_language

top_lang = get_top_language(username)
if top_lang:
    print(f"\nMost-used language: {top_lang[0]} ({top_lang[1]} repos)")
else:
    print("\nNo language data available.")

from database import get_most_active_day
from data_processing import day_number_to_name

most_active = get_most_active_day(username)
if most_active:
    day_name = day_number_to_name(most_active[0])
    print(f"Most active day: {day_name} ({most_active[1]} commits)")

from database import get_distinct_commit_dates
from data_processing import calculate_longest_streak

commit_days = get_distinct_commit_dates(username)
longest = calculate_longest_streak(commit_days)
print(f"Longest commit streak: {longest} day(s)")

from database import get_top_repos

top_repos = get_top_repos(username)
print("\nTop repos (non-fork, by stars+forks):")
for repo_name, stars, forks in top_repos:
    print(f"- {repo_name}: {stars} stars, {forks} forks")

from database import get_active_days_last_90

active_days = get_active_days_last_90(username)
print(f"Active days in the last 90 days: {active_days}")