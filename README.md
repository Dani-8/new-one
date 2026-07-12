<div align="center">

# 🍔 Golden Bite

**A full-stack food delivery web app — dark-mode UI, real ordering flow, currently in early development.**

![Status](https://img.shields.io/badge/status-early%20development-yellow)
![Frontend](https://img.shields.io/badge/frontend-production--ready-brightgreen)
![Backend](https://img.shields.io/badge/backend-skeleton-orange)

</div>

---

## Overview

Golden Bite is split into two parts that are currently at very different
maturity levels: a **polished, feature-complete frontend** and a
**minimal backend skeleton** that isn't wired to a real database yet.
This README exists so that gap is obvious to anyone picking up the
project — what to trust, what to build next, and where the real work is.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Frontend](#frontend-react--vite)
- [Backend](#backend-nodejs--express)
- [Current State](#current-state)
- [Known Issues](#known-issues)
- [Roadmap / What's Needed](#roadmap--whats-needed)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

---

## Tech Stack

| Layer | Stack |
|---|---|
| **Frontend** | React 19.2, Vite, Tailwind CSS 4, Motion, Lucide React |
| **Backend** | Node.js, Express 4.21, CORS, dotenv |
| **Planned** | MongoDB or PostgreSQL, JWT auth, Google Gemini API (AI recommendations) |

---

## Frontend (React + Vite)

The frontend is the strong half of this project — a complete, professional-grade
React app. It includes:

- 🌙 Dark-mode UI built with Tailwind CSS 4 and Motion animations
- 🍕 Full menu browsing with categories (Burgers, Pizza & Pasta, Healthy, Desserts, Drinks)
- 🛒 Shopping cart with quantity controls
- 🔐 Auth system with Admin and Customer roles
- 🛠️ Admin panel for managing food items (create, update, delete)
- 📦 Real-time order tracking with live status simulation
- ⭐ Favorites/bookmarks system
- 📱 Responsive design, mobile and desktop
- 🪝 Custom hooks for cart management, orders, and toast notifications
- 💾 Mock data in `localStorage`, structured so it's ready to swap for a real API

Code is organized into feature modules (`auth`, `menu`, `cart`, `orders`,
`admin`, `home`), plus shared reusable components, hooks, and utilities.

> **Bottom line:** the UI and UX are done. Everything here is designed
> around *eventually* talking to a real backend — it just isn't yet.

## Backend (Node.js + Express)

Currently minimal, built to be expanded:

- Express server with CORS enabled
- Food CRUD endpoints:
  - `GET /foods` — list all foods
  - `GET /foods/:id` — get a single food item
  - `POST /foods` — create a food item
  - `PUT /foods/:id` — update a food item
  - `DELETE /foods/:id` — delete a food item
- Environment config via `dotenv`
- Nodemon for dev auto-reload
- Structured to make DB + auth integration straightforward later

> Endpoint paths above are the intended shape based on the CRUD set
> described — double check them against the actual route file before
> writing docs or client code against them.

---

## Current State

| Area | Status |
|---|---|
| Frontend UI/UX | ✅ Production-ready |
| Frontend features (cart, favorites, order tracking) | ✅ Implemented, using mock/local data |
| Backend food endpoints | ⚠️ Working, but in-memory only — **resets on every server restart** |
| Database | ❌ Not connected |
| Authentication | ⚠️ Frontend-only, via `localStorage` — not real auth |
| Order tracking | ⚠️ Simulated, not persisted |
| Payments | ❌ Not implemented |
| AI recommendations | ❌ Not implemented |

---

## Known Issues

- **Data doesn't persist** — no database means every server restart wipes everything.
- **Backend is incomplete** — food CRUD exists, but orders/users/auth have no backend counterpart yet.
- **No real authentication** — current "auth" is a frontend illusion (`localStorage`), not secure and not connected to a server-side identity.
- **No payment integration.**
- **AI recommendation feature is planned, not built.**

---

## Roadmap / What's Needed

1. **Database integration** — MongoDB or PostgreSQL, replacing the in-memory food array.
2. **Real authentication** — JWT-based, server-verified, replacing the `localStorage` role system.
3. **Order persistence** — orders need to survive a restart and actually belong to a user.
4. **Error handling & input validation** — on every backend route, not just the happy path.
5. **Deployment setup** — Docker + CI/CD.
6. **Documentation** — this README is a start; API docs (endpoints, request/response shapes) are still needed as the backend grows.
7. **AI recommendations** — Google Gemini API integration, once the data layer is real.

---

## Getting Started

> Adjust paths/scripts below to match the actual repo layout — written
> from the standard Vite + Express project shape described above.

```bash
# clone
git clone <repo-url>
cd golden-bite

# frontend
cd frontend
npm install
npm run dev

# backend (separate terminal)
cd backend
npm install
npm run dev   # nodemon
```

You'll need a `.env` file in `backend/` for the Express server's config
(see `dotenv` usage) — check `.env.example` if one exists, or ask
whoever last touched the backend what variables it expects.

---

## Contributing

The frontend is solid and mostly about polish/features from here. The
backend is where the real groundwork is needed — if you're picking up an
issue, the database and auth items in the roadmap above are the highest-leverage
places to start, since almost everything else (persistence, real orders,
real auth) depends on them.


