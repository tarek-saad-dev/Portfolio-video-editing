/**
 * ============================================
 * CORS CONFIGURATION FOR EXPRESS SERVER
 * ============================================
 * 
 * ضع هذا الكود في ملف السيرفر الرئيسي (server.js أو index.js)
 * قبل الـ routes مباشرة
 * 
 * Installation:
 * npm install cors
 */

const express = require('express');
const cors = require('cors');

const app = express();

// ============================================
// CORS CONFIGURATION - ضع هذا قبل الـ routes
// ============================================

// Production Frontend URL
const PRODUCTION_ORIGIN = 'https://portfolio-video-editing-wheat.vercel.app';

// CORS Options with Vercel Preview Support
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    // Remove this if you want to block requests without origin
    if (!origin) {
      return callback(null, true);
    }

    // Check if it's the production frontend
    if (origin === PRODUCTION_ORIGIN) {
      return callback(null, true);
    }

    // Optional: Allow any Vercel preview URL ending with .vercel.app
    // Uncomment the following lines if you want to allow preview deployments
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    // Reject all other origins
    callback(new Error(`Not allowed by CORS - Origin: ${origin} is not allowed`));
  },
  credentials: true, // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  optionsSuccessStatus: 200, // For legacy browser support
  maxAge: 86400 // Cache preflight requests for 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly (OPTIONS method)
app.options('*', cors(corsOptions));

// ============================================
// OTHER MIDDLEWARE (بعد CORS)
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// YOUR ROUTES (بعد الـ middleware)
// ============================================
// Example:
// app.get('/api/projects', (req, res) => {
//   res.json({ projects: [] });
// });

// ============================================
// EXPORT FOR VERCEL SERVERLESS
// ============================================
module.exports = app;

// OR for regular Express server:
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

