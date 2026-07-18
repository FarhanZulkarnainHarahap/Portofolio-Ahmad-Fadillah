# HR Portfolio Web

Next.js App Router frontend for the HR Portfolio full-stack project.

## Stack

- Next.js, React, TypeScript, Tailwind CSS
- React Hook Form + Zod
- GSAP reveal animation with reduced-motion support
- React Icons, Recharts, Sonner toasts
- API-driven public pages and protected admin screens

## Setup

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the deployed Express API, for example `https://your-api-domain.example/api/v1`.

## Commands

- `npm run dev` - development server
- `npm run build` - production build
- `npm run start` - run built app
- `npm run lint` - ESLint
- `npm run type-check` - TypeScript check
- `npm run test` - Vitest helper tests

## Content Rules

The public website does not contain seeded portfolio content or local JSON data. Pages call the Express API and show professional empty states when PostgreSQL has no published records.

## Admin

- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Project CRUD: `/admin/projects`
- Other modules expose API-backed resource views and share the `/api/v1/admin/:resource` REST surface.

Admin tokens are stored by the API in HTTP-only cookies. The frontend does not store sensitive tokens in `localStorage`.

## Deployment

Deploy to Vercel or any Next.js host. Configure `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` for the production environment.
