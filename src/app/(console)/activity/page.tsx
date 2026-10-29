import type { Metadata } from "next";
import { Suspense } from "react";

import { ApiErrorNotice } from "@/components/notice";
import { PageHeader } from "@/components/page-header";
import { TableSkeleton } from "@/components/table/data-table";
import { Pagination } from "@/components/table/pagination";
import { ActivityTable } from "@/features/activity/activity-table";
import { parsePage } from "@/lib/format";
import { AdminActivitiesQuery } from "@/lib/graphql/operations";
import { gqlRequest } from "@/lib/graphql/server";

export const metadata: Metadata = { title: "Audit log" };

const PER_PAGE = 25;

export default function ActivityPage({ searchParams }: PageProps<"/activity">) {
  return (
    <>
      <PageHeader
        title="Audit log"
        description="Every admin change and staff sign-in, with before and after state."
        breadcrumbs={[{ label: "Management" }, { label: "Audit log" }]}
      />
      <Suspense fallback={<TableSkeleton />}>
        <ActivityResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ActivityResults({ searchParams }: Pick<PageProps<"/activity">, "searchParams">) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const { data, errors } = await gqlRequest(AdminActivitiesQuery, { page, first: PER_PAGE });

  if (!data) {
    return <ApiErrorNotice errors={errors} />;
  }

  return (
    <ActivityTable
      rows={data.adminActivities.data}
      footer={<Pagination info={data.adminActivities.paginatorInfo} basePath="/activity" />}
    />
  );
}
