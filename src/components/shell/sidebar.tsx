"use client";

import type { ReactNode } from "react";

import { BrandMark, Wordmark } from "@/components/brand";
import { Icon } from "@/components/shell/icons";
import { useUiStore } from "@/providers/ui-store-provider";

export function Sidebar({ children }: { children: ReactNode }) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const mobileOpen = useUiStore((s) => s.mobileSidebarOpen);
  const toggle = useUiStore((s) => s.toggleSidebar);
  const closeMobile = useUiStore((s) => s.closeMobileSidebar);

  return (
    <>
      {mobileOpen && (
        <button type="button" aria-label="Close navigation" onClick={closeMobile} className="fixed inset-0 z-30 bg-black/50 lg:hidden" />
      )}
      <aside
        data-collapsed={collapsed || undefined}
        className={`group/sidebar fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-fg transition-[width,transform] lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 data-collapsed:lg:w-16 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center gap-2.5 border-b border-white/10 px-4">
          <BrandMark />
          <span className="truncate text-sm text-white group-data-collapsed/sidebar:lg:hidden">
            <Wordmark />
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">{children}</div>

        <button
          type="button"
          onClick={toggle}
          className="hidden h-11 items-center gap-3 border-t border-white/10 px-5 text-xs text-sidebar-fg/70 hover:text-white lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon name={collapsed ? "expand" : "collapse"} />
          <span className="group-data-collapsed/sidebar:hidden">Collapse</span>
        </button>
      </aside>
    </>
  );
}
