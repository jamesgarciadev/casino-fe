# casino-fe

Internal admin console for moderators, admins and owners. Next.js 16 (App Router, Cache Components), Zustand, Zod, urql.
Talks only to `casino-be` over GraphQL. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Run locally

Requires `casino-be` running on http://localhost:8000, with the repos cloned side by side.

```sh
npm install
cp .env.example .env.local
npm run codegen   # types + Zod base schemas from ../casino-be/graphql/schema.public.graphql
npm run dev       # http://localhost:3001
```

Sign in with `owner@casino.test`, `admin@casino.test` or `moderator@casino.test` (password `password`).

## Access model

- Sign-in uses `adminLogin`, which issues an `admin`-scoped token (8h) kept in an httpOnly, SameSite=strict cookie.
- The sidebar hides sections the staff member lacks permission for. That is UX only; `be` authorizes every query and mutation.
- Role changes (owner only) are audit-logged in `be` and show up under **Audit log**.
- In production, put this app behind SSO / 2FA / an IP allowlist at the edge.
