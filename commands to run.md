# HomelyHub - Step-by-Step Commands Guide

This document contains all the exact terminal commands required for local development, building, Git version control, and production deployment for **HomelyHub**.

---

## 💻 1. Local Development Commands

### Phase A: Install Dependencies
Open your terminal in the root project folder:

```bash
# 1. Install Backend Dependencies
cd backend
npm install
cd ..

# 2. Install Frontend Dependencies
cd frontend
npm install
cd ..
```

---

### Phase B: Seed Sample Data into Database
Populate your MongoDB database with sample properties, images, amenities, and details:

```bash
cd backend
node src/utils/seedData.js
cd ..
```

---

### Phase C: Run Development Servers Locally

#### Terminal 1 (Backend API):
```bash
cd backend
npm run dev
```
> **Backend runs on:** `http://localhost:8080`

#### Terminal 2 (Frontend React App):
```bash
cd frontend
npm run dev
```
> **Frontend runs on:** `http://localhost:5173`

---

## 🔨 2. Frontend Production Build & Test Commands

Test the production bundle locally before deploying to ensure there are no compilation errors:

```bash
cd frontend

# Build the optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🐙 3. Git & GitHub Deployment Commands

Push your codebase to GitHub so that cloud platforms (Render, Vercel, Netlify) can automatically build and deploy it.

### Step 3.1: First-Time Git Setup & Initial Push
Run these commands from the root `HomelyHub` folder:

```bash
# 1. Initialize Git repository
git init

# 2. Stage all files
git add .

# 3. Commit files
git commit -m "feat: complete HomelyHub project ready for deployment"

# 4. Set default branch to main
git branch -M main

# 5. Link to your GitHub remote repository (replace with your GitHub username)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/HomelyHub.git

# 6. Push to GitHub
git push -u origin main
```

---

### Step 3.2: Pushing Future Code Updates (Auto-Deploy)
Whenever you make changes to your code, run:

```bash
# 1. Stage changes
git add .

# 2. Commit changes
git commit -m "update: improvements and bug fixes"

# 3. Push to GitHub (triggers automatic deployment on Render & Vercel)
git push origin main
```

---

## ☁️ 4. Cloud Platform Build & Start Commands

Configure these exact commands in your cloud dashboards:

### 4.1 Render (Backend Web Service)
* **Root Directory:** `backend`
* **Build Command:**
  ```bash
  npm install
  ```
* **Start Command:**
  ```bash
  npm start
  ```
  *(or `node src/index.js`)*

---

### 4.2 Vercel / Netlify (Frontend)
* **Root / Base Directory:** `frontend`
* **Build Command:**
  ```bash
  npm run build
  ```
* **Publish / Output Directory:**
  ```bash
  dist
  ```

---

## 🚀 5. Optional: Deploy via CLI Tools

If you prefer deploying directly from your terminal using CLI tools instead of the web dashboard:

### Option A: Deploy Frontend with Vercel CLI
```bash
cd frontend

# Deploy preview version
npx vercel

# Deploy directly to production
npx vercel --prod
```

### Option B: Deploy Frontend with Netlify CLI
```bash
cd frontend

# Login to Netlify
npx netlify login

# Deploy directly to production
npx netlify deploy --prod --dir=dist
```

---

## 🔍 6. Live API Verification Commands

Test your deployed backend endpoints using cURL or PowerShell:

### 1. Test Backend Root Health Check:
```bash
curl https://<YOUR_RENDER_BACKEND_URL>/
```
> **Expected Output:** `Homelyhub server is running`

### 2. Test Listings API:
```bash
curl https://<YOUR_RENDER_BACKEND_URL>/api/v1/rent/listing
```
> **Expected Output:** JSON with `"status": "success"` and array of properties.

### 3. Test AI Trip Planner Endpoint:
```bash
curl -X POST https://<YOUR_RENDER_BACKEND_URL>/api/v1/rent/trip \
     -H "Content-Type: application/json" \
     -d '{"destination":"Goa","budget":"15000","days":"3","people":"2","interests":["Beach"]}'
```
> **Expected Output:** JSON containing AI-generated itinerary and matching stays.

---

## 📋 Quick Command Cheat Sheet

| Task | Location | Command |
| :--- | :--- | :--- |
| **Start Backend Dev** | `backend/` | `npm run dev` |
| **Start Frontend Dev** | `frontend/` | `npm run dev` |
| **Seed Database** | `backend/` | `node src/utils/seedData.js` |
| **Build Frontend** | `frontend/` | `npm run build` |
| **Push Updates to GitHub**| Root `/` | `git add . && git commit -m "update" && git push origin main` |
| **Deploy to Vercel** | `frontend/` | `npx vercel --prod` |
