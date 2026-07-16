# Hardan Consulting — Website

Premium environmental & social assessment site with admin panel. No database — content saves in the browser.

---

## Run locally

```bash
pnpm install
pnpm dev
```

- **Site:** http://localhost:3000  
- **Admin:** http://localhost:3000/admin  
- **Password:** `hardan2024`

If port 3000 is busy: `fuser -k 3000/tcp` then `pnpm dev` again.

---

## Host perfectly on Vercel (recommended)

Vercel is made for Next.js — free tier, automatic HTTPS, custom domain.

### Step 1 — Push to GitHub

```bash
cd ~/Downloads/environmental-consultant-website
git init
git add .
git commit -m "Hardan Consulting website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hardan-consulting.git
git push -u origin main
```

### Step 2 — Deploy

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. **Import** your repository
4. Leave defaults (Framework: Next.js, Build: `next build`)
5. Click **Deploy**

You get a live URL like `https://hardan-consulting.vercel.app`

### Step 3 — After deploy checklist

1. Open `https://your-site.vercel.app/admin`
2. Log in with `hardan2024` → **change the password**
3. Confirm contact email: `hardanconsulting@hotmail.com`
4. Submit one test message from the contact form
5. Click the **FormSubmit confirmation link** in your inbox (one-time only)
6. (Optional) Add your domain: Vercel → Project → Settings → Domains

### Step 4 — Custom domain (optional)

Buy a domain (Namecheap, GoDaddy, etc.), then in Vercel → Domains → add `hardanconsulting.com` and follow the DNS instructions.

---

## Alternative: deploy from terminal

```bash
pnpm add -g vercel
cd ~/Downloads/environmental-consultant-website
vercel          # preview
vercel --prod   # production
```

---

## Contact form → your email

Uses **FormSubmit** (free, no Resend):

1. Set email in Admin → Contact details
2. First submission triggers a one-time confirm email — click the link
3. All future messages arrive in your inbox

---

## Logo & favicon

- **Transparent HD emblem** — globe + leaf, no black box
- **Browser tab icon** — globe emblem at `/icon.png`
- Files: `public/images/hardan-emblem.png`, `app/icon.png`

---

## Admin password

Default: **`hardan2024`** — change it in Admin → Admin password after first login.
