# HomelyHub - Comprehensive Full-Stack Deployment Guide

This document provides a complete, step-by-step walkthrough for deploying the **HomelyHub** full-stack MERN (MongoDB, Express, React, Node.js) application to production cloud platforms.

---

## 🏗️ 1. Architecture & Services Overview

```
+-------------------------------------------------------------------------+
|                               USER BROWSER                              |
+------------------------------------+------------------------------------+
                                     |
                                     | HTTPS (Requests + Secure Cookies)
                                     v
+------------------------------------+------------------------------------+
|               FRONTEND (Vercel or Netlify)                              |
|  - React 18 (Vite SPA)                                                  |
|  - Redux Toolkit State Management                                       |
|  - Environment: VITE_API_BASE_URL=https://<backend-service>/api        |
+------------------------------------+------------------------------------+
                                     |
                                     | REST API Calls (Axios + Credentials)
                                     v
+------------------------------------+------------------------------------+
|               BACKEND (Render Web Service)                              |
|  - Node.js & Express 5 (ES Modules)                                     |
|  - JWT Auth + HTTP-Only Cookies                                         |
|  - Environment: CORS ORIGIN_ACCESS_URL=https://<frontend-app>           |
+----------+-------------------------+-------------------------+----------+
           |                         |                         |
           v                         v                         v
+----------+-----------+  +----------+-----------+  +----------+-----------+
|    MongoDB Atlas     |  |    Groq Cloud API    |  |     ImageKit.io      |
| Cloud Database       |  | Llama-3 AI Engine    |  | Media & Image CDN    |
+----------------------+  +----------------------+  +----------------------+
```

---

## 📋 2. Prerequisites & Free Accounts Checklist

Before beginning deployment, ensure you have active free accounts on the following platforms:

