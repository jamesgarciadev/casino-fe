/** 0dds.bet mark (the design's lightning bolt on crimson), shared by the sidebar and the sign-in page. */
export function BrandMark({ className = "size-8" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-md bg-primary shadow-[0_0_20px_-4px_var(--primary)] ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-1/2 text-primary-fg">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    </span>
  );
}

export function Wordmark() {
  return (
    <span className="font-display font-extrabold tracking-tight">
      0DDS<span className="text-primary">.BET</span> <span className="font-normal text-muted">Admin</span>
    </span>
  );
}
