import { NavLink } from "@/components/shell/nav-link";
import { navSections } from "@/components/shell/nav-items";
import { can, requireStaff } from "@/lib/auth/dal";

export async function SidebarNav() {
  const staff = await requireStaff();

  return (
    <nav className="space-y-6">
      {navSections.map((section) => {
        const items = section.items.filter((item) => !item.permission || can(staff, item.permission));
        if (items.length === 0) {
          return null;
        }

        return (
          <div key={section.title} className="space-y-1">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-fg/50 group-data-collapsed/sidebar:lg:hidden">
              {section.title}
            </p>
            {items.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
            ))}
          </div>
        );
      })}
    </nav>
  );
}

export function SidebarNavSkeleton() {
  return (
    <div className="space-y-2 px-1">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="h-9 animate-pulse rounded-md bg-white/5" />
      ))}
    </div>
  );
}