1. **[GitHub](https://github.com/)** — Code repository hosting.
2. **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** — Managed cloud database.
3. **[Render](https://render.com/)** — Node.js backend hosting (Web Service).
4. **[Vercel](https://vercel.com/)** or **[Netlify](https://www.netlify.com/)** — Static React frontend hosting.
5. **[Groq Console](https://console.groq.com/)** — Free API key for AI Trip Planner and AI Description generator.
6. **[ImageKit.io](https://imagekit.io/)** — Image upload storage and CDN.
7. **[Mailtrap.io](https://mailtrap.io/)** — SMTP testing service for password reset emails.

---

## 🗄️ 3. Step 1: Set Up MongoDB Atlas Database

1. **Log in to MongoDB Atlas** and create a free tier **M0 Cluster**.
2. **Create a Database User**:
   - Go to **Security** $\rightarrow$ **Database Access**.
   - Click **Add New Database User**.
   - Set Authentication Method to **Password**.
   - Enter a username (e.g., `homelyhub_admin`) and a strong password (e.g., `SecurePass123!`).
   - Assign user privileges: **Read and write to any database**.
   - Click **Add User**.
3. **Configure Network Access (IP Whitelist)**:
   - Go to **Security** $\rightarrow$ **Network Access**.
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`).
   - Click **Confirm**. *(Note: This allows your Render backend servers to connect without being blocked).*
4. **Get the Connection String (URI)**:
   - Go to **Deployments** $\rightarrow$ **Database** $\rightarrow$ Click **Connect**.
   - Select **Drivers** (Node.js).
   - Copy the connection URI:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/homely_hub?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your actual database user credentials.

---

## 🐙 4. Step 2: Push Repository to GitHub

Ensure all sensitive files (like local `.env` and `node_modules`) are ignored by Git.

### 4.1 Verify `.gitignore` Files
Make sure you have a root `.gitignore` or subfolder `.gitignore` files with:
```gitignore
node_modules
.env
.env.local
dist
.system_generated
.DS_Store
```

### 4.2 Initialize Git and Push to GitHub
Open your terminal in the root `HomelyHub` folder:
```bash
# 1. Initialize git
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete HomelyHub application with deployment configuration"

# 4. Set main branch
git branch -M main

# 5. Link to your GitHub repo
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/HomelyHub.git

# 6. Push code to GitHub
git push -u origin main
```

---

## ⚙️ 5. Step 3: Deploy Backend to Render

1. Log in to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** (top right) $\rightarrow$ select **Web Service**.
3. Under **Connect a repository**, select your `HomelyHub` GitHub repository.
4. Fill in the **Web Service Configuration**:
   - **Name**: `homelyhub-api` (or any unique name)
   - **Region**: Select the region closest to you (e.g., *Singapore*, *Frankfurt*, *Oregon*)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` *(or `node src/index.js`)*
   - **Instance Type**: `Free`

5. Scroll down to the **Environment Variables** section and click **Add Environment Variable** for each of the following:

| Environment Variable Key | Example / Recommended Value | Purpose |
| :--- | :--- | :--- |
| `PORT` | `8080` | Internal application port |
| `NODE_ENV` | `production` | Enables secure HTTP-only cookies |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster0.../homely_hub` | MongoDB Atlas Connection String |
| `GROQ_API_KEY` | `gsk_xxxxxxxxxxxxxxxxxxxx` | Groq API Key for AI features |
| `JWT_SECRET` | `super_secret_homelyhub_production_jwt_key_987` | Cryptographic secret for auth tokens |
| `JWT_EXPIRES_IN` | `90d` | JWT token validity duration |
| `JWT_COOKIE_EXPIRES_IN` | `90` | Cookie expiry period (days) |
| `ORIGIN_ACCESS_URL` | `http://localhost:5173` | Allowed frontend origin for CORS *(update in Step 5)* |
| `IMAGE_KIT_PUBLIC_KEY` | `public_xxxxxxxxxxxx` | ImageKit public key |
| `IMAGE_KIT_PRIVATE_KEY` | `private_xxxxxxxxxxx` | ImageKit private key |
| `IMAGE_KIT_URL_ENDPOINT` | `https://ik.imagekit.io/your_endpoint` | ImageKit media URL endpoint |
| `MAIL_SMTP_HOST` | `sandbox.smtp.mailtrap.io` | Mailtrap host |
| `MAIL_SMTP_PORT` | `2525` | Mailtrap port |
| `MAIL_SMTP_USER` | `your_mailtrap_user` | Mailtrap SMTP username |
| `MAIL_SMTP_PASS` | `your_mailtrap_password` | Mailtrap SMTP password |

6. Click **Deploy Web Service**.
7. Wait 2–3 minutes for the build to complete.
8. Look for the message in logs:
   ```text
   App is running on port no: 8080
   Mongogodb connected
   ```
9. **Copy your live Backend URL** from the top of the Render page:
   `https://homelyhub-api.onrender.com`

### 5.1 Test Live Backend in Browser
Open your live backend URL in a new tab:
`https://homelyhub-api.onrender.com/`
👉 **Expected Output**: `"Homelyhub server is running"`

---

## 🎨 6. Step 4: Deploy Frontend (Vercel or Netlify)

Choose either **Vercel** (Option A) or **Netlify** (Option B).

---

### Option A: Deploy Frontend on Vercel (Recommended)

1. Log in to **[Vercel Dashboard](https://vercel.com/)**.
2. Click **Add New...** $\rightarrow$ select **Project**.
3. Find your `HomelyHub` repository and click **Import**.
4. Configure the project settings:
   - **Project Name**: `homelyhub`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** $\rightarrow$ Select `frontend` $\rightarrow$ Click **Continue**.
   - **Build Command**: `npm run build` *(detected automatically)*
   - **Output Directory**: `dist` *(detected automatically)*
   - **Install Command**: `npm install`
5. Expand the **Environment Variables** section:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://homelyhub-api.onrender.com/api` *(Your Render backend URL followed by `/api`)*
6. Click **Deploy**.
7. When deployment finishes, copy your live Frontend URL:
   `https://homelyhub.vercel.app`

---

### Option B: Deploy Frontend on Netlify

1. Log in to **[Netlify Dashboard](https://app.netlify.com/)**.
2. Click **Add new site** $\rightarrow$ **Import an existing project** $\rightarrow$ **GitHub**.
3. Select your `HomelyHub` repository.
4. Configure the build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Go to **Environment variables** $\rightarrow$ **Add a variable**:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://homelyhub-api.onrender.com/api`
6. Click **Deploy site**.
7. **Client-Side Routing Fix (SPA)**:
   In `frontend/public/`, ensure a file named `_redirects` exists containing:
   ```text
   /*    /index.html   200
   ```
   *(This ensures refreshing on subpages like `/login` or `/ai-trip-planner` does not show a Netlify 404).*

---

## 🔄 7. Step 5: Update CORS on the Backend

Now that your frontend has a live production URL, update the backend CORS origin to allow secure cookie authentication.

1. Go to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click your `homelyhub-api` Web Service.
3. Click on the **Environment** tab on the left sidebar.
4. Find `ORIGIN_ACCESS_URL` and click **Edit**.
5. Change its value to your live frontend URL **without any trailing slash**:
   ```text
   ORIGIN_ACCESS_URL = https://homelyhub.vercel.app
   ```
6. Click **Save Changes**.
7. Render will automatically redeploy with the new CORS origin policy.

---

## 🌱 8. Step 6: Seed Initial Properties to the Cloud Database

If your MongoDB database is empty, seed the sample properties (with images, amenities, and details) directly into your cloud database.

1. Open your local terminal in the project folder.
2. In `backend/.env`, ensure `MONGO_URI` is pointing to your MongoDB Atlas connection string.
3. Run the seed script:
   ```bash
   cd backend
   node src/utils/seedData.js
   ```
4. Output should display:
   ```text
   Connected to MongoDB for seeding...
   Successfully seeded 6 properties!
   ```

---

## ✅ 9. Step 7: End-to-End Production Verification Checklist

Visit your live production frontend (e.g. `https://homelyhub.vercel.app`) and verify the following:

- [ ] **Homepage Listings**: Stays, images, prices per night, and location names render on the homepage.
- [ ] **Search & Filter**: Search by city (e.g., "Mumbai" or "Goa") filters properties accurately.
- [ ] **Property Details**: Clicking any property card opens `/propertylist/:id` with full gallery, description, and booking calculator.
- [ ] **User Registration & Login**:
  - Go to `/signup`, register a new user.
  - Verify successful redirect and user avatar/name appearing in the header navigation.
- [ ] **AI Trip Planner (Trip Genie)**:
  - Navigate to `/ai-trip-planner`.
  - Enter Destination: `Goa`, Budget: `20000`, Days: `3`, People: `2`, select tags (`Beach`, `Food`).
  - Click **Generate Trip Plan** and verify the day-by-day itinerary and matching stays returned by Groq AI.
- [ ] **Hosting a Property**:
  - Navigate to `/accomodation` $\rightarrow$ click `+ Add new place`.
  - Test the **Generate with AI** description feature and submit a new property.
- [ ] **Booking & Checkout Flow**:
  - Select dates on a property, proceed to `/payment/:id`, and confirm test payment.
  - Verify the confirmed booking appears under `/user/mybookings`.

---

## 🛠️ 10. Troubleshooting & Common Deployment Issues

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **CORS Error: `No 'Access-Control-Allow-Origin' header`** | `ORIGIN_ACCESS_URL` on Render does not match your frontend URL. | Check Render Environment Variables. Ensure `ORIGIN_ACCESS_URL` has no trailing slash (`https://homelyhub.vercel.app`). |
| **Login works, but user logs out on page refresh** | Cookies rejected due to non-HTTPS cross-origin mismatch. | Ensure backend has `NODE_ENV=production` set, and frontend connects via `https://`. |
| **404 Page Not Found on page refresh in Vercel / Netlify** | SPA routing needs rewrites to `index.html`. | Add a `vercel.json` or `_redirects` file in `frontend/public/` directing all routes to `/index.html`. |
| **Backend crashes on startup on Render** | Missing `PORT` or mandatory credentials. | Ensure `PORT=8080` is in Render environment variables and `start` script is `"node src/index.js"`. |
| **AI Trip Planner returns 500 error** | `GROQ_API_KEY` is invalid or unset. | Generate a free API key at [console.groq.com](https://console.groq.com) and add it to Render's environment variables. |
| **Images not loading** | Image URLs blocked or invalid format. | Check ImageKit keys or use standard HTTPS image URLs. |

---

*HomelyHub is now fully deployed and live on the cloud! 🚀*
