# SkillBridge — Frontend (React + Tailwind)

A career-tracking dashboard for software engineering students: log skills,
certificates, portfolio projects, and job applications in one place.

This frontend is connected to the `skillbridge-backend` API (Express +
MongoDB + JWT) — see that folder's README to set it up first.

## Run it

```bash
cp .env.example .env   # set VITE_API_URL to your backend's URL
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173). Make sure
the backend (`skillbridge-backend`) is running first, or registration and
login will fail.

To create a production build:

```bash
npm run build
npm run preview
```

## What's included

- **Auth:** `/login`, `/register` — real accounts via the backend, session
  kept as a JWT in `localStorage`. See `src/context/AuthContext.jsx`.
- **Pages:** Home, Login, Register, Dashboard, Skills, Certificates,
  Portfolio, Job Tracker, Profile, 404.
- **CRUD:** Skills, Certificates, Portfolio, and Jobs each support
  add/edit/delete + search (Jobs also has a status filter), all persisted
  to MongoDB through `src/context/DataContext.jsx` → `src/services/api.js`.
- **Dashboard:** stat cards + a skill-progress line chart (Chart.js).
- **Dark mode**, toast notifications, loading states, empty states,
  responsive layout (sidebar collapses on mobile).
- **Design system:** Tailwind tokens in `tailwind.config.js` matching your
  palette (`#2563EB` primary, plus success/warning/danger), Space Grotesk
  for headings, Inter for body text, JetBrains Mono for all stats/numbers —
  and a signature dashed "bridge path" connector used on the landing page
  and anywhere progress is shown.

## Folder structure

```
src/
 ├── components/   Navbar, Sidebar, Footer, cards, Modal, charts, etc.
 ├── pages/         One file per route
 ├── context/       AuthContext, DataContext, ThemeContext
 ├── services/      api.js — fetch wrapper for the backend
 ├── hooks/         useDebounce
 ├── App.jsx        Routes
 └── main.jsx       Providers + render
```
