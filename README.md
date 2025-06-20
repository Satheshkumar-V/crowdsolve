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

## System Architecture

+----------------+       +----------------+       +---------------------+
|                |       |                |       |                     |
|   Frontend     | <-->  |   Backend API  | <-->  |     MongoDB Atlas   |
| (React + Vite) |       | (Node.js +     |       |   (Cloud Database)  |
|                |       |  Express.js)   |       |                     |
+----------------+       +----------------+       +---------------------+
        |                        |
        v                        v
+----------------+       +-------------------------+
|  Auth Module   |       |    Challenge Module     |
|                |       |  Solution, Task APIs    |
+----------------+       +-------------------------+
                                  |
                                  v
         +----------------------------------------------------+
         |                    AI Agents (Flask)               |
         |    (Running independently as microservices)        |
         +----------------------------------------------------+
               |              |               |             |
               v              v               v             v
       +---------------+ +---------------+ +---------------+ +------------------+
       | Tag Suggester | | Thread Builder| | Task Extractor| | Calendar Integrator|
       | (port 7001)   | | (port 7002)   | | (port 7003)   | | (port 7004)        |
       +---------------+ +---------------+ +---------------+ +------------------+
               |              |               |             |
               v              v               v             v
         Uses OpenRouter / HuggingFace APIs for AI-powered results


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

## Workflow
- **flowchart TD:**
  - A[👤 User Registers / Logs In] --> B[📝 Post a Challenge]
  - B --> C[🤖 Tag Suggester Agent]
  - C --> B2[🏷️ Tags Suggested]

  - B2 --> D[💡 Submit Solutions]
  - D --> E[🤖 Thread Builder Agent]
  - E --> D2[🧵 Sub-Solutions Suggested]

  - D2 --> F[✅ Convert to Task Board]
  - F --> G[🤖 Task Extractor Agent]
  - G --> H[🗂️ Actionable Tasks Generated]

  - H --> I[📅 Calendar Integrator Agent]
  - I --> J[🕒 Deadlines Assigned]

  - J --> K[🏆 Earn Credits & Badges]
  - K --> L[📊 Leaderboards & Celebration]

  - D2 --> M[🚩 Flag Content]
  - M --> N[🔍 Moderation Actions]

  - style A fill:#E3F6FC,stroke:#0BB
  - style B fill:#FFF5CC
  - style D fill:#E8F9E2
  - style F fill:#F5E3FC
  - style H fill:#D6F5F5
  - style K fill:#FCDAD2
  - style M fill:#FFE1E1

## 📝 License

MIT License
Video Drive Link - https://drive.google.com/file/d/10VI0c8uRpf8393dse7vxtu6t5_LTsysT/view?usp=sharing
