# Enjoy-Rajasthan-

This repository contains a Vite + React frontend and a small Express server used as a backend API.

What I changed in branch `fix/deploy-ready-ipsa`:
- Removed hard-coded Supabase credentials from committed files and replaced them with placeholders in `.env.example`.
- Made the server check for env vars before initializing Supabase — if not configured it falls back to in-memory storage.
- Added a safe stub for the client-side Supabase usage so the app runs without errors when Supabase is not configured.
- Added a `Procfile` with a minimal start command for deploy targets that honor Procfile (Heroku-like).

Quick local run (development):
1. Copy `.env.example` to `.env` and fill values if you have a Supabase project.
2. npm ci
3. npm run dev

Build & run (production-like, local):
1. npm ci
2. npm run build
3. npm start

Recommended deployment targets:
- Render (recommended) for the combined Node server + static build.
- Heroku (Procfile) or a VPS/container.

If you want me to also open a PR and create a CI workflow or Render `render.yaml`, tell me and I will push those changes on the branch and open a PR.
