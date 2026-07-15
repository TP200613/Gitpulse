# GitPulse

Activity snapshot for any public GitHub profile — streaks, consistency scoring, top languages, and multi-user comparison, all backed by real GitHub API data and SQL analytics.

**Live demo:** _[add your deployed URL here once live]_will be soon
**Repo:** [github.com/TP200613/Gitpulse](https://github.com/TP200613/Gitpulse)

---

## What it does

Enter any public GitHub username and GitPulse pulls their full repo and commit history (with pagination, so it works for accounts with hundreds of repos or commits), stores it in a SQLite database, and runs it through a set of SQL queries to surface:

- **Current & longest commit streaks**
- **Consistency Score** (0–100) — a weighted formula based on recency, streak length, and commit regularity
- **Top language**, based on repo count
- **Most active day of the week**
- **Top repos** by stars + forks
- A **Boost/Roast** mode — a fun, personality-driven one-liner generated from the user's own stats

It also supports comparing **multiple GitHub profiles side by side** (individually or via bulk paste), automatically ranked by consistency score, with a multi-metric bar chart (score, streak, commits) for at-a-glance comparison.

## Features

- 🔍 Single-profile activity snapshot with real-time GitHub API data
- 🔥 Current & longest streak calculation
- 📊 Consistency Score with a transparent, explainable formula
- 😈 Boost/Roast mode for a fun take on your own stats
- 🏆 Multi-user comparison (manual entry or bulk paste, ranked by consistency score)
- 📈 Multi-metric comparison chart (score, streak, total commits)
- 🌐 Handles GitHub API pagination for accounts with large repo/commit histories

## Tech stack

**Backend:** Python, Flask, Flask-CORS, SQLite, `requests`, `python-dotenv`
**Frontend:** React, TypeScript, Vite, Tailwind CSS, Three.js (`@react-three/fiber`, `@react-three/drei`), `lucide-react`

## The SQL layer

All analytics run through five core SQL queries against the `repos` and `commits` tables:
1. **Top language** — most-used language across a user's repos
2. **Most active day** — day of week with the highest commit count
3. **Distinct commit dates** — used to calculate streaks in Python
4. **Top repos** — ranked by stars + forks, excluding forks
5. **Active days in last 90 days** — used in the Consistency Score formula

## Project structure

```
Gitpulse/
├── backend/
│   ├── app.py              # Flask app + /api/snapshot/<username> route
│   ├── database.py         # SQLite schema + all SQL queries
│   ├── data_processing.py  # streak calc, consistency score, boost/roast logic
│   ├── github_api.py       # GitHub API fetching with pagination
│   └── requirements.txt
├── frontend/
│   ├── src/                # React + TypeScript app
│   ├── package.json
│   └── ...
└── .gitignore
```

## Running it locally

**Backend**
```bash
cd backend
python -m venv venv
source venv/Scripts/activate      # Windows (Git Bash)
pip install -r requirements.txt --break-system-packages
# create a .env file in backend/ with:
# GITHUB_TOKEN=your_github_personal_access_token
python app.py
```
Runs at `http://127.0.0.1:5000`.

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`. Set `VITE_API_URL` in a `.env` file inside `frontend/` if your backend isn't running locally.

## API

**`GET /api/snapshot/<username>`**

Returns a JSON snapshot for the given public GitHub username: repo/commit counts, top language, most active day, streaks, consistency score, boost/roast messages, and top repos.

---

Built solo as a 5-week project, from database design through deployment.
