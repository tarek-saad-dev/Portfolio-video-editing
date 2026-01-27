# CORS Configuration Guide for Production-Only Backend

## Exact Express + CORS Middleware Configuration

### Option 1: Using `cors` package (Recommended)

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Production-only CORS configuration
// ONLY allows: https://portfolio-video-editing-pi.vercel.app
const corsOptions = {
  origin: 'https://portfolio-video-editing-pi.vercel.app',
  credentials: true, // If you need to send cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Your routes here
app.get('/api/projects', (req, res) => {
  // Your route handler
});

// ... rest of your routes
```

### Option 2: Manual CORS Headers (No package needed)

```javascript
const express = require('express');
const app = express();

// Production-only CORS middleware
const allowedOrigin = 'https://portfolio-video-editing-pi.vercel.app';

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Only allow the exact production frontend URL
  if (origin === allowedOrigin) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

// Your routes here
app.get('/api/projects', (req, res) => {
  // Your route handler
});
```

### Option 3: Strict Production-Only (Most Secure)

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Strict production-only CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Block requests with no origin (like mobile apps or Postman)
    if (!origin) {
      return callback(new Error('Not allowed by CORS - No origin header'));
    }
    
    // ONLY allow the exact production frontend URL
    if (origin === 'https://portfolio-video-editing-pi.vercel.app') {
      callback(null, true);
    } else {
      // Explicitly reject all other origins (including localhost)
      callback(new Error(`Not allowed by CORS - Origin: ${origin} is not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Your routes here
```

## Where to Put This Code in Your Server

### Typical Express Server Structure:

```
your-backend-repo/
├── server.js          ← Main entry point (put CORS here)
├── index.js           ← Alternative entry point
├── app.js             ← Express app setup (put CORS here if separate)
├── routes/
│   ├── projects.js
│   ├── skills.js
│   └── ...
└── package.json
```

### Implementation Location:

**Put the CORS configuration at the TOP of your main server file, BEFORE your routes:**

```javascript
// server.js or index.js

const express = require('express');
const cors = require('cors');

const app = express();

// ============================================
// CORS CONFIGURATION - PUT THIS FIRST
// ============================================
const corsOptions = {
  origin: 'https://portfolio-video-editing-pi.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ============================================
// OTHER MIDDLEWARE (after CORS)
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES (after middleware)
// ============================================
app.get('/api/projects', (req, res) => {
  // Your route handler
});

// ... rest of your routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Required Redeploy Steps on Vercel

1. **Install/Verify `cors` package** (if using Option 1 or 3):
   ```bash
   npm install cors
   ```

2. **Update your server code** with one of the CORS configurations above

3. **Test locally** (optional - but CORS will block localhost):
   ```bash
   npm start
   # or
   node server.js
   ```

4. **Commit and push to your repository**:
   ```bash
   git add .
   git commit -m "Configure CORS for production-only frontend"
   git push origin main
   ```

5. **Vercel will automatically redeploy**:
   - If connected to GitHub/GitLab/Bitbucket, Vercel auto-deploys on push
   - Check Vercel dashboard for deployment status
   - Wait for deployment to complete (usually 1-3 minutes)

6. **Verify the deployment**:
   - Check Vercel deployment logs for any errors
   - Test API from production frontend: `https://portfolio-video-editing-pi.vercel.app`
   - Verify CORS headers in browser DevTools → Network tab

## Why Requests from localhost Will Continue to Fail

### Technical Explanation:

1. **CORS Policy Enforcement**:
   - Browsers enforce CORS policies strictly
   - When your frontend at `http://localhost:3001` makes a request to `https://portfolio-video-editing-server.vercel.app`, the browser sends an `Origin: http://localhost:3001` header
   - Your server checks this origin against the allowed list
   - Since `http://localhost:3001` ≠ `https://portfolio-video-editing-pi.vercel.app`, the server rejects it

2. **Browser Error You'll See**:
   ```
   Access to fetch at 'https://portfolio-video-editing-server.vercel.app/api/projects' 
   from origin 'http://localhost:3001' has been blocked by CORS policy: 
   The request client is not a secure context.
   ```

3. **Server Response**:
   - The server will NOT include `Access-Control-Allow-Origin: http://localhost:3001` in the response
   - The browser sees this mismatch and blocks the response
   - Your frontend code will receive a CORS error, not the actual API data

### Why This is Expected Behavior:

✅ **Security**: Prevents unauthorized origins from accessing your API
✅ **Production-Only**: Forces you to test against production frontend
✅ **No Localhost Leaks**: Ensures localhost can't accidentally access production data
✅ **Compliance**: Matches your requirement of production-only setup

### What Happens:

```
┌─────────────────┐         Request with         ┌──────────────────────┐
│ localhost:3001  │ ──────── Origin: localhost ──>│ Vercel Backend       │
│ (Frontend)      │                               │ (Server)             │
└─────────────────┘                               └──────────────────────┘
                                                          │
                                                          │ Checks origin
                                                          │ ❌ NOT in allowed list
                                                          │
                                                          ▼
                                                   Response: NO CORS headers
                                                          │
┌─────────────────┐         Browser blocks        ┌──────────────────────┐
│ Browser         │ <─────── response ────────────│ (No data returned)  │
│ (CORS Error)    │                               │                      │
└─────────────────┘                               └──────────────────────┘
```

### Testing Production Setup:

To test your API, you MUST:
- Use the production frontend: `https://portfolio-video-editing-pi.vercel.app`
- OR use a tool like Postman/curl (which don't enforce CORS)
- OR temporarily add localhost to allowed origins (NOT recommended for production)

## Complete Example Server File

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Production-only CORS - ONLY allows production frontend
const corsOptions = {
  origin: 'https://portfolio-video-editing-pi.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API is running', status: 'ok' });
});

// Your API routes
app.get('/api/projects', (req, res) => {
  // Your projects logic
  res.json({ projects: [] });
});

app.get('/api/skills', (req, res) => {
  // Your skills logic
  res.json({ skills: [] });
});

// ... other routes

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// For Vercel serverless functions, export the app
// For regular Express server:
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;
```

## Summary

✅ **CORS Configuration**: Use `origin: 'https://portfolio-video-editing-pi.vercel.app'` only
✅ **Location**: Put CORS middleware at the top of your server file, before routes
✅ **Redeploy**: Push to Git → Vercel auto-deploys
✅ **Localhost Blocked**: This is expected and correct - localhost will always fail CORS
✅ **Production Only**: Your API is now locked to production frontend only

