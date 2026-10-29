import type { APIRequestContext, BrowserContext, Page } from "@playwright/test";

import { API_URL, SESSION_COOKIE } from "./stack";

type Account = { name: string; email: string; password: string };

// Seeded by casino-be's DatabaseSeeder when APP_ENV=local.
const demo = (role: string): Account => ({
  name: `${role[0].toUpperCase()}${role.slice(1)} Demo`,
  email: `${role}@casino.test`,
  password: "Password1!",
});

export const STAFF = { owner: demo("owner"), admin: demo("admin"), moderator: demo("moderator") };
export const DEMO_CUSTOMER = demo("customer");

export async function signIn(page: Page, account: Pick<Account, "email" | "password">) {
  await page.goto("/login");
  await page.getByLabel("Work email").fill(account.email);
  await page.getByLabel("Password").fill(account.password);
  await page.getByRole("button", { name: "Sign in" }).click();
}

export async function sessionCookie(context: BrowserContext) {
  return (await context.cookies()).find((cookie) => cookie.name === SESSION_COOKIE);
}

/** Creates a throwaway customer straight through be's public `register` mutation. */
export async function createCustomer(request: APIRequestContext, label = "player"): Promise<Account> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const account = { name: `E2E ${label} ${id}`, email: `e2e-${label}-${id}@example.com`, password: "E2e-Password1!" };

  const response = await request.post(API_URL, {
    data: {
      query: "mutation ($input: RegisterInput!) { register(input: $input) { user { id } } }",
      variables: { input: { ...account, passwordConfirmation: account.password } },
    },
  });
  const body = await response.json();
  if (!body.data?.register) {
    throw new Error(`Could not create test customer: ${JSON.stringify(body.errors)}`);
  }

  return account;
}
