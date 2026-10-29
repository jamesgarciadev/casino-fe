import type { Metadata } from "next";
import { Suspense } from "react";

import { ApiErrorNotice } from "@/components/notice";
import { PageHeader } from "@/components/page-header";
import { RoleBadge } from "@/components/role-badge";
import { DataTable, TableSkeleton, type Column } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { SearchInput } from "@/components/table/search-input";
import { RoleSelect } from "@/features/users/role-select";
import type { AdminUsersQuery as AdminUsersResult } from "@/gql/graphql";
import { can, requireStaff } from "@/lib/auth/dal";
import { formatDate, parsePage } from "@/lib/format";
import { AdminUsersQuery } from "@/lib/graphql/operations";
import { gqlRequest } from "@/lib/graphql/server";

export const metadata: Metadata = { title: "Users" };

const PER_PAGE = 20;

type UserRow = AdminUsersResult["adminUsers"]["data"][number];

export default function UsersPage({ searchParams }: PageProps<"/users">) {
  return (
    <>
      <PageHeader
        title="Users"
        description="Search accounts and manage staff roles."
        breadcrumbs={[{ label: "Management" }, { label: "Users" }]}
        actions={
          <Suspense>
            <SearchInput placeholder="Search name or email" />
          </Suspense>
        }
      />
      <Suspense fallback={<TableSkeleton />}>
        <UsersResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function UsersResults({ searchParams }: Pick<PageProps<"/users">, "searchParams">) {
  const params = await searchParams;
  const search = typeof params.q === "string" && params.q ? params.q : undefined;
  const page = parsePage(params.page);

  const [staff, { data, errors }] = await Promise.all([
    requireStaff(),
    gqlRequest(AdminUsersQuery, { search, page, first: PER_PAGE }),
  ]);

  if (!data) {
    return <ApiErrorNotice errors={errors} />;
  }

  const canManageRoles = can(staff, "users.manage-roles");

  const columns: Column<UserRow>[] = [
    {
      key: "user",
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-muted text-xs font-semibold text-muted">
            {row.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium">{row.name}</p>
            <p className="truncate text-xs text-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      cell: (row) => {
        const role = row.roles[0] ?? "customer";
        return canManageRoles && row.id !== staff.id ? <RoleSelect userId={row.id} current={role} /> : <RoleBadge role={role} />;
      },
    },
    { key: "id", header: "ID", className: "font-mono text-xs text-muted", cell: (row) => row.id },
    { key: "joined", header: "Joined", className: "whitespace-nowrap text-muted", cell: (row) => formatDate(row.createdAt) },
  ];

  return (
    <DataTable
      columns={columns}
      rows={data.adminUsers.data}
      empty={search ? `No users match “${search}”.` : "No users yet."}
      footer={<Pagination info={data.adminUsers.paginatorInfo} basePath="/users" params={{ q: search }} />}
    />
  );
}
