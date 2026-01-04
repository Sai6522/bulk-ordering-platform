# Deployment Guide

## Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import `https://github.com/Sai6522/bulk-ordering-platform`
4. Set Framework Preset to "Create React App"
5. Set Root Directory to `frontend`
6. Deploy

## Backend Deployment (Render)

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click "New +" → "Web Service"
3. Connect `https://github.com/Sai6522/bulk-ordering-platform`
4. Configure:
   - Name: `bulk-ordering-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Deploy

## Alternative: Railway Deployment (Backend)

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set root directory to `backend`
6. Deploy

## Update Frontend API URLs

After backend deployment, update the API URLs in frontend components:
- Replace `http://localhost:5000` with your deployed backend URL
- Redeploy frontend

## Environment Variables (if needed)

For production, you may want to set:
- `PORT` (automatically set by most platforms)
- `NODE_ENV=production`
