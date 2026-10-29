import Link from "next/link";

type PaginatorInfo = { currentPage: number; lastPage: number; total: number; perPage: number };

export function Pagination({
  info,
  basePath,
  params = {},
}: {
  info: PaginatorInfo;
  basePath: string;
  params?: Record<string, string | undefined>;
}) {
  const from = info.total === 0 ? 0 : (info.currentPage - 1) * info.perPage + 1;
  const to = Math.min(info.currentPage * info.perPage, info.total);

  const href = (page: number) => {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value);
    }
    search.set("page", String(page));
    return `${basePath}?${search}`;
  };

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <p className="text-muted">
        Showing <span className="font-medium text-fg">{from}</span>–<span className="font-medium text-fg">{to}</span> of{" "}
        <span className="font-medium text-fg">{info.total}</span>
      </p>
      <div className="flex gap-2">
        {info.currentPage > 1 ? (
          <Link href={href(info.currentPage - 1)} className="btn btn-secondary">
            Previous
          </Link>
        ) : (
          <span className="btn btn-secondary pointer-events-none opacity-50">Previous</span>
        )}
        {info.currentPage < info.lastPage ? (
          <Link href={href(info.currentPage + 1)} className="btn btn-secondary">
            Next
          </Link>
        ) : (
          <span className="btn btn-secondary pointer-events-none opacity-50">Next</span>
        )}
      </div>
    </div>
  );
}
