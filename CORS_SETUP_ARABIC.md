# إعداد CORS للسيرفر - دليل بالعربي

## المشكلة
- Frontend: `https://portfolio-video-editing-wheat.vercel.app/`
- Backend: `https://portfolio-video-editing-server-three.vercel.app/`
- خطأ CORS يمنع الاتصال

## الحل

### الخطوة 1: تحديث الفرونت إند ✅
تم تحديث `src/config/api.js` لاستخدام الباك إند الجديد:
```javascript
'https://portfolio-video-editing-server-three.vercel.app'
```

### الخطوة 2: إعداد CORS في السيرفر

#### الطريقة الموصى بها (باستخدام package cors):

1. **تثبيت package:**
```bash
npm install cors
```

2. **ضع هذا الكود في ملف السيرفر الرئيسي (قبل الـ routes):**

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Production Frontend
    if (origin === 'https://portfolio-video-editing-wheat.vercel.app') {
      return callback(null, true);
    }
    
    // Optional: Allow Vercel preview URLs
    if (origin && origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes here...
```

## الملفات الجاهزة

تم إنشاء 3 ملفات جاهزة للاستخدام:

1. **`BACKEND_CORS_CODE.js`** - النسخة الكاملة مع دعم Vercel Preview
2. **`BACKEND_CORS_SIMPLE.js`** - نسخة مبسطة (فقط Production)
3. **`BACKEND_CORS_MANUAL.js`** - بدون استخدام package cors

## خطوات التنفيذ

### في السيرفر (Backend):

1. افتح ملف السيرفر الرئيسي (`server.js` أو `index.js`)
2. انسخ الكود من أحد الملفات أعلاه
3. ضعه **قبل** الـ routes مباشرة
4. تأكد من تثبيت `cors` package:
   ```bash
   npm install cors
   ```
5. Commit و Push:
   ```bash
   git add .
   git commit -m "Add CORS configuration"
   git push
   ```
6. Vercel سيعيد الـ deploy تلقائياً

### في الفرونت إند (Frontend):

✅ تم التحديث تلقائياً - يستخدم الآن:
- `https://portfolio-video-editing-server-three.vercel.app`

## التحقق من النجاح

1. افتح المتصفح على: `https://portfolio-video-editing-wheat.vercel.app`
2. افتح Developer Tools (F12)
3. اذهب إلى Network tab
4. شاهد الطلبات للـ API
5. تحقق من Headers:
   - `Access-Control-Allow-Origin: https://portfolio-video-editing-wheat.vercel.app`
   - `Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS`

## ملاحظات مهمة

- ✅ الكود يوضع **قبل** الـ routes
- ✅ `app.options('*', cors())` مهم جداً للـ preflight
- ✅ Methods تشمل: GET, POST, PUT, PATCH, DELETE, OPTIONS
- ✅ Headers: Content-Type, Authorization
- ✅ Optional: دعم Vercel Preview URLs (يمكن إزالته)

## استكشاف الأخطاء

إذا استمر الخطأ:

1. تأكد من أن الكود موجود **قبل** الـ routes
2. تأكد من تثبيت `cors` package
3. تحقق من الـ logs في Vercel Dashboard
4. تأكد من أن الفرونت يستخدم الباك إند الجديد

