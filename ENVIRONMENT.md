# Environment Configuration

This project supports both local development and production deployment with automatic environment detection.

## Environment Files

- `.env.development` - Used during local development (`npm start`)
- `.env.production` - Used during production build (`npm run build`)

## Current Configuration

**Development (Local):**
```
REACT_APP_API_URL=http://localhost:5000
```

**Production (Deployed):**
```
REACT_APP_API_URL=https://bulk-ordering-platform-myx5.onrender.com
```

## How It Works

1. **Local Development**: Frontend connects to `localhost:5000` backend
2. **Production Build**: Frontend connects to deployed backend URL
3. **Automatic Detection**: React automatically uses the correct environment file

## Testing Both Environments

**Local:**
```bash
npm run dev  # Starts both frontend and backend locally
```

**Production:**
Visit: https://bulk-ordering-platform-1.onrender.com
