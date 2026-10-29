"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, type IconName } from "@/components/shell/icons";
import { useUiStore } from "@/providers/ui-store-provider";

export function NavLink({ href, label, icon }: { href: string; label: string; icon: IconName }) {
  const pathname = usePathname();
  const closeMobile = useUiStore((s) => s.closeMobileSidebar);
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      title={label}
      onClick={closeMobile}
      aria-current={active ? "page" : undefined}
      className={`flex h-9 items-center gap-3 rounded-md px-3 text-sm transition-colors ${
        active ? "bg-sidebar-active font-medium text-white" : "hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon name={icon} />
      <span className="truncate group-data-collapsed/sidebar:lg:hidden">{label}</span>
    </Link>
  );
}
