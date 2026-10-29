import Link from "next/link";
import { Suspense } from "react";

import { PageHeader } from "@/components/page-header";
import { RecentActivity } from "@/features/activity/recent-activity";
import { can, requireStaff } from "@/lib/auth/dal";
import { AdminUsersQuery } from "@/lib/graphql/operations";
import { gqlRequest } from "@/lib/graphql/server";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Operational overview of the platform." />
      <Suspense fallback={<StatsSkeleton />}>
        <Overview />
      </Suspense>
    </>
  );
}

async function Overview() {
  const staff = await requireStaff();
  const canViewUsers = can(staff, "users.view");
  const users = canViewUsers ? await gqlRequest(AdminUsersQuery, { first: 1 }) : null;

  const stats = [
    { label: "Registered users", value: users?.data?.adminUsers.paginatorInfo.total ?? "—", href: canViewUsers ? "/users" : undefined },
    { label: "Your role", value: staff.roles.join(", ") },
    { label: "Permissions", value: staff.permissions.length },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold capitalize tracking-tight">{stat.value}</p>
            {stat.href && (
              <Link href={stat.href} className="mt-3 inline-block text-xs font-medium text-primary hover:underline">
                View all →
              </Link>
            )}
          </div>
        ))}
      </div>

      {can(staff, "activity.view") && <RecentActivity />}
    </>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="card h-28 animate-pulse" />
      ))}
    </div>
  );
}
