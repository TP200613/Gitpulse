# GitPulse

![GitPulse Homepage](assets/GitpluseHomepage.png)

GitPulse is a full-stack web application that analyzes any public GitHub profile and generates an activity snapshot with commit streaks, consistency scoring, language insights, repository analytics, and multi-user comparisons—all powered by the GitHub API, SQL analytics, and an interactive React dashboard.

🌐 **Live Demo:** https://gitpulse-v1.vercel.app  
📂 **Repository:** https://github.com/TP200613/Gitpulse

---

## 🚀 Features

- 🔍 Analyze any public GitHub profile using the GitHub API
- 🔥 Current and longest commit streak calculation
- 📊 Consistency Score (0–100) based on activity patterns
- 💻 Top programming language detection
- 📅 Most active day of the week
- ⭐ Top repositories ranked by stars and forks
- 😈 Fun Boost/Roast mode generated from profile statistics
- 👥 Compare multiple GitHub users side by side
- 📈 Interactive comparison charts
- 🌐 Supports GitHub API pagination for large repositories and commit histories
- ⚡ Fully deployed using Vercel and Render
- 🎨 Modern responsive UI with interactive animations

---

## 📊 What GitPulse Analyzes

For every public GitHub profile, GitPulse generates:

- Current Commit Streak
- Longest Commit Streak
- Total Commits
- Repository Count
- Consistency Score
- Most Used Programming Language
- Most Active Day
- Top Repositories
- Personalized Boost/Roast Message

The application fetches live data from the GitHub API, stores it in SQLite, and performs SQL-based analytics to generate these insights.

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Three.js
- @react-three/fiber
- @react-three/drei
- Lucide React

### Backend

- Python
- Flask
- Flask-CORS
- SQLite
- Requests
- Python-dotenv

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## 🗄 Database & SQL Analytics

GitPulse stores GitHub data locally in SQLite and performs analytics using SQL queries.

Core SQL operations include:

1. Finding the most-used programming language
2. Calculating the most active weekday
3. Retrieving distinct commit dates for streak calculations
4. Ranking repositories using stars and forks
5. Calculating active days within the last 90 days for consistency scoring

---

## 📁 Project Structure

```text
Gitpulse/
├── assets/
│   └── homepage.png
│
├── backend/
│   ├── app.py
│   ├── github_api.py
│   ├── database.py
│   ├── data_processing.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
├── .gitignore
└── README.md
```

---

## ⚙️ Running Locally

### Clone the Repository

```bash
git clone https://github.com/TP200613/Gitpulse.git
cd Gitpulse
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/Scripts/activate

pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder.

```env
GITHUB_TOKEN=your_personal_access_token
```

Run the backend:

```bash
python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

If you're using the backend locally, create a `.env` file inside the `frontend` folder.

```env
VITE_API_URL=http://127.0.0.1:5000
```

If you're using the deployed backend instead:

```env
VITE_API_URL=https://gitpulse-fhgg.onrender.com
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🌐 API Endpoint

### GET `/api/snapshot/<username>`

Example:

```text
GET /api/snapshot/octocat
```

Returns:

- Repository statistics
- Commit statistics
- Current commit streak
- Longest commit streak
- Consistency Score
- Most active day
- Top programming language
- Top repositories
- Personalized Boost/Roast message

---

## 🚀 Future Improvements

- GitHub OAuth Login
- Activity Heatmaps
- AI-powered Profile Review
- Search History
- Performance Caching
- Redis Support
- PostgreSQL Support
- Repository Trend Analysis
- Export Reports as PDF
- Custom Domain

---

## 👨‍💻 Author

**Tharun Raj T P**

GitPulse was designed and developed as a solo full-stack project over five weeks, covering:

- System Design
- GitHub API Integration
- Backend Development
- Database Design
- SQL Analytics
- Frontend Development
- Deployment (Render + Vercel)

---

## ⭐ Support

If you found GitPulse useful, consider giving the repository a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.