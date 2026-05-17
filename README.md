## Projectpedia

Projectpedia is a Next.js + Supabase documentation hub with a protected admin workspace for managing project records, links, screenshots, milestones, and markdown docs.

## Local Setup

1. Copy `.env.local.example` to `.env.local`.
2. Fill in every required value:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Security

- Never commit `.env.local` or any real secrets.
- `SUPABASE_SERVICE_ROLE_KEY` must stay server-only.
- Rotate any secret immediately if it was ever exposed in git history, logs, or screenshots.

## Deploying To Vercel

1. Import the repository into Vercel.
2. Add these environment variables in the Vercel project settings:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_SECRET
ADMIN_USERNAME
ADMIN_PASSWORD
```

3. Deploy.

Recommended:

- Use a long random `NEXTAUTH_SECRET`.
- Use a strong `ADMIN_PASSWORD`.
- Keep Supabase row-level security enabled for public reads.

## Verification

```bash
npm run lint
npm run build
```
