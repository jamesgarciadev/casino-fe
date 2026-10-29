"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useMutation } from "urql";

import type { Role } from "@/gql/graphql";
import { AdminAssignRoleMutation } from "@/lib/graphql/operations";

const roles: { value: Role; label: string }[] = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "MODERATOR", label: "Moderator" },
  { value: "ADMIN", label: "Admin" },
  { value: "OWNER", label: "Owner" },
];

/** Owner-only control. be re-checks `assignRole` and audit-logs the change. */
export function RoleSelect({ userId, current }: { userId: string; current: string }) {
  const router = useRouter();
  const [{ fetching }, assignRole] = useMutation(AdminAssignRoleMutation);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, startTransition] = useTransition();

  async function onChange(role: Role) {
    if (!window.confirm(`Change this user's role to ${role.toLowerCase()}? This is recorded in the audit log.`)) {
      return;
    }

    setError(null);
    const result = await assignRole({ userId, role });

    if (result.error) {
      setError(result.error.graphQLErrors[0]?.message ?? result.error.message);
      return;
    }

    // Re-render the Server Component table with fresh data.
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-1">
      <select
        aria-label="Role"
        value={current.toUpperCase()}
        disabled={fetching || refreshing}
        onChange={(e) => onChange(e.target.value as Role)}
        className="input h-8 w-36 py-0 text-xs"
      >
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
