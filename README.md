# React + Node.js + MongoDB Demo

A small full-stack example with a React frontend and an Express/Mongoose backend. The original README describes a basic application for working with articles and comments; verify the current UI and API behavior before using it as a production starter.

## Stack

- **Frontend:** React 18, React Router, Create React App
- **Backend:** Node.js, Express, Mongoose/MongoDB, CORS
- **Database:** MongoDB connection configured through an environment variable

## Repository layout

- `frontend/` — React application
- `backend /` — backend folder in the current repository (its name includes a trailing space; consider renaming it to `backend` in a cleanup commit)

## Run the frontend

```bash
cd frontend
npm install
npm start
```

The development server normally opens at [http://localhost:3000](http://localhost:3000).

## Run the backend

Because the directory currently includes a trailing space, quote the path:

```bash
cd "backend "
npm install
```

Create a local `.env` file in that directory and configure the MongoDB connection variable expected by `index.js`. Do not commit real credentials or connection strings. Then run:

```bash
npm start
```

The backend's package script starts `nodemon index.js`.

## Before using this project

- Keep secrets in an untracked local `.env` file and rotate any credential that was previously committed publicly.
- Confirm the backend API routes and frontend API base URL match your local setup.
- Add input validation, authentication/authorization, error handling, tests, and production configuration before deploying.
- This repository currently has no configured backend test suite.

## Suggested cleanup

- Rename `backend ` to `backend`.
- Add environment files and OS-generated files to `.gitignore`.
- Add a safe `.env.example` containing placeholder values only.
- Document the actual API routes and screenshots once the current app behavior is verified.
