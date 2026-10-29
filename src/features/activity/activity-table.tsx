import { DataTable, type Column } from "@/components/table/data-table";
import type { AdminActivitiesQuery } from "@/gql/graphql";
import { formatDateTime } from "@/lib/format";

export type ActivityRow = AdminActivitiesQuery["adminActivities"]["data"][number];

function changeSummary(properties: string | null | undefined): string | null {
  if (!properties) {
    return null;
  }

  try {
    const parsed = JSON.parse(properties) as { old?: Record<string, unknown>; attributes?: Record<string, unknown> };
    if (!parsed.old && !parsed.attributes) {
      return null;
    }
    return `${JSON.stringify(parsed.old ?? {})} → ${JSON.stringify(parsed.attributes ?? {})}`;
  } catch {
    return null;
  }
}

const columns: Column<ActivityRow>[] = [
  {
    key: "when",
    header: "When",
    className: "whitespace-nowrap text-muted",
    cell: (row) => formatDateTime(row.createdAt),
  },
  {
    key: "actor",
    header: "Actor",
    cell: (row) =>
      row.causer ? (
        <div>
          <p className="font-medium">{row.causer.name}</p>
          <p className="text-xs text-muted">{row.causer.email}</p>
        </div>
      ) : (
        <span className="text-muted">System</span>
      ),
  },
  {
    key: "event",
    header: "Event",
    cell: (row) => (
      <div className="space-y-1">
        <p>{row.description}</p>
        <div className="flex gap-1.5">
          {row.logName && <code className="rounded bg-surface-muted px-1.5 py-0.5 text-[11px] text-muted">{row.logName}</code>}
          {row.event && <code className="rounded bg-surface-muted px-1.5 py-0.5 text-[11px] text-muted">{row.event}</code>}
        </div>
      </div>
    ),
  },
  {
    key: "subject",
    header: "Subject",
    className: "whitespace-nowrap text-muted",
    cell: (row) => (row.subjectType ? `${row.subjectType.split("\\").pop()} #${row.subjectId}` : "—"),
  },
  {
    key: "changes",
    header: "Changes",
    className: "font-mono text-xs text-muted",
    cell: (row) => changeSummary(row.properties) ?? "—",
  },
];

export function ActivityTable({ rows, footer }: { rows: ActivityRow[]; footer?: React.ReactNode }) {
  return <DataTable columns={columns} rows={rows} empty="No activity recorded yet." footer={footer} />;
}
