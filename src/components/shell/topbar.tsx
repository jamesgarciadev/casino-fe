import { Suspense } from "react";

import { MobileSidebarToggle } from "@/components/shell/mobile-sidebar-toggle";
import { UserMenu } from "@/components/shell/user-menu";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur lg:px-6">
      <MobileSidebarToggle />
      <div className="ml-auto flex items-center gap-3">
        <Suspense fallback={<div className="h-8 w-44 animate-pulse rounded-md bg-surface-muted" />}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}
