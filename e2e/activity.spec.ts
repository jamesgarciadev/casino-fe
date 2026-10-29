import { expect, test } from "@playwright/test";

import { authState } from "./stack";
import { STAFF } from "./support";

test.use({ storageState: authState("admin") });

test("audit log records staff sign-ins with the actor", async ({ page }) => {
  await page.goto("/activity");

  await expect(page.getByRole("heading", { name: "Audit log" })).toBeVisible();

  // Setup signed in every staff role, so each has an entry.
  for (const account of Object.values(STAFF)) {
    const row = page.getByRole("row").filter({ hasText: account.email }).filter({ hasText: "Signed in to admin console" });
    await expect(row.first()).toBeVisible();
  }
});

test("dashboard shows recent activity linking to the full log", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Recent activity" })).toBeVisible();
  await page.getByRole("link", { name: "Open audit log" }).click();

  await expect(page).toHaveURL("/activity");
});
