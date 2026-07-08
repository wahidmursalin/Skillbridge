# SkillBridge

A career-tracking dashboard for software engineering students — log
skills, certificates, portfolio projects, and job applications in one
place, with a dashboard that shows progress at a glance.

Built as a MERN stack project: **React + Tailwind** frontend, **Express +
MongoDB** backend with JWT authentication.

## Structure

```
Skillbridge/
 ├── frontend/     React + Vite + Tailwind UI
 └── backend/      Express + MongoDB REST API (JWT auth)
```

Each folder has its own `README.md` with full setup instructions.

## Quick start

**1. Backend**
```bash
cd backend
copy .env.example .env      # then fill in MONGO_URI and JWT_SECRET
npm install
npm run dev
```
Runs on http://localhost:5000

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

See `backend/README.md` for MongoDB Atlas setup, and `frontend/README.md`
for how the UI is organized.

## Tech stack

React · React Router · Tailwind CSS · Vite · Node.js · Express ·
MongoDB · Mongoose · JWT · Chart.js

## Features

- Auth (register/login) with JWT
- Skills, Certificates, Portfolio, and Job Tracker — full CRUD, scoped per user
- Dashboard with stat cards and a skill-progress chart
- Dark mode, search & filter, responsive layout
