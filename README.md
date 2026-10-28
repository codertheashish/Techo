# Techo — Intelligent Athletic Engine

Techo is an AI-assisted athletic training web application designed to help athletes organize workouts, explore exercise-form feedback, assess recovery readiness, consult an AI coach, and create daily training schedules.

The application combines a React and TypeScript frontend with a Node.js/Express backend and Google Gemini API integration.

> **Project status:** This README describes the implementation found in the supplied source archive. The application has not been independently run or tested as part of preparing this document. UI components and API endpoints do not, by themselves, prove that connected hardware, real-time sensor ingestion, custom model training, or clinically validated analysis is implemented.

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Architecture and data flow](#architecture-and-data-flow)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Setup on Windows](#setup-on-windows)
- [Environment variables](#environment-variables)
- [API endpoints](#api-endpoints)
- [How to use](#how-to-use)
- [Data storage](#data-storage)
- [Security notes](#security-notes)
- [Known limitations](#known-limitations)
- [Future scope](#future-scope)
- [Available scripts](#available-scripts)

## Features

- **Athletic dashboard:** Overview of training-related information, recent logs, and navigation between modules.
- **AI workout generation:** Requests a workout plan based on inputs such as sport, goal, duration, experience, fatigue, and equipment.
- **Workout adaptation:** Requests an adjusted workout using an existing plan and additional feedback.
- **Form analysis interface:** Provides UI for exercise-form analysis and a backend endpoint that can send exercise context and optional image data to Gemini.
- **Recovery readiness:** Requests AI-generated recovery guidance from inputs such as sleep, soreness, HRV, resting heart rate, and training load.
- **AI coach consultation:** Sends a question and conversational context to the backend for an AI-generated response.
- **Daily schedule generation:** Generates a proposed routine based on training and daily-life constraints.
- **Training logs and charts:** Displays training-log information and performance trends using frontend state and browser storage.
- **Sports/video-related components:** Includes sports reference data, video-analysis/recognition UI, and recognition feedback endpoints.
- **3D posture guide:** Includes a Three.js-based visualization component.
- **Audio coaching utilities:** Uses browser speech synthesis for voice cues where supported.
- **Project ZIP download UI:** Includes endpoints and UI for project ZIP information/download; a downloadable ZIP asset was not present in the supplied archive, so this flow may not work until that asset is supplied.

## Technology stack

| Technology | Role |
|---|---|
| React | Component-based user interface |
| TypeScript | Type-safe application code and data interfaces |
| Vite | Frontend development server and production build |
| Tailwind CSS | Utility-first styling |
| Node.js | JavaScript runtime for the server |
| Express | HTTP API routing and request handling |
| `@google/genai` | Google Gemini API integration |
| `dotenv` | Loads environment configuration from `.env` |
| Recharts | Training and telemetry charts |
| Three.js | 3D posture visualization |
| Motion | UI animation |
| Lucide React | Icons |
| Browser `localStorage` | Local persistence for selected frontend data |
| Web Speech API | Browser text-to-speech cues |
| npm | Dependency installation and scripts |

**Database:** No SQL or NoSQL database configuration was found in the supplied source. Initial/sample data is defined in local TypeScript files, and selected user-side data is stored in browser `localStorage`.

## Architecture and data flow

```text
Athlete
  |
  v
React + TypeScript frontend
  |
  | HTTP request (JSON)
  v
Node.js + Express API (server.ts)
  |
  | Build prompt / call model
  v
Google Gemini API
  |
  | AI response
  v
Express JSON response
  |
  v
Frontend displays the result
```

For example, the workout builder sends a request to `POST /api/workout/generate`. The Express handler processes the input, requests a structured workout response from Gemini, and returns JSON to the frontend.

During development, the Express server is configured to use Vite middleware. The server defaults to port `3000`, unless the `PORT` environment variable overrides it.

## Project structure

```text
Techo-main/
├── .env.example
├── .gitignore
├── bun.lock
├── package.json
├── package-lock.json
├── index.html
├── metadata.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── assets/
    │   └── images/
    ├── components/
    │   ├── Navbar.tsx
    │   ├── DashboardView.tsx
    │   ├── WorkoutBuilderView.tsx
    │   ├── FormVisionView.tsx
    │   ├── GameVideoAnalyzer.tsx
    │   ├── AiVideoRecognitionTrainer.tsx
    │   ├── RecoveryLabView.tsx
    │   ├── CoachConsultView.tsx
    │   ├── DailyLifeScheduleView.tsx
    │   ├── TelemetryLogView.tsx
    │   ├── LiveHeartRateSensorHUD.tsx
    │   ├── ThreeDPostureGuide.tsx
    │   ├── TrainingVolumeRpeTrendsChart.tsx
    │   └── ProjectZipDownloadModal.tsx
    ├── data/
    │   ├── mockData.ts
    │   ├── allGamesDatabase.ts
    │   └── gameKinematicsData.ts
    ├── types/
    │   └── index.ts
    └── utils/
        └── audioCoach.ts
```

### Important files

- `src/App.tsx` — application state and main view/navigation logic.
- `src/main.tsx` — React entry point.
- `src/components/` — UI views and feature components.
- `src/data/mockData.ts` — initial/sample data.
- `src/data/allGamesDatabase.ts` — sports/game reference data.
- `src/data/gameKinematicsData.ts` — movement/kinematics reference data.
- `src/types/index.ts` — shared TypeScript data interfaces.
- `src/utils/audioCoach.ts` — browser speech/audio coaching helpers.
- `server.ts` — Express server and API endpoints.
- `vite.config.ts` — Vite configuration.
- `package.json` — dependency manifest and npm scripts.
- `.env.example` — example environment variables.

## Requirements

- Node.js compatible with Vite 8: **Node.js 20.19+ or 22.12+** is recommended.
- npm (included with Node.js).
- A Google Gemini API key for AI-backed features.
- Internet access to install dependencies and call the Gemini API.

Check your installation:

```bash
node -v
npm -v
```

## Setup on Windows

### 1. Extract and open the project

Extract the ZIP archive, open the extracted project folder in VS Code, and open a terminal in that folder.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to a new file named `.env` in the project root.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `.env` and replace the placeholder API key with your own key.

### 4. Start the development server

```bash
npm run dev
```

Open:

- Application: <http://localhost:3000>
- Health endpoint: <http://localhost:3000/api/health>

The health endpoint can report whether an API key is present. A positive key-presence check does **not** guarantee that the key is valid or that Gemini requests will succeed.

### 5. Create a production build

```bash
npm run build
```

The Vite build is configured to output frontend assets to `dist`.

### 6. Start in production mode

The `npm start` script uses Unix-style environment-variable syntax and may not run directly in Windows CMD. After building, you can use PowerShell:

```powershell
$env:NODE_ENV = "production"
npm exec tsx server.ts
```

Confirm that `dist` exists before starting in production mode.

## Environment variables

The supplied `.env.example` defines these variables:

| Variable | Purpose | Example |
|---|---|---|
| `GEMINI_API_KEY` | Server-side Google Gemini API key | `YOUR_REAL_GEMINI_API_KEY` |
| `APP_URL` | Application URL/configuration | `http://localhost:3000` |

The server also reads `PORT` if supplied; otherwise, it uses port `3000`.

Do not commit `.env` or expose the Gemini key in frontend code. Keep `.env.example` limited to placeholder values.

## API endpoints

The following routes are defined in `server.ts`.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Server health and API-key presence check |
| `POST` | `/api/workout/generate` | Generate a workout |
| `POST` | `/api/workout/adapt` | Adapt an existing workout |
| `POST` | `/api/form/analyze` | Request exercise-form analysis |
| `POST` | `/api/recovery/readiness` | Request recovery-readiness guidance |
| `POST` | `/api/coach/consult` | Ask the AI coach a question |
| `POST` | `/api/games/recognize-video` | Submit sports image/video-related recognition input |
| `POST` | `/api/ai/train-recognition` | Submit recognition feedback/calibration information |
| `POST` | `/api/schedule/generate` | Generate a daily schedule |
| `GET` | `/api/project-zip-info` | Get project ZIP information |
| `GET` | `/api/download-project-zip` | Attempt to download the project ZIP |

For POST endpoints, inspect the relevant frontend component and route handler for the exact request fields and response schema before integrating another client.

## How to use

1. Start the app and open the dashboard.
2. Open the workout builder and enter the available training details.
3. Request a workout and review the generated plan.
4. Use workout adaptation when you want the plan adjusted.
5. Explore the form-analysis, recovery, coach-consultation, and daily-schedule views.
6. Review training logs and charts.
7. Grant browser camera/microphone permissions only when needed and only if you trust the application.

AI-backed features require working server configuration and Gemini API access. Some screens may display initial/sample data.

## Data storage

- Sample/default values are provided in frontend TypeScript data files.
- Selected workout and training-log data is saved in browser `localStorage`.
- No centralized SQL/NoSQL database or server-side user account system was found in the supplied archive.

Browser storage is specific to the browser profile and origin. Clearing site data can delete locally saved information, and it does not automatically synchronize between devices.

## Security notes

- Keep `GEMINI_API_KEY` on the server; never place it in browser code.
- Keep `.env` out of Git and use placeholder values in `.env.example`.
- Use HTTPS in production.
- Add authentication and authorization before exposing personal athlete data to multiple users.
- Validate request bodies, image/video payloads, and AI responses.
- Consider rate limiting, timeouts, request-size limits, and safe error messages for public deployments.
- Do not treat AI-generated fitness or recovery advice as medical diagnosis. Validate recommendations with qualified professionals where appropriate.
- Disclose third-party AI processing and provide a privacy policy before collecting real user data.

## Known limitations

- No database-backed persistence or verified user authentication was found.
- Sample data may not represent actual live athlete measurements.
- The presence of camera, sensor, or video-related UI does not prove a complete hardware or real-time computer-vision pipeline.
- The recognition-feedback endpoint does not, by itself, establish that a custom model is trained or that model weights are saved.
- A downloadable project ZIP asset was not found in the supplied archive, so the ZIP download flow may fail until the asset is supplied.
- Gemini calls depend on API key validity, model availability, network access, and account quotas.
- This project has not been runtime-tested as part of preparing this README.

## Future scope

- Add secure user authentication and per-user access control.
- Add PostgreSQL or another persistent database for athlete profiles and training history.
- Integrate a real pose-estimation pipeline for measurable exercise feedback.
- Connect supported wearable/heart-rate devices and validate incoming sensor data.
- Add automated tests for API routes, frontend flows, and AI response validation.
- Improve logging, rate limiting, deployment configuration, and error handling.
- Add export/backup features and document data retention and privacy.

## Available scripts

Check `package.json` for the source of truth. The supplied scripts include:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the frontend for production |
| `npm start` | Start the configured production server |
| `npm run preview` | Preview the Vite production build |
| `npm run lint` | Run `tsc --noEmit` type checking |
| `npm run clean` | Remove `dist` using a Unix-style command |

**Note:** `npm run lint` is configured as TypeScript checking, not a separate ESLint rule run. The clean script uses `rm -rf`, which is not directly compatible with Windows CMD.

---

## Project summary

Techo is a modular AI-assisted sports-coaching web app. React and TypeScript power the frontend, Express provides API endpoints, and Google Gemini generates coaching-related responses. The supplied version uses browser storage and sample/reference data; persistent database storage, authentication, and fully verified real-time sensor/computer-vision capabilities should be treated as future work unless separately implemented and tested.
