import { Icon } from "@/components/shell/icons";
import { RoleBadge } from "@/components/role-badge";
import { logoutAction } from "@/features/auth/actions";
import { requireStaff } from "@/lib/auth/dal";

export async function UserMenu() {
  const staff = await requireStaff();

  return (
    <>
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium leading-tight">{staff.name}</p>
        <p className="text-xs text-muted">{staff.email}</p>
      </div>
      {staff.roles.map((role) => (
        <RoleBadge key={role} role={role} />
      ))}
      <form action={logoutAction}>
        <button type="submit" className="btn btn-secondary size-9 px-0" aria-label="Sign out" title="Sign out">
          <Icon name="logout" />
        </button>
      </form>
    </>
  );
}
