import { expect, test } from "@playwright/test";

import { API_URL } from "./stack";
import { DEMO_CUSTOMER, sessionCookie, signIn, STAFF } from "./support";

test("console pages redirect to sign in when signed out", async ({ page }) => {
  for (const path of ["/", "/users", "/activity"]) {
    await page.goto(path);
    await expect(page).toHaveURL("/login");
  }
});

test("staff signs in with a strict, httpOnly session cookie", async ({ page, context }) => {
  await signIn(page, STAFF.admin);

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  const cookie = await sessionCookie(context);
  expect(cookie).toMatchObject({ httpOnly: true, sameSite: "Strict", path: "/" });

  const exposed = await page.evaluate(
    (value) => document.cookie.includes(value) || JSON.stringify({ ...localStorage, ...sessionStorage }).includes(value),
    cookie!.value,
  );
  expect(exposed).toBe(false);
});

test("wrong password shows an alert and sets no cookie", async ({ page, context }) => {
  await signIn(page, { email: STAFF.owner.email, password: "not-the-password" });

  await expect(page.getByRole("main").getByRole("alert")).toHaveText("These credentials do not match our records.");
  await expect(page).toHaveURL("/login");
  expect(await sessionCookie(context)).toBeUndefined();
});

test("customer accounts cannot sign in to the console", async ({ page }) => {
  await signIn(page, DEMO_CUSTOMER);

  await expect(page.getByRole("main").getByRole("alert")).toHaveText("These credentials do not match our records.");
  await expect(page).toHaveURL("/login");
});

test("a forged cookie is treated as signed out", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "casino_admin_token", value: "1|forged-token", url: baseURL! }]);

  await page.goto("/users");

  await expect(page).toHaveURL("/login");
});

test("sign out revokes the token and locks the console again", async ({ page, context, request }) => {
  // Own session, so the shared staff sessions used by other specs stay valid.
  await signIn(page, STAFF.moderator);
  await expect(page).toHaveURL("/");
  const token = (await sessionCookie(context))!.value;

  await page.getByRole("button", { name: "Sign out" }).click();

  await expect(page).toHaveURL("/login");
  expect(await sessionCookie(context)).toBeUndefined();

  const me = await request.post(API_URL, { headers: { Authorization: `Bearer ${token}` }, data: { query: "{ me { id } }" } });
  expect((await me.json()).errors?.[0]?.message).toBe("Unauthenticated.");

  await page.goto("/");
  await expect(page).toHaveURL("/login");
});
