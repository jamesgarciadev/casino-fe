import type { IconName } from "@/components/shell/icons";

export type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  /** Hides the item when the staff member lacks it. be still enforces access. */
  permission?: string;
};

export const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/", label: "Dashboard", icon: "dashboard" }],
  },
  {
    title: "Management",
    items: [
      { href: "/users", label: "Users", icon: "users", permission: "users.view" },
      { href: "/activity", label: "Audit log", icon: "activity", permission: "activity.view" },
    ],
  },
];
