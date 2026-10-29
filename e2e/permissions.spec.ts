import { expect, test, type Page } from "@playwright/test";

import { authState } from "./stack";
import { STAFF } from "./support";

const sidebar = (page: Page) => page.getByRole("navigation");

test.describe("moderator", () => {
  test.use({ storageState: authState("moderator") });

  test("sees Users but not the audit log in the sidebar", async ({ page }) => {
    await page.goto("/");

    await expect(sidebar(page).getByRole("link", { name: "Users" })).toBeVisible();
    await expect(sidebar(page).getByRole("link", { name: "Audit log" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Recent activity" })).toHaveCount(0);
  });

  test("opening the audit log directly shows access restricted", async ({ page }) => {
    await page.goto("/activity");

    await expect(page.getByText("Access restricted")).toBeVisible();
  });

  test("can view users but cannot change roles", async ({ page }) => {
    await page.goto(`/users?q=${encodeURIComponent(STAFF.owner.email)}`);

    await expect(page.getByRole("cell", { name: new RegExp(STAFF.owner.email) })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Role" })).toHaveCount(0);
  });
});

test.describe("admin", () => {
  test.use({ storageState: authState("admin") });

  test("sees Users and the audit log, with recent activity on the dashboard", async ({ page }) => {
    await page.goto("/");

    await expect(sidebar(page).getByRole("link", { name: "Users" })).toBeVisible();
    await expect(sidebar(page).getByRole("link", { name: "Audit log" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recent activity" })).toBeVisible();
  });

  test("cannot change roles", async ({ page }) => {
    await page.goto(`/users?q=${encodeURIComponent(STAFF.owner.email)}`);

    await expect(page.getByRole("cell", { name: new RegExp(STAFF.owner.email) })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Role" })).toHaveCount(0);
  });
});

test.describe("owner", () => {
  test.use({ storageState: authState("owner") });

  test("gets a role picker for everyone except themselves", async ({ page }) => {
    await page.goto(`/users?q=${encodeURIComponent(STAFF.admin.email)}`);
    await expect(page.getByRole("combobox", { name: "Role" })).toHaveValue("ADMIN");

    await page.goto(`/users?q=${encodeURIComponent(STAFF.owner.email)}`);
    await expect(page.getByRole("cell", { name: new RegExp(STAFF.owner.email) })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Role" })).toHaveCount(0);
  });
});
