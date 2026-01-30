# Environment Variables Setup Guide

## What I Did

### 1. Created `.env` File
- **Location:** Root of your project (same level as `package.json`)
- **Content:** Contains your backend server URL
- **Format:** `REACT_APP_API_BASE_URL=https://portfolio-video-editing-server.vercel.app`

### 2. Created `.env.example` File
- **Purpose:** Template file for other developers
- **Content:** Same structure as `.env` but without sensitive data
- **Usage:** Copy to `.env` and fill in actual values

### 3. Updated `src/config/api.js`
- **Before:** Hardcoded URL
- **After:** Reads from `process.env.REACT_APP_API_BASE_URL`
- **Fallback:** Uses production URL if env variable not set

### 4. Verified `.gitignore`
- `.env` is already in `.gitignore` ✅
- This prevents committing sensitive data to Git

## How Environment Variables Work in React

### Create React App Rules

1. **Prefix Required:** All variables must start with `REACT_APP_`
   ```bash
   ✅ REACT_APP_API_BASE_URL
   ❌ API_BASE_URL (won't work)
   ```

2. **Build Time:** Variables are embedded at build time, not runtime
   - Set variables before running `npm start` or `npm run build`
   - Restart dev server after changing `.env`

3. **Access in Code:**
   ```javascript
   process.env.REACT_APP_API_BASE_URL
   ```

4. **No Quotes Needed:** Don't use quotes in `.env` file
   ```bash
   ✅ REACT_APP_API_BASE_URL=https://example.com
   ❌ REACT_APP_API_BASE_URL="https://example.com"
   ```

## File Structure

```
your-project/
├── .env                    ← Your actual environment variables (NOT in Git)
├── .env.example            ← Template file (IN Git)
├── .gitignore              ← Already ignores .env ✅
├── package.json
├── src/
│   └── config/
│       └── api.js          ← Updated to use process.env
└── ...
```

## How to Use

### For Development

1. **The `.env` file is already created** with your production URL
2. **Start your dev server:**
   ```bash
   npm start
   ```
3. **The app will use the URL from `.env`**

### For Different Environments

You can create multiple `.env` files:

- `.env` - Default (used by `npm start`)
- `.env.local` - Local overrides (ignored by Git)
- `.env.development` - Development environment
- `.env.production` - Production environment

**Priority:** `.env.local` > `.env.development` / `.env.production` > `.env`

### Example: Using Different URLs

**`.env` (Development):**
```bash
REACT_APP_API_BASE_URL=http://localhost:3000
```

**`.env.production` (Production Build):**
```bash
REACT_APP_API_BASE_URL=https://portfolio-video-editing-server.vercel.app
```

Then build:
```bash
npm run build
```

## Changing the Backend URL

### Method 1: Edit `.env` File
1. Open `.env` in your editor
2. Change the URL:
   ```bash
   REACT_APP_API_BASE_URL=https://your-new-backend-url.com
   ```
3. Restart your dev server (`npm start`)

### Method 2: Use Different Environment Files
Create `.env.local` for local overrides:
```bash
REACT_APP_API_BASE_URL=http://localhost:3000
```

## Security Best Practices

✅ **DO:**
- Keep `.env` in `.gitignore` (already done)
- Use `.env.example` as a template
- Use `REACT_APP_` prefix for public variables
- Restart dev server after changing `.env`

❌ **DON'T:**
- Commit `.env` to Git
- Put sensitive secrets in `.env` (they're exposed in the browser)
- Use environment variables for API keys (they're public in the bundle)

## Why This Approach?

### Benefits:
1. **Flexibility:** Easy to switch between dev/staging/production
2. **Security:** `.env` is not committed to Git
3. **Team Collaboration:** `.env.example` shows what's needed
4. **No Code Changes:** Change URL without editing source code

### How It Works:
1. You set `REACT_APP_API_BASE_URL` in `.env`
2. Create React App reads it at build time
3. `process.env.REACT_APP_API_BASE_URL` contains the value
4. Your `api.js` config uses it
5. All API calls use this URL

## Troubleshooting

### Variable Not Working?
1. **Check prefix:** Must start with `REACT_APP_`
2. **Restart server:** Stop and restart `npm start`
3. **Check spelling:** Exact match in `.env` and code
4. **No quotes:** Don't use quotes in `.env`

### Still Not Working?
Check browser console:
```javascript
console.log(process.env.REACT_APP_API_BASE_URL);
```

If `undefined`, the variable isn't being read. Check:
- File is named exactly `.env` (not `.env.txt`)
- Variable name matches exactly
- Server was restarted after changes

## Summary

✅ Created `.env` with your backend URL
✅ Created `.env.example` as template
✅ Updated `api.js` to use environment variable
✅ `.gitignore` already protects `.env`
✅ Ready to use - just restart your dev server!

**Next Steps:**
1. Restart your dev server: `npm start`
2. Your app will now use the URL from `.env`
3. To change it, edit `.env` and restart

