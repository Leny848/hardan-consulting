# Hardan Consulting — Website

Premium environmental & social assessment site with a live admin panel.
Admin edits and image uploads are stored in **Vercel Blob** so every visitor sees the same content.

---

## Live site

https://hardan-consulting.vercel.app

- **Admin:** https://hardan-consulting.vercel.app/admin  
- **Password:** `hardan2024`

---

## Make admin changes work on Vercel (required)

Admin used to save only in the browser. Now it needs **Vercel Blob** once:

### 1. Create Blob storage

1. Open [vercel.com](https://vercel.com) → project **hardan-consulting**
2. Go to **Storage**
3. Click **Create** → **Blob**
4. Name it e.g. `hardan-blob`
5. **Connect** it to the `hardan-consulting` project (Production + Preview)
6. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically

### 2. Redeploy with the new code

From your computer:

```bash
cd ~/Downloads/environmental-consultant-website
git add .
git commit -m "Persist admin edits and images with Vercel Blob"
git push origin main
npx vercel --prod
```

If Git is not connected yet, just:

```bash
cd ~/Downloads/environmental-consultant-website
npx vercel --prod
```

### 3. Confirm it works

1. Open `/admin` → log in with `hardan2024`
2. Status should say **Edits sync to the live site automatically** (not a red Blob warning)
3. Change a photo or text → wait for **Saved to cloud ✓**
4. Open the homepage in a private/incognito window — your change should appear

---

## Run locally

```bash
pnpm install
pnpm dev
```

For local cloud saves, pull env vars after Blob is created:

```bash
npx vercel env pull .env.local
pnpm dev
```

---

## Contact form → email

Uses FormSubmit (not Resend):

1. Set email in Admin → Contact
2. Send one test message from the live site
3. Confirm the FormSubmit email once

---

## Deploy commands (quick)

```bash
cd ~/Downloads/environmental-consultant-website
git add .
git commit -m "Update site"
git push origin main
npx vercel --prod
```
