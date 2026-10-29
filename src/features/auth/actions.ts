"use server";

import { redirect } from "next/navigation";

import { loginSchema, type LoginValues } from "@/features/auth/schemas";
import { clearSessionToken, setSessionToken } from "@/lib/auth/session";
import { toActionResult, type ActionResult } from "@/lib/graphql/errors";
import { AdminLoginMutation, LogoutMutation } from "@/lib/graphql/operations";
import { gqlRequest } from "@/lib/graphql/server";

export async function adminLoginAction(values: LoginValues): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] ??= issue.message;
    }
    return { fieldErrors };
  }

  const { data, errors } = await gqlRequest(AdminLoginMutation, { input: parsed.data }, { token: null });
  if (!data?.adminLogin) {
    return toActionResult(errors);
  }

  await setSessionToken(data.adminLogin.token);
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  // Revoke server-side first; clear the cookie regardless so the session never lingers.
  await gqlRequest(LogoutMutation).catch(() => null);
  await clearSessionToken();
  redirect("/login");
}
