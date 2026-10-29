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

## End-to-end tests (Playwright)

```sh
npx playwright install chromium   # once
npm run test:e2e                  # headless
npm run test:e2e:ui               # interactive runner
npm run test:e2e:report           # open the last HTML report (traces + screenshots on failure)
```

Requires Docker MySQL from `casino-be` to be up. The suite starts its own isolated stack, separate from your dev servers:

| Piece | Port | Notes |
|---|---|---|
| `casino-be` (`php artisan serve`) | 8101 | database `casino_e2e_fe`, reset and seeded every run |
| this app (`next build` + `next start`) | 3101 | production build, so cookies behave like a real deploy |

The E2E backend uses an in-memory cache, which disables the per-IP login throttle so repeated runs don't lock
themselves out. Rate limiting is covered by `casino-be`'s PHPUnit suite instead.

Specs live in `e2e/`. `global.setup.ts` resets the database and signs in as owner, admin and moderator once; specs
reuse those sessions via `storageState`. Test customers are created through `be`'s public `register` mutation
(`createCustomer` in `e2e/support.ts`) and use `@example.com`, so searching `@casino.test` only returns demo accounts.

| Spec | Covers |
|---|---|
| `auth.spec.ts` | sign-in, cookie flags, wrong password, customers blocked, forged cookie, sign-out revokes token |
| `permissions.spec.ts` | what moderator / admin / owner can see and do |
| `users.spec.ts` | listing, search, pagination, role change + audit entry, cancelled change |
| `activity.spec.ts` | audit log entries for staff sign-ins, dashboard link |

## Access model

- Sign-in uses `adminLogin`, which issues an `admin`-scoped token (8h) kept in an httpOnly, SameSite=strict cookie.
- The sidebar hides sections the staff member lacks permission for. That is UX only; `be` authorizes every query and mutation.
- Role changes (owner only) are audit-logged in `be` and show up under **Audit log**.
- In production, put this app behind SSO / 2FA / an IP allowlist at the edge.
