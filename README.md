# CrowdSolve – Community-Powered Problem Solving Hub

A full-stack challenge-solving platform that combines collaboration, action boards, and AI agents.

---

## 🔧 Tech Stack

- **Backend:** Node.js + Express + MongoDB
- **Frontend:** Vite + React
- **AI Agents:** Python (Flask + LangChain)
- **DB:** MongoDB Atlas

---

## 🚀 Running Locally

### 1. Backend

```bash
cd backend
npm install
npm start
```

- The backend server runs on `http://localhost:5000`
- Configure MongoDB and JWT secrets in `backend/.env`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

- The frontend runs on `http://localhost:5173` by default

### 3. AI Agents

Each agent is a Flask server. Install dependencies and run each agent in a separate terminal:

```bash
cd agents
pip install -r requirements.txt
# Start each agent:
python tag_suggester.py         # Port 7001
python thread_builder.py        # Port 7002
python task_extractor.py        # Port 7003
python calendar_integrator.py   # Port 7004
```

- Set API keys in `agents/.env` for OpenRouter and HuggingFace.

---

## 📁 Project Structure

```
agents/           # Python AI microservices (Flask)
backend/          # Node.js/Express API server
frontend/         # React + Vite client app
```

---

## ✨ Features

- User authentication (register/login)
- Post and browse challenges
- AI-powered tag suggestion for challenges
- Submit and view solutions, with AI-generated sub-solutions
- Auto-generate actionable tasks from solutions using AI
- Action/task board per challenge
- Content moderation and reporting

---

## 🧠 AI Agents

- **Tag Suggester:** Suggests tags for challenges
- **Thread Builder:** Breaks solutions into sub-solutions
- **Task Extractor:** Converts solutions into actionable tasks
- **Calendar Integrator:** Suggests deadlines for tasks

---

## 🛠️ Environment Variables

- `backend/.env`: MongoDB URI, JWT secret
- `agents/.env`: API keys for OpenRouter, HuggingFace

---

## 📬 API Endpoints

- `/api/auth/register` – Register user
- `/api/auth/login` – Login user
- `/api/challenges` – CRUD for challenges
- `/api/solutions` – Submit/view solutions
- `/api/tasks` – Create/view tasks
- `/api/moderation/flag` – Flag content

---

## 📝 License

MIT License
