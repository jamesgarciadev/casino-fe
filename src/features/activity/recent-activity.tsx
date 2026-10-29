import Link from "next/link";

import { ApiErrorNotice } from "@/components/notice";
import { ActivityTable } from "@/features/activity/activity-table";
import { AdminActivitiesQuery } from "@/lib/graphql/operations";
import { gqlRequest } from "@/lib/graphql/server";

export async function RecentActivity() {
  const { data, errors } = await gqlRequest(AdminActivitiesQuery, { first: 5 });

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Recent activity</h2>
        <Link href="/activity" className="text-sm font-medium text-primary hover:underline">
          Open audit log
        </Link>
      </div>
      {data ? <ActivityTable rows={data.adminActivities.data} /> : <ApiErrorNotice errors={errors} />}
    </section>
  );
}
