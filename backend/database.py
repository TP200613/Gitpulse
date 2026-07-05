import sqlite3


def get_connection():
    """Creates/connects to the SQLite database file."""
    conn = sqlite3.connect("gitpulse.db")
    return conn


def create_tables():
    """Creates the repos and commits tables if they don't already exist."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS repos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            repo_name TEXT NOT NULL,
            language TEXT,
            stars INTEGER,
            forks INTEGER,
            created_at TEXT,
            is_fork BOOLEAN
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS commits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            repo_name TEXT NOT NULL,
            commit_date TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()
    print("Tables created (or already existed).")


def save_repos(username, repos):
    """Insert fetched repo data into the repos table."""
    conn = get_connection()
    cursor = conn.cursor()

    for repo in repos:
        cursor.execute("""
            INSERT INTO repos (username, repo_name, language, stars, forks, created_at, is_fork)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            username,
            repo["name"],
            repo["language"],
            repo["stargazers_count"],
            repo["forks_count"],
            repo["created_at"],
            repo["fork"]
        ))

    conn.commit()
    conn.close()
    print(f"Saved {len(repos)} repos for {username}.")


def save_commits(username, all_commits):
    """Insert fetched commit data into the commits table."""
    conn = get_connection()
    cursor = conn.cursor()

    for commit in all_commits:
        cursor.execute("""
            INSERT INTO commits (username, repo_name, commit_date)
            VALUES (?, ?, ?)
        """, (
            username,
            commit["repo"],
            commit["date"]
        ))

    conn.commit()
    conn.close()
    print(f"Saved {len(all_commits)} commits for {username}.")

def clear_user_data(username):
    """Delete all existing repos and commits for a username before re-fetching fresh data."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM repos WHERE username = ?", (username,))
    cursor.execute("DELETE FROM commits WHERE username = ?", (username,))

    conn.commit()
    conn.close()
    print(f"Cleared old data for {username}.")

def get_top_language(username):
    """Find the most-used language across a user's repos."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT language, COUNT(*) as count
        FROM repos
        WHERE username = ? AND language IS NOT NULL
        GROUP BY language
        ORDER BY count DESC
        LIMIT 1
    """, (username,))

    result = cursor.fetchone()
    conn.close()
    return result  # (language, count) or None if no repos have a language

def get_most_active_day(username):
    """Find which day of the week has the most commits."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT strftime('%w', commit_date) as day_of_week, COUNT(*) as count
        FROM commits
        WHERE username = ?
        GROUP BY day_of_week
        ORDER BY count DESC
        LIMIT 1
    """, (username,))

    result = cursor.fetchone()
    conn.close()
    return result  # (day_of_week as '0'-'6', count) — '0' = Sunday, '6' = Saturday

def get_distinct_commit_dates(username):
    """Get all unique dates (no time) a user has committed on, sorted oldest to newest."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT DISTINCT DATE(commit_date) as commit_day
        FROM commits
        WHERE username = ?
        ORDER BY commit_day ASC
    """, (username,))

    results = cursor.fetchall()
    conn.close()
    return [row[0] for row in results]  # list of date strings like '2026-06-24'

def get_top_repos(username, limit=3):
    """Get the top repos by stars + forks combined, excluding forked repos."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT repo_name, stars, forks
        FROM repos
        WHERE username = ? AND is_fork = 0
        ORDER BY (stars + forks) DESC
        LIMIT ?
    """, (username, limit))

    results = cursor.fetchall()
    conn.close()
    return results  # list of (repo_name, stars, forks) tuples

def get_active_days_last_90(username):
    """Count distinct days with commits in the last 90 days."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT COUNT(DISTINCT DATE(commit_date)) as active_days
        FROM commits
        WHERE username = ?
          AND DATE(commit_date) >= DATE('now', '-90 days')
    """, (username,))

    result = cursor.fetchone()
    conn.close()
    return result[0]  # just the count

if __name__ == "__main__":
    create_tables()