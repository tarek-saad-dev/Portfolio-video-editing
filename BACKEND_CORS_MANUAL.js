/**
 * ============================================
 * CORS CONFIGURATION - بدون استخدام package cors
 * ============================================
 * 
 * إذا كنت لا تريد استخدام package cors
 * استخدم هذا الكود اليدوي
 */

const express = require('express');
const app = express();

// ============================================
// CORS MIDDLEWARE - يدوي
// ============================================
const PRODUCTION_ORIGIN = 'https://portfolio-video-editing-wheat.vercel.app';

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if origin is allowed
  const isAllowed = 
    origin === PRODUCTION_ORIGIN || 
    (origin && origin.endsWith('.vercel.app')); // Optional: Vercel preview support

  if (isAllowed) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

// ============================================
// OTHER MIDDLEWARE
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// YOUR ROUTES HERE
// ============================================

module.exports = app;

