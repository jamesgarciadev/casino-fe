import { expect, test } from "@playwright/test";

import { authState } from "./stack";
import { createCustomer, STAFF } from "./support";

test.use({ storageState: authState("owner") });

test("lists the seeded staff and customer accounts with their roles", async ({ page }) => {
  // Test-created users use example.com, so this stays on one page however many exist.
  await page.goto("/users?q=%40casino.test");

  for (const [email, role] of [
    [STAFF.owner.email, "owner"],
    [STAFF.admin.email, "ADMIN"],
    [STAFF.moderator.email, "MODERATOR"],
    ["customer@casino.test", "CUSTOMER"],
  ]) {
    const row = page.getByRole("row").filter({ hasText: email });
    // The owner's own row shows a badge; everyone else gets a role picker.
    await (role === "owner" ? expect(row).toContainText("owner") : expect(row.getByRole("combobox", { name: "Role" })).toHaveValue(role));
  }
});

test("search filters the table and is kept in the URL", async ({ page }) => {
  await page.goto("/users");

  await page.getByRole("searchbox", { name: "Search name or email" }).fill("moderator@casino");

  await expect(page).toHaveURL(/[?&]q=moderator%40casino/);
  await expect(page.getByRole("cell", { name: new RegExp(STAFF.moderator.email) })).toBeVisible();
  await expect(page.getByRole("cell", { name: new RegExp(STAFF.admin.email) })).toHaveCount(0);
});

test("search with no matches shows the empty state", async ({ page }) => {
  await page.goto("/users?q=nobody-by-this-name");

  await expect(page.getByText("No users match “nobody-by-this-name”.")).toBeVisible();
});

test("pagination moves to the next page", async ({ page, request }) => {
  // 20 per page; make sure there is a second page regardless of what other specs created.
  await Promise.all(Array.from({ length: 21 }, () => createCustomer(request, "pager")));

  await page.goto("/users");
  await page.getByRole("link", { name: "Next" }).click();

  await expect(page).toHaveURL(/[?&]page=2/);
  await expect(page.getByText(/Showing 21–/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Previous" })).toBeVisible();
});

test("owner promotes a customer and the change is in the audit log", async ({ page, request }) => {
  const customer = await createCustomer(request);
  await page.goto(`/users?q=${encodeURIComponent(customer.email)}`);
  const roleSelect = page.getByRole("combobox", { name: "Role" });
  await expect(roleSelect).toHaveValue("CUSTOMER");

  page.once("dialog", (dialog) => dialog.accept());
  await roleSelect.selectOption("MODERATOR");

  await expect(roleSelect).toHaveValue("MODERATOR");
  await page.reload();
  await expect(roleSelect).toHaveValue("MODERATOR");

  await page.goto("/activity");
  const entry = page.getByRole("row").filter({ hasText: "Assigned role [moderator]" }).first();
  await expect(entry).toContainText(STAFF.owner.email);
  await expect(entry).toContainText(`{"roles":["customer"]} → {"roles":["moderator"]}`);
});

test("cancelling the confirmation leaves the role unchanged", async ({ page, request }) => {
  const customer = await createCustomer(request);
  await page.goto(`/users?q=${encodeURIComponent(customer.email)}`);
  const roleSelect = page.getByRole("combobox", { name: "Role" });

  page.once("dialog", (dialog) => dialog.dismiss());
  await roleSelect.selectOption("ADMIN");

  await page.reload();
  await expect(roleSelect).toHaveValue("CUSTOMER");
});
