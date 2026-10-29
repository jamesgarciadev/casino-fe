"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Icon } from "@/components/shell/icons";

/** Search box that syncs a debounced `q` param to the URL, so results stay shareable. */
export function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (value === current) {
      return;
    }

    const timeout = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (value) next.set("q", value);
      else next.delete("q");
      next.delete("page");
      startTransition(() => router.replace(`${pathname}?${next}`));
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, searchParams, pathname, router]);

  return (
    <div className="relative w-full sm:w-72">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
        <Icon name="search" />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`input pl-9 ${pending ? "opacity-70" : ""}`}
      />
    </div>
  );
}
