# PrepLab
AI-powered job preparation platform — from resume building to interview readiness.

---
## Overview
 
**PrepLab** is a full-stack job preparation platform that helps candidates put their best foot forward. Users can generate a polished, AI-crafted resume as a downloadable PDF and get a detailed interview readiness report — including a match score, skill gap roadmap, and tailored technical and behavioural questions — all powered by Google Gemini 2.5 Flash.

---

## Features
 
- **Dual authentication** — email/password (bcrypt-hashed) and Google OAuth via Firebase
- **AI Resume Builder** — collects user details, sends them to Gemini, renders an HTML resume, converts it to PDF with Puppeteer, and uploads to Cloudinary for permanent storage
- **AI Resume Analyzer / Interview Report** — parses user's uploaded resume against a job description and self-summary to produce a match score, skill gap roadmap, and interview question sets
- **Downloadable resumes** — user can view and download previously generated Resume PDFs at any time also they can view previously generated interview report
- **Protected routes** — Resume Builder and Resume Analyzer require authentication
- **Responsive UI** — built with Tailwind CSS v4 
---

## Tech stack
 
| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Forms & Validation | React Hook Form, Zod, @hookform/resolvers |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Backend | Express 5, Node.js |
| Database | MongoDB, Mongoose |
| Authentication | Firebase (Google OAuth) + JWT (httpOnly cookies) + bcryptjs |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| PDF Generation | Puppeteer Core + @sparticuz/chromium |
| File Storage | Cloudinary, Multer, Streamifier |
| Resume Parsing | pdf-parse-new |
| Deployment | Vercel (frontend), Render (backend) |
 
---

## Project structure
 
```
preplab/
├── Frontend/                          # React + Vite frontend
│   ├── src/
│   │   ├── config/                    # App configuration, constants
│   │   ├── schema/                    # Zod validation schemas
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── context.jsx
│   │   │   │
│   │   │   ├── resume/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── context.jsx
│   │   │   │
│   │   │   ├── interview/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── context.jsx
│   │   │   │
│   │   │   └── ...other features
│   │   │
│   │   ├── shared/                    # Shared reusable resources
│   │   │   ├── components/
│   │   │   
│   │   │   
│   │   │   
│   │   │   
│   │   │
│   │   ├
│   │   ├
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── vite.config.js
│
└── Backend/                           # Express.js backend
    ├── controllers/                   # Route handlers
    ├── middleware/                    # Auth, error handling, multer
    ├── models/                        # Mongoose models
    ├── routes/                        # API routes
    ├── services/                      # Gemini, Cloudinary, Puppeteer
    ├── templates/                     # Resume templates
    ├── schema/                        # Database and ZOD schema
    ├── config/                        # DB, environment config
    └── server.js
```
 
---

## Getting started
 
### Prerequisites
 
- Node.js >= 20
- MongoDB instance (local or Atlas)
- Firebase project with Authentication enabled (Email/Password + Google provider)
- Google Cloud project with Gemini API access
- Cloudinary account
### Installation
 
```bash
# Clone the repository
git clone https://github.com/yourusername/preplab.git
cd preplab
 
# Install frontend dependencies
cd client && npm install
 
# Install backend dependencies
cd ../server && npm install
```
 
### Environment variables
 
**`server/.env`**
 
```env
PORT=5000
NODE_ENV=development
 
# MongoDB
MONGODB_URI=your_mongodb_connection_string
 
# JWT
JWT_SECRET=your_jwt_secret_key
 
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
 
# Google Gemini
GEMINI_API_KEY=your_gemini_api_key
 
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
 
 
# Client origin (for CORS)
CLIENT_URL=http://localhost:5173
```
 
**`client/.env`**
 
```env
VITE_API_URL=http://localhost:5000/api
 
# Firebase Web SDK config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run locally
 
```bash
# Terminal 1 — start the backend
cd server
npm run dev
 
# Terminal 2 — start the frontend
cd client
npm run dev
```
 
The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5000`.
 
---
 
## Core features in depth
 
### Authentication
 
PrepLab supports two auth strategies that share the same session model:
 
- **Email / Password** — passwords hashed with bcryptjs; a signed JWT is issued and stored in an `httpOnly` cookie on login
- **Google OAuth** — handled client-side via the Firebase Web SDK; the resulting Firebase ID token is verified server-side with `firebase-admin`, then a JWT cookie is issued using the same pipeline
The frontend uses `AuthContext` (with `useMemo`) and a `useFirebaseAuth` hook. An `isLoggingOut` flag prevents race conditions between the logout action and the `<Protected>` route redirect.
 
### Resume Analyzer
 
Users provide:
1. A short **self-description**
2. A **job description** for the target role
3. Their **resume** (PDF upload)
The backend extracts the resume text, constructs a structured prompt, and calls **Gemini 2.5 Flash**. The response includes:
 
- A **match score** (0–100)
- **Detected skill gaps** with a prioritised learning roadmap
- **Technical interview questions** tailored to the role
- **Behavioural interview questions** based on the resume
- **30 Days Roadmap** a detailed daily tasks to minimize the skill gap and prepare for the target job role
### Resume Builder
 
Users fill in a multi-step form (personal info, work experience, education, skills). The backend:
 
1. Sends the form data to **Gemini 2.5 Flash** to generate polished, professional content
2. Injects the AI output into an **HTML resume template**
3. Renders the HTML to PDF using **Puppeteer Core** + `@sparticuz/chromium` (optimised for serverless)
4. Uploads the PDF to **Cloudinary**
5. Returns a permanent URL the user can view or download at any time
6. In-browser PDF preview using Google Docs Viewer

---
 
## API overview
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register with email & password |
| `POST` | `/api/auth/login` | Public | Login with email & password |
| `POST` | `/api/auth/firebase` | Public | Firebase Google OAuth |
| `POST` | `/api/auth/logout` | Auth | Clear session cookie |
| `GET` | `/api/auth/get-me` | Auth | Get current user |
| `POST` | `/api/interview` | Auth | Analyze resume against job and self description |
| `GET` | `/api/interview` | Auth | Get all interview reports of logged in user |
| `GET` | `/api/interview/report/:interviewId` | Auth | List user's previous interview report by id |
| `POST` | `/api/resume` | Auth | Generate new report on the basis of user's data |
| `GET` | `/api/resume` | Auth | Get all all resume of the user |
| `GET` | `/api/resume/:resumeId` | Auth | Get specific resume by id |

---
 
## Deployment
 
### Frontend (Vercel)
 
1. Connect your repository to [Vercel](https://vercel.com)
2. Set the root directory to `client/`
3. Add all `VITE_*` environment variables in the Vercel dashboard
### Backend (Render)
 
1. Create a new **Web Service** and connect the repository
2. Set the root directory to `server/`
3. Build command: `npm install`
4. Start command: `node index.js` (or `npm start`)
5. Add all server environment variables in the Render dashboard
> **Chromium on Render:** `@sparticuz/chromium` provides a pre-built Chromium binary compatible with Render's Linux environment. No extra configuration needed — Puppeteer picks it up automatically via `executablePath`.
 
---
 
