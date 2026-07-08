# SkillBridge — Backend (Phase 4: Express + MongoDB + JWT)

REST API for the SkillBridge frontend. Handles real user accounts (JWT
auth) and stores Skills, Certificates, Projects, and Jobs in MongoDB —
each scoped to the logged-in user.

## 1. Get a MongoDB database

Easiest option (free, no local install): **MongoDB Atlas**.

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account
2. Create a free **M0 cluster**
3. Under **Database Access**, create a database user (username + password)
4. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) — fine for development
5. Click **Connect → Drivers**, copy the connection string, it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skillbridge
   ```
   (add `/skillbridge` before the `?` to name the database)

If you'd rather run MongoDB locally, install MongoDB Community Server and
use `mongodb://localhost:27017/skillbridge` instead.

## 2. Configure environment variables

```bash
cd skillbridge-backend
copy .env.example .env      # Windows
# cp .env.example .env      # Mac/Linux
```

Open `.env` and fill in:
- `MONGO_URI` — your connection string from step 1
- `JWT_SECRET` — any long random string (e.g. mash your keyboard for 40 characters)

## 3. Install and run

```bash
npm install
npm run dev
```

You should see:
```
MongoDB connected
SkillBridge API running on http://localhost:5000
```

Test it's alive: open http://localhost:5000/api/health in a browser — it
should show `{"status":"ok"}`.

## API reference

All resource routes (`/skills`, `/certificates`, `/projects`, `/jobs`)
require a `Authorization: Bearer <token>` header, using the token you get
back from `/register` or `/login`.

| Method | Route                  | Body                                              |
|--------|-------------------------|----------------------------------------------------|
| POST   | `/api/register`         | `{ name, email, password }`                        |
| POST   | `/api/login`             | `{ email, password }`                              |
| GET    | `/api/me`                | —                                                   |
| PUT    | `/api/me`                | `{ name?, university?, department? }`               |
| GET    | `/api/skills`            | —                                                   |
| POST   | `/api/skills`            | `{ name, level }`                                   |
| PUT    | `/api/skills/:id`        | any subset of the fields above                      |
| DELETE | `/api/skills/:id`        | —                                                   |
| GET/POST/PUT/DELETE | `/api/certificates`, `/api/projects`, `/api/jobs` | same pattern, matching field names in the frontend |

## 4. Connect the frontend

In `skillbridge` (the frontend project), create a `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Then, in the frontend code:
- `src/services/api.js` is already written to call these exact endpoints.
- Swap the mock logic in `src/context/AuthContext.jsx` (`login`/`register`)
  and `src/context/DataContext.jsx` (`useCollection`) to call `api.js`
  instead of `localStorage`, and store the returned JWT (e.g.
  `localStorage.setItem('sb_token', token)`) so `api.js` can attach it to
  future requests.

Run both at once during development: this backend on port 5000
(`npm run dev` here), and the frontend on port 5173 (`npm run dev` in
`skillbridge`).

## Folder structure

```
skillbridge-backend/
 ├── server.js              Express app + route wiring
 ├── .env.example
 └── src/
     ├── config/db.js       MongoDB connection
     ├── models/            User, Skill, Certificate, Project, Job
     ├── middleware/        auth.js (JWT check), errorHandler.js
     ├── controllers/       authController.js, crudFactory.js
     └── routes/            authRoutes.js, crudRouter.js
```

## Deploying later

Free options that work well together: **Render** or **Railway** for this
API, **MongoDB Atlas** (already set up above) for the database, and
**Vercel** for the frontend. Set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`
(your deployed frontend URL) as environment variables on whichever host
you pick.
