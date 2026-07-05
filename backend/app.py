from flask import Flask, jsonify
from flask_cors import CORS
from github_api import fetch_all_repos, fetch_all_commits
from database import (
    create_tables, save_repos, save_commits, clear_user_data,
    get_top_language, get_most_active_day, get_top_repos,
    get_distinct_commit_dates, get_active_days_last_90
)
from data_processing import (
    calculate_longest_streak, day_number_to_name,
    calculate_current_streak, calculate_consistency_score,
    generate_roast_or_boost
)

app = Flask(__name__)
CORS(app)
create_tables()


@app.route("/")
def home():
    return "GitPulse backend is running."


@app.route("/api/snapshot/<username>")
def get_snapshot(username):
    repos = fetch_all_repos(username)
    all_commits = fetch_all_commits(username, repos)

    clear_user_data(username)
    save_repos(username, repos)
    save_commits(username, all_commits)

    top_lang = get_top_language(username)
    most_active = get_most_active_day(username)
    commit_days = get_distinct_commit_dates(username)
    longest_streak = calculate_longest_streak(commit_days)
    top_repos = get_top_repos(username)
    active_days_90 = get_active_days_last_90(username)

    current_streak = calculate_current_streak(commit_days)
    consistency_score = calculate_consistency_score(
        active_days_90, current_streak, len(all_commits), len(commit_days)
    )

    boost_message = generate_roast_or_boost(
        top_lang[0] if top_lang else "Unknown",
        day_number_to_name(most_active[0]) if most_active else "Unknown",
        current_streak, active_days_90, consistency_score, mode="boost"
    )

    roast_message = generate_roast_or_boost(
        top_lang[0] if top_lang else "Unknown",
        day_number_to_name(most_active[0]) if most_active else "Unknown",
        current_streak, active_days_90, consistency_score, mode="roast"
    )

    return jsonify({
        "username": username,
        "total_repos": len(repos),
        "total_commits": len(all_commits),
        "top_language": top_lang[0] if top_lang else None,
        "most_active_day": day_number_to_name(most_active[0]) if most_active else None,
        "longest_streak": longest_streak,
        "current_streak": current_streak,
        "consistency_score": consistency_score,
        "boost_message": boost_message,
        "roast_message": roast_message,
        "top_repos": [
            {"name": r[0], "stars": r[1], "forks": r[2]} for r in top_repos
        ],
        "active_days_last_90": active_days_90
    })


if __name__ == "__main__":
    app.run(debug=True)