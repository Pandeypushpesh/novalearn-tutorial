# NovaLearn Tutorial Platform

Full-stack tutorial experience inspired by W3Schools built with Next.js 15, Tailwind CSS, MongoDB (via Mongoose), and JWT authentication.

## Features

- Email/password auth (register, login, logout) with HTTP-only JWT cookies.
- Tutorial catalogue with categories, search, and dynamic slug pages.
- Interactive Monaco-based code boxes with syntax highlighting, copy, and run buttons.
- Progress tracking (last lesson, scroll position, completed lessons, reading history).
- Dashboard with continue card, stats, recommendations, and login "thank you" banner.
- Course builder with code-snippet management for quickly publishing new tutorials.
- Nodemailer-powered login notification emails so learners get a reminder in their inbox.
- Responsive layout, sidebar navigation, dark/light theme toggle, and SWR-powered live sidebar data.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `env.example` to `.env.local` (or `.env`) and fill in the values:

   ```bash
   cp env.example .env.local
   ```

   | Variable | Description |
   | --- | --- |
   | `MONGODB_URI` | MongoDB connection string (SRV or classic). |
   | `JWT_SECRET` | Long random string for signing auth tokens. |
   | `SMTP_HOST` / `SMTP_PORT` | SMTP server for Nodemailer (Mailtrap, Postmark, SES, etc.). |
   | `SMTP_USER` / `SMTP_PASS` | Credentials for the SMTP server (if required). |
   | `SMTP_FROM` | Friendly "from" address used in transactional emails. |
   | `SMTP_SECURE` | `true` to force TLS/465, otherwise `false` (defaults to `false`). |
   | `NEXT_PUBLIC_APP_URL` | Base URL used inside outbound emails. |

   If mail settings are omitted, login emails are silently skipped (handy for local dev).

3. **Seed tutorials (optional but recommended)**
   ```bash
   npm run seed
   ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit http://localhost:3000 to explore the application.

## Scripts

- `npm run dev` – start Next.js dev server.
- `npm run build` – build for production.
- `npm run start` – run production build.
- `npm run lint` – run ESLint.
- `npm run seed` – seed MongoDB with starter tutorials.

## Publishing a New Course

1. Sign in and head to `/dashboard/create-course`.
2. Fill out the required metadata (title, slug, category, content, optional order).
3. Add as many code snippets as you like—each one stores a language + code block that surfaces on the tutorial page.
4. Submit to publish immediately; the new tutorial shows up in `/tutorials` and is queryable through the API.
5. The form automatically slugifies the title, but you can override it if you need a custom URL.

## Project Structure

```
src/
  app/
    api/…        # REST endpoints
    tutorials/…  # tutorial list + slug pages
    dashboard/   # user dashboard
    (auth pages)
  components/    # UI building blocks
  hooks/         # client hooks
  lib/           # db, auth, models, services
  seed/          # tutorial data
scripts/
  seed.ts        # DB seeding utility
```

## Tech Stack

- Next.js 15 (App Router), React 18, TypeScript
- Tailwind CSS + @headlessui/react for UI polish
- MongoDB with Mongoose models
- JWT cookies for auth, SWR for live data
- Monaco Editor for interactive code boxes

## Notes

- The code runner is intentionally sandboxed and should not be used to execute untrusted backend code.
- Scroll tracking is stored as a ratio (0-1). For production, consider debouncing/throttling and background sync.
- For deployment, configure a managed MongoDB cluster, secure `JWT_SECRET`, and keep SMTP credentials in your secrets manager.
- The `/dashboard/create-course` page is available to any authenticated user; add role checks if you need stricter editorial controls.
- Login emails are queued inline via Nodemailer today. For very high traffic, consider offloading to a background job/queue.

