import { Suspense } from "react";

import { Sidebar } from "@/components/shell/sidebar";
import { SidebarNav, SidebarNavSkeleton } from "@/components/shell/sidebar-nav";
import { Topbar } from "@/components/shell/topbar";

export default function ConsoleLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <Suspense fallback={<SidebarNavSkeleton />}>
          <SidebarNav />
        </Suspense>
      </Sidebar>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
