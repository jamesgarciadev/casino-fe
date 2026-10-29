import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <div className="mx-auto grid size-10 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-fg">CA</div>
          <h1 className="pt-3 text-xl font-semibold">Casino Admin</h1>
          <p className="text-sm text-muted">Staff access only. Activity is logged.</p>
        </div>
        <div className="card p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
