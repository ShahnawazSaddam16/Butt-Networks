# Butt Networks — Marketing Website

> Professional web presence & portfolio for Butt Networks — a small team that builds modern full‑stack web apps, dashboards, e‑commerce, and mobile apps.  
> Live site: https://buttnetworks.com

## What this repo is

This repository contains the Next.js + React frontend for the Butt Networks website — marketing pages, project showcases, contact API, and static assets. It is the single‑page/front‑end entry used to showcase services, portfolio items, team bios, and a quote/estimate widget.

## Quick links

- Live site: https://buttnetworks.com
- Contact emails shown on site: dev.buttnetworks@gmail.com, wahbamir2010@gmail.com, shahnawazsaddamb@gmail.com.

---

# Features

- Marketing site with sections for About, Services, Projects, Team, Testimonials, Contact form and an estimate/quote UI.
- Projects gallery with per‑project pages.
- Contact API route for form submissions.
- Mobile friendly, built with modern React + Next.js patterns and Tailwind CSS.
- Small performance and accessibility improvements included.

---

# Tech stack

- Next.js (App Router)
- React
- Tailwind CSS
- Node.js for serverless / API routes
- MongoDB (optional for contact storage / backend)
- Optional: React Native for companion mobile apps

---

# Setup & local development

## Prerequisites

- Node.js 18+ (recommended)
- npm or pnpm

## Install & run

```bash
# install dependencies (npm)
npm install

# dev server
npm run dev

# build for production
npm run build

# start production server locally
npm start
```

_Note:_ If you use `pnpm` or `yarn`, replace commands accordingly.

## Environment variables

Create a `.env.local` in the project root for secrets. Example:

```env
# .env.local (example)
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/dbname
```

- `MONGODB_URI` — required if you want to persist contact messages or enable other DB features (handled in `lib/db.js`).
- `EMAIL_USER`, `EMAIL_PASS` — SMTP credentials for sending contact emails (if enabled).
- `NEXT_PUBLIC_SITE_URL` — used for canonical links, OpenGraph, or API URLs.

---

# Project structure

```
.
├── app
│   ├── About
│   │   └── page.js
│   ├── api
│   │   └── contact
│   │       └── route.js
│   ├── components
│   │   ├── About.js
│   │   ├── BirthDay.js
│   │   ├── DigitalX.js
│   │   ├── Footer.js
│   │   ├── Home.js
│   │   ├── MakeWeb.js
│   │   ├── Navbar.js
│   │   ├── Offer.js
│   │   ├── Projects.js
│   │   ├── Quiz-App.js
│   │   ├── Services.js
│   │   ├── Skills.js
│   │   ├── Team.js
│   │   ├── Testimonials.js
│   │   └── ThemeProvider.js
│   ├── Contact
│   │   └── page.js
│   ├── data
│   │   └── projects.js
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── projects
│       ├── [id]
│       │   └── page.js
│       └── page.js
├── lib
│   ├── db.js
│   ├── haptic.js
│   ├── useGlobalHaptics.js
│   └── utils.js
├── modal
│   └── message.js
├── public
│   └── ...static assets (images, apk, posters)...
├── next.config.mjs
├── package.json
└── README.md
```

---

# Important files / notes for maintainers

- `app/api/contact/route.js` — server endpoint for the contact form. Check authentication, email sending, and DB write logic before enabling in production.
- `lib/db.js` — small helper to connect to MongoDB; ensure `MONGODB_URI` is set.
- `lib/haptic.js` & `lib/useGlobalHaptics.js` — the haptic helper and global binder. Useful when testing touch interactions on mobile devices.
- `app/data/projects.js` — add new projects here to surface them on the Projects page and per‑project routes.

---

# Deployment

Recommended options:

- **Vercel** — zero config for Next.js (preferred for App Router features).
- **Hostinger / VPS + Nginx** — if you want full server control. For VPS, build with `npm run build` and run with `npm start` or use a process manager (PM2), and front with Nginx + HTTPS (Let's Encrypt).

---

# Contribution / PR checklist

- Run `npm run lint` and `npm test` (if tests are present).
- Keep UI changes mobile‑first and accessible.
- For content changes (team, contact), update `app/page.js` and relevant component files.
- Add images to `public/projects/<ProjectName>` and update `app/data/projects.js`.

---

# Authors & credits

Maintained by the Butt Networks team:

- Wahb Amir — Technical Lead & Co‑founder.
- Shahnawaz Saddam — Frontend & Full‑Stack Developer.

---

# License

Suggested: **MIT** — change to your preferred license in `LICENSE` file.

---

# Troubleshooting & tips

- If contact emails aren't sending: verify SMTP credentials, check provider (Gmail requires App Password when 2FA enabled).
- If haptics don't work on iOS: the browser may require a user gesture to unlock the AudioContext — test on a real device.
- If images don't show in production: ensure `public` paths are correct and not blocked by CSP.
