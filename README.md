# Hardan Consulting — Website

Premium environmental & social assessment site with a live admin panel.
Admin edits and image uploads are stored in **Supabase** so every visitor sees the same content.

---

## Live site

https://hardan-consulting.vercel.app

- **Admin:** https://hardan-consulting.vercel.app/admin  
- **Password:** `hardan2024`

---

## Make admin changes work with Supabase (required)

Admin changes and image uploads are persisted in **Supabase**. Follow these steps once:

### 1. Set up Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the **SQL Editor**, run the following script to create the table for site settings:
   ```sql
   create table if not exists site_settings (
     key text primary key,
     value jsonb not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```
3. Go to **Storage** in the sidebar, click **New bucket**, name it `hardan-uploads`, and toggle **Public bucket** to `ON`.

### 2. Set Environment Variables
Copy these values from your Supabase Project Settings (Settings → API) and add them to your environment variables (in `.env.local` for local development, or in Vercel project environment variables):
* `SUPABASE_URL` = (Your Project URL)
* `SUPABASE_SERVICE_ROLE_KEY` = (Your `service_role` secret key — do NOT share this publicly, as it bypasses Row Level Security to allow secure admin edits server-side)

### 3. Deploy/Run
For local development, save them to `.env.local` and run:
```bash
pnpm dev
```

For production deployment, add the environment variables in your Vercel Project Settings, then deploy:
```bash
npx vercel --prod
```

### 4. Confirm it works

1. Open `/admin` → log in with `hardan2024`
2. Status should say **Saved to cloud ✓** when you edit text or upload an image.
3. Open the homepage in a private/incognito window — your changes should appear instantly.

---

## Run locally

```bash
pnpm install
pnpm dev
```

For local cloud saves, add the environment variables to `.env.local`:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

And run:
```bash
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
