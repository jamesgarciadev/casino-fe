import { execFileSync } from "node:child_process";

import { expect, test as setup } from "@playwright/test";

import { authState, BACKEND_DIR, backendEnv } from "./stack";
import { STAFF, signIn } from "./support";

setup.describe.configure({ mode: "serial" });

setup("reset the E2E database", () => {
  const artisan = (...args: string[]) =>
    execFileSync("php", ["artisan", ...args, "--force"], {
      cwd: BACKEND_DIR,
      env: { ...process.env, ...backendEnv },
      stdio: "pipe",
    });

  artisan("migrate"); // creates the database on first run
  artisan("migrate:fresh", "--seed");
});

for (const role of ["owner", "admin", "moderator"] as const) {
  setup(`sign in as ${role}`, async ({ page }) => {
    await signIn(page, STAFF[role]);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await page.context().storageState({ path: authState(role) });
  });
}
