# HireFlow

An AI-assisted hiring platform — candidates build resumes and prep for interviews with AI, while companies post jobs, manage recruiters, and track applicants through a hiring pipeline.

App: https://hireflow-dev.vercel.app · API: https://hireflow-r73i.onrender.com

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)
![Groq](https://img.shields.io/badge/Groq-gpt--oss--120b-F55036?logo=groq&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?logo=zod&logoColor=white)

---

## Overview

**HireFlow** connects candidates and companies on one platform:

- **Candidates** can generate an AI-crafted resume PDF, and get an interview-readiness report (match score, skill gaps, a 30-day roadmap, and tailored questions) for a specific job, then apply directly.
- **Companies** create a company profile, invite recruiters by email, post and manage job openings (with AI-assisted job descriptions), and move applicants through a status pipeline (applied → shortlisted → interview → hired/rejected), triggering email + in-app notifications at each step. Every application is automatically scored by AI against the job's description and skill requirements, producing a match score, skill gaps, strengths, weaknesses, and a hiring recommendation for recruiters to review.

---

## Features

- **Role-based accounts** — `candidate`, `pending_recruiter`, `recruiter`, `company_admin`, with route-level authorization
- **Dual authentication** — email/password and Google OAuth via Firebase, with a shared session/blacklist model
- **AI Resume Builder** — collects candidate details, generates polished content with Groq, renders an HTML resume, converts it to PDF with Puppeteer, and uploads it to Cloudinary
- **AI Interview Prep** — analyzes a candidate's resume against a job description to produce a match score, skill-gap roadmap, and tailored technical/behavioural questions
- **Company workspace** — create/update a company profile and logo, invite recruiters by shareable link or direct email, remove employees, leave a company
- **Job management** — post, edit, delete jobs; AI-generated job descriptions; a public job feed and a company-scoped feed
- **Applications pipeline** — candidates apply with a resume upload and an optional AI analyze-and-prep step; every application is auto-scored by AI (match score, skill gaps, strengths, weaknesses, hiring recommendation) for recruiters to review, filter by, and act on
- **Automatic job expiry** — a daily cron job closes job postings past their deadline
- **Notifications** — cursor-paginated, per-user notifications with unread counts, generated on application status changes and company invites
- **Email notifications** — status-change and interview-invite emails sent via EmailJS

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Forms & Validation | React Hook Form, Zod |
| Data fetching | TanStack Query, Axios |
| Routing | React Router DOM v7 |
| Backend | Express 5, Node.js (ESM) |
| Database | MongoDB, Mongoose |
| Authentication | Firebase Admin (Google OAuth) + JWT (httpOnly cookies) + bcryptjs |
| AI | Groq (`groq-sdk`, `openai/gpt-oss-120b`) |
| PDF Generation | Puppeteer Core + `@sparticuz/chromium` |
| File Storage | Cloudinary, Multer, Streamifier |
| Resume Parsing | pdf-parse-new |
| Email | `@emailjs/nodejs` |
| Scheduled Jobs | node-cron |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project structure

```
YT-GENAi/
├── Frontend/                          # React + Vite frontend
│   └── src/
│       ├── Config/                    # Firebase config, app constants
│       ├── Schema/                    # Zod validation schemas
│       ├── Hooks/, Utils/, Shared/    # Cross-feature hooks & components
│       └── features/
│           ├── Auth/                  # Login, register, Firebase auth
│           ├── Candidate/             # Candidate-facing views
│           ├── ResumeBuilder/         # AI resume builder flow
│           ├── interview/             # Resume analyzer / interview report
│           ├── RecruiterPortal/       # Company, job & application management
│           ├── Notifications/
│           ├── Home/
│           └── Layout/
│
└── Backend/                           # Express.js API
    └── src/
        ├── Controllers/               # Route handlers
        ├── Routes/                    # API route definitions
        ├── Models/                    # Mongoose schemas
        ├── Middlewares/               # Auth, role, file-upload middleware
        ├── services/                  # AI, email, PDF, cron, upload services
        ├── Schemas/                   # Zod schemas (request/AI response validation)
        ├── Templates/                 # Resume HTML template
        ├── Utils/                     # ApiError, ApiResponse, asyncHandler
        ├── config/                    # DB & Firebase config
        ├── app.js
        └── server.js
```

---

## Getting started

### Prerequisites

- Node.js >= 20
- MongoDB instance (local or Atlas)
- Firebase project with Authentication enabled (Email/Password + Google provider)
- Groq API key
- Cloudinary account
- EmailJS account (for status/invite emails)

### Installation

```bash
git clone https://github.com/tajwarul23/HireFlow.git
cd HireFlow

# Backend
cd Backend && npm install

# Frontend
cd ../Frontend && npm install
```

### Environment variables

**`Backend/.env`**

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret
INVITATION_TOKEN_SECRET=your_invitation_token_secret

# Groq
GROK_API_KEY=your_groq_api_key
GROK_API_BASE_URL=https://api.x.ai/v1
GROK_MODEL=openai/gpt-oss-120b

# Firebase Admin SDK
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your_client_x509_cert_url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# EmailJS (status-change emails)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_TEMPLATE_ID_INVITE=your_invite_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key

# EmailJS (interview-invite emails)
EMAILJS_SERVICE_ID_INTERVIEW=your_service_id
EMAILJS_TEMPLATE_ID_INTERVIEW=your_template_id
EMAILJS_PUBLIC_KEY_INTERVIEW=your_public_key
EMAILJS_PRIVATE_KEY_INTERVIEW=your_private_key
```

**`Frontend/.env`**

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run locally

```bash
# Terminal 1 — backend
cd Backend
npm run dev

# Terminal 2 — frontend
cd Frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:3000`.

---

## API overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register with email & password |
| `POST` | `/api/auth/login` | Public | Login with email & password |
| `POST` | `/api/auth/firebase` | Public | Firebase Google OAuth |
| `POST` | `/api/auth/logout` | Auth | Clear session cookie, blacklist token |
| `GET` | `/api/auth/get-me` | Auth | Get current user |
| `POST` | `/api/auth/become-candidate` | Auth [`pending_recruiter`] | Opt out of a pending invite, switch to `candidate` |
| `POST` | `/api/interview` | Auth | Generate interview report from resume + job/self description |
| `GET` | `/api/interview` | Auth | List logged-in user's interview reports |
| `GET` | `/api/interview/report/:interviewId` | Auth | Get an interview report by id |
| `POST` | `/api/resume` | Auth | Generate a new AI resume |
| `GET` | `/api/resume` | Auth | List logged-in user's resumes |
| `GET` | `/api/resume/:resumeId` | Auth | Get a resume by id |
| `DELETE` | `/api/resume/:resumeId` | Auth | Delete a resume by id |
| `POST` | `/api/company/create` | Auth | Create a company |
| `POST` | `/api/company/join` | Auth | Join a company via invite token |
| `POST` | `/api/company/invite` | Auth [`company_admin`] | Generate a recruiter invite link |
| `POST` | `/api/company/invite-email` | Auth [`company_admin`] | Email a recruiter invite link |
| `PATCH` | `/api/company/update` | Auth [`company_admin`] | Update company info |
| `PATCH` | `/api/company/updateLogo` | Auth [`company_admin`] | Update company logo |
| `GET` | `/api/company` | Auth [`company_admin`, `recruiter`] | Get own company info |
| `GET` | `/api/company/aboutCompany/:companyId` | Auth | Get public company info |
| `PATCH` | `/api/company/leave-company` | Auth [`company_admin`, `recruiter`] | Leave the current company |
| `PATCH` | `/api/company/remove-employee/:userId` | Auth [`company_admin`] | Remove an employee |
| `POST` | `/api/job/create` | Auth [`company_admin`, `recruiter`] | Post a job opening |
| `POST` | `/api/job/generate-description` | Auth [`company_admin`, `recruiter`] | AI-generate a job description |
| `GET` | `/api/job` | Auth | Public job feed |
| `GET` | `/api/job/company` | Auth [`company_admin`, `recruiter`] | Company's job feed |
| `PATCH` | `/api/job/:jobId` | Auth [`company_admin`, `recruiter`] | Update a job |
| `DELETE` | `/api/job/:jobId` | Auth [`company_admin`, `recruiter`] | Delete a job |
| `POST` | `/api/application/:jobId` | Auth [`candidate`] | Apply to a job with resume upload |
| `POST` | `/api/application/analyze/:jobId` | Auth [`candidate`] | Apply + generate an analyze-and-prep report |
| `GET` | `/api/application` | Auth [`candidate`] | List own applications |
| `GET` | `/api/application/company` | Auth [`company_admin`, `recruiter`] | List/filter applications for the company |
| `PATCH` | `/api/application/:applicationId` | Auth [`company_admin`, `recruiter`] | Update an application's status |
| `GET` | `/api/notification` | Auth | Cursor-paginated notifications |
| `GET` | `/api/notification/unread-count` | Auth | Unread notification count |
| `PATCH` | `/api/notification/read-all` | Auth | Mark all notifications read |
| `PATCH` | `/api/notification/:notificationId/read` | Auth | Mark one notification read |
| `DELETE` | `/api/notification` | Auth | Clear all notifications |
