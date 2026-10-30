import type { Metadata } from "next";

import { BrandMark, Wordmark } from "@/components/brand";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <BrandMark className="mx-auto size-10" />
          <h1 className="pt-3 text-xl">
            <Wordmark />
          </h1>
          <p className="text-sm text-muted">Staff access only. Activity is logged.</p>
        </div>
        <div className="card p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
