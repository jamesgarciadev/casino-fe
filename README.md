# casino-fe

**0dds.bet Admin**, the internal console for moderators, admins and owners. Talks only to `casino-be` over GraphQL.
See [ARCHITECTURE.md](ARCHITECTURE.md).

There is no admin design in `../casino-design`, so the console keeps its own layout and wears the customer app's
"Crimson Heat" palette and fonts (`src/app/globals.css`). It is dark-only: `dark:` utilities follow the `dark` class
on `<html>`.

## Tech stack

| Layer | What we use |
|---|---|
| Framework | Next.js 16.4 (App Router, Cache Components), React 19.3, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State and data | Zustand, urql (GraphQL client in the browser), GraphQL Code Generator (types and Zod base schemas from casino-be's schema) |
| Forms and validation | react-hook-form and Zod 4 |
| Tests and lint | Playwright 1.64 (end to end), ESLint 9 |

## Prerequisites

- Node.js 20.9 or newer (Next 16's minimum) and npm
- `casino-be` running on http://localhost:8000, with the repos cloned side by side
  (`npm run codegen` reads `../casino-be/graphql/schema.public.graphql`)

Ports: **3001** dev server. The end-to-end suite uses its own 3101 (app) and 8101 (be).

## Start it up

```sh
# 1. In casino-be (see its README), one command per terminal:
#      docker compose up -d --wait
#      php artisan serve

npm install                  # 2.
cp .env.example .env.local   # 3. CASINO_API_URL already points at http://localhost:8000/graphql
npm run codegen              # 4. types + Zod base schemas from casino-be's schema
npm run dev                  # 5. http://localhost:3001
```

It is working when the sign-in page loads and `owner@casino.test`, `admin@casino.test` or `moderator@casino.test`
(password `Password1!`) reach the dashboard. Customers are refused here; they sign in to `casino-web`.

Other scripts: `npm run lint`, `npm run typecheck`, `npm run build` then `npm start` for a production build.

## End-to-end tests (Playwright)

```sh
npx playwright install chromium   # once
npm run test:e2e                  # headless
npm run test:e2e:ui               # interactive runner
npm run test:e2e:report           # open the last HTML report (traces + screenshots on failure)
```

Requires Docker MySQL from `casino-be` to be up. The suite starts its own isolated stack, separate from your dev servers.
Outside CI, Playwright reuses anything already listening on ports 8101 or 3101 instead, so stop those first:

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
- casino-sim's service account (`simulator@casino.internal`) is listed with a read-only badge; be refuses role changes to it.
- In production, put this app behind SSO / 2FA / an IP allowlist at the edge.
