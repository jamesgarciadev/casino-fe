"use client";

import { Icon } from "@/components/shell/icons";
import { useUiStore } from "@/providers/ui-store-provider";

export function MobileSidebarToggle() {
  const toggle = useUiStore((s) => s.toggleMobileSidebar);

  return (
    <button type="button" onClick={toggle} aria-label="Open navigation" className="btn btn-secondary size-9 px-0 lg:hidden">
      <Icon name="menu" />
    </button>
  );
}
