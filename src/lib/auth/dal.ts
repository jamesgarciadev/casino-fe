import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { getSessionToken } from "@/lib/auth/session";
import { MeQuery } from "@/lib/graphql/operations";
import { gqlRequest } from "@/lib/graphql/server";

/**
 * Data Access Layer: resolves the signed-in staff member. Deduplicated per request.
 * Permissions are used only to shape the UI; be authorizes every operation itself.
 */
export const getCurrentStaff = cache(async () => {
  if (!(await getSessionToken())) {
    return null;
  }

  const { data } = await gqlRequest(MeQuery);

  return data?.me ?? null;
});

export async function requireStaff() {
  const staff = await getCurrentStaff();

  if (!staff) {
    redirect("/login");
  }

  return staff;
}

export type Staff = Awaited<ReturnType<typeof requireStaff>>;

export function can(staff: Staff, permission: string): boolean {
  return staff.permissions.includes(permission);
}
