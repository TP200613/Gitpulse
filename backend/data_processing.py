from collections import defaultdict
from datetime import datetime, date


def sort_repos_by_recency(all_commits):
    """Return repo names sorted by most recent commit date, newest first."""
    latest_commit_per_repo = defaultdict(str)

    for commit in all_commits:
        repo_name = commit["repo"]
        commit_date = commit["date"]
        if commit_date > latest_commit_per_repo[repo_name]:
            latest_commit_per_repo[repo_name] = commit_date

    sorted_repo_names = sorted(
        latest_commit_per_repo.keys(),
        key=lambda name: latest_commit_per_repo[name],
        reverse=True
    )

    return sorted_repo_names, latest_commit_per_repo


def get_display_repos(sorted_repo_names, search_term="", limit=10):
    """
    Returns repos to display:
    - If no search term: first `limit` repos by recency
    - If search term given: ALL matches, regardless of position in the full list
    """
    if search_term:
        search_term = search_term.lower()
        return [name for name in sorted_repo_names if search_term in name.lower()]
    else:
        return sorted_repo_names[:limit]


def day_number_to_name(day_number):
    """Convert SQLite's day-of-week number ('0'-'6') to a readable name."""
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[int(day_number)]


def calculate_longest_streak(commit_days):
    """
    Given a sorted list of date strings (oldest to newest),
    find the longest run of consecutive calendar days.
    """
    if not commit_days:
        return 0

    dates = [datetime.strptime(day, "%Y-%m-%d").date() for day in commit_days]

    longest_streak = 1
    current_streak = 1

    for i in range(1, len(dates)):
        gap = (dates[i] - dates[i - 1]).days

        if gap == 1:
            current_streak += 1
            longest_streak = max(longest_streak, current_streak)
        elif gap > 1:
            current_streak = 1

    return longest_streak


def calculate_current_streak(commit_days):
    """
    Given a sorted list of date strings (oldest to newest),
    find the current active streak — consecutive days ending today or yesterday.
    """
    if not commit_days:
        return 0

    dates = [datetime.strptime(day, "%Y-%m-%d").date() for day in commit_days]
    today = date.today()

    last_commit_date = dates[-1]
    gap_from_today = (today - last_commit_date).days

    if gap_from_today > 1:
        return 0

    streak = 1
    for i in range(len(dates) - 1, 0, -1):
        gap = (dates[i] - dates[i - 1]).days
        if gap == 1:
            streak += 1
        else:
            break

    return streak


def calculate_consistency_score(active_days_90, current_streak, total_commits, active_days_total):
    """
    Calculate a 0-100 consistency score based on recency, streak, and regularity.
    """
    recency_score = min(active_days_90 / 90, 1) * 40
    streak_score = min(current_streak / 30, 1) * 30

    avg_commits_per_active_day = total_commits / active_days_total if active_days_total > 0 else 0
    regularity_score = min(avg_commits_per_active_day / 5, 1) * 30

    total_score = recency_score + streak_score + regularity_score
    return round(total_score)


def generate_roast_or_boost(top_language, most_active_day, current_streak, active_days_90, consistency_score, mode="boost"):
    """
    Generate a short, fun one-liner based on the user's stats.
    mode: "boost" for positive framing, "roast" for playful negative framing.
    """
    lines = []

    if current_streak >= 7:
        lines.append({
            "boost": f"🔥 On fire — {current_streak}-day streak and counting.",
            "roast": f"Suspiciously consistent. {current_streak} days straight? Touch grass."
        })
    elif current_streak == 0:
        lines.append({
            "boost": "Fresh start energy — every streak begins with day one.",
            "roast": "👀 GitHub's been quiet. Did you forget your password?"
        })

    if active_days_90 < 10:
        lines.append({
            "boost": "Quality over quantity — every commit counts.",
            "roast": f"Only {active_days_90} active days in 90? GitHub misses you."
        })
    elif active_days_90 >= 30:
        lines.append({
            "boost": f"Seriously active — {active_days_90} days of commits in the last 90.",
            "roast": "Do you sleep, or is it all commits all the way down?"
        })

    if most_active_day in ["Saturday", "Sunday"]:
        lines.append({
            "boost": "Weekend warrior — coding for love, not obligation.",
            "roast": "Weekday's free, but Saturday? That's when the real work happens."
        })
    else:
        lines.append({
            "boost": f"Disciplined weekday coder — {most_active_day} is your power day.",
            "roast": f"{most_active_day} grinder. Weekends are apparently for resting, unlike normal devs."
        })

    if consistency_score >= 70:
        lines.append({
            "boost": "Elite-tier consistency. This is what discipline looks like.",
            "roast": "Suspiciously disciplined. Are you even human?"
        })
    elif consistency_score < 30:
        lines.append({
            "boost": "Plenty of room to build momentum — every commit is a step forward.",
            "roast": "Consistency score lower than your coffee intake should allow."
        })

    if not lines:
        lines.append({
            "boost": "Steady and real — that's what counts.",
            "roast": "Nothing dramatic here. Just quietly getting it done."
        })

    import random
    chosen = random.choice(lines)
    return chosen[mode]