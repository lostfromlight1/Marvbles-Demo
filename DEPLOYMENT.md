# Deployment Guide

The project is ready to deploy. Choose one of these free hosting options:

## Option 1: Netlify (Recommended, easiest)

1. **Go to [netlify.com](https://netlify.com)** and sign up with GitHub
2. **Click "New site from Git"**
3. **Select GitHub** → Choose `lostfromlight1/Marvbles`
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy** — Netlify builds and deploys automatically

Your site will be live in ~2 minutes at a URL like `https://your-site-name.netlify.app`

## Option 2: Vercel (Also easy)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Import Project** → Select `Marvbles`
3. **Vercel auto-detects Vite** — no config needed
4. **Click Deploy**

Your site will be live at a URL like `https://marvbles.vercel.app`

## Option 3: GitHub Pages (Free, hosted on GitHub)

1. **Edit `vite.config.ts`** to add base path:
   ```typescript
   export default defineConfig({
     base: '/Marvbles/',
     plugins: [react()],
   })
   ```
2. **Run** `npm run build`
3. **Go to GitHub repo** → Settings → Pages
4. **Set source to** `Deploy from a branch` → `main` → `/root`
5. **Push** your changes to GitHub

Your site will be live at `https://lostfromlight1.github.io/Marvbles/`

## Option 4: Cloudflare Pages (Free)

1. **Go to [pages.cloudflare.com](https://pages.cloudflare.com)** and sign in
2. **Create a project** → Connect to GitHub → Select `Marvbles`
3. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Save and Deploy**

Your site will be live at `https://your-project.pages.dev`

---

## For Your College Demo

**Easiest way:** Push to GitHub, then use Netlify or Vercel to deploy in one click. Share the live URL with your college.

**Build is already done:** The `dist/` folder is ready to deploy. All assets are inside it.
