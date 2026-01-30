/**
 * ============================================
 * CORS CONFIGURATION - VERSION SIMPLIFIED
 * ============================================
 * 
 * نسخة مبسطة بدون دعم Vercel Preview URLs
 * فقط يسمح بالـ Production Frontend
 */

const express = require('express');
const cors = require('cors');

const app = express();

// ============================================
// CORS CONFIGURATION - بسيط ومباشر
// ============================================
const corsOptions = {
  origin: 'https://portfolio-video-editing-wheat.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Apply CORS
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// ============================================
// OTHER MIDDLEWARE
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// YOUR ROUTES HERE
// ============================================

module.exports = app;

