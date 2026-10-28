# Techo — Frontend (Vercel) + Backend (Render)

```
techo-split/
├── frontend/   → Vercel (React + Vite)
└── backend/    → Render (Express + Gemini API)
```

## 1. Local chalane ke liye

Backend (terminal 1):
```bash
cd backend
cp .env.example .env     # GEMINI_API_KEY daalo
npm install
npm run dev              # http://localhost:3000
```
Frontend (terminal 2):
```bash
cd frontend
npm install
npm run dev              # http://localhost:5173  (/api -> localhost:3000 proxy)
```

## 2. Backend -> Render
1. `backend/` folder ko GitHub repo me push karo (ya poora repo, aur Root Directory = `backend`).
2. Render -> New -> **Web Service**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Environment Variables:
   - `GEMINI_API_KEY` = tumhari key
   - `FRONTEND_URL`   = Vercel URL (deploy ke baad daalo, e.g. `https://techo.vercel.app`)
4. Deploy ke baad URL milega: `https://techo-backend.onrender.com` — test: `/api/health`

## 3. Frontend -> Vercel
1. Vercel -> New Project -> repo select
   - Root Directory: `frontend`
   - Framework: Vite (auto detect), Build: `npm run build`, Output: `dist`
2. Environment Variable:
   - `VITE_API_URL` = `https://techo-backend.onrender.com` (trailing slash nahi)
3. Deploy. Phir Vercel ka URL Render ke `FRONTEND_URL` me daalke backend redeploy karo.

## Notes
- Render free plan pe backend 15 min idle ke baad sleep ho jata hai, first request slow (~30-50s) hoga.
- `VITE_*` variable change karne ke baad Vercel pe redeploy zaroori hai.
- Original `project.zip` (zip ke andar zip) duplicate tha, hata diya. `/api/download-project-zip` endpoints bhi hata diye.
