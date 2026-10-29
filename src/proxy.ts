import { NextResponse, type NextRequest } from "next/server";

// Optimistic gate: visitors without a session cookie never render console pages.
// This is not the security boundary; be authorizes every admin operation.
// In production, also put the console behind SSO / IP allowlisting at the edge.
const SESSION_COOKIE = "casino_admin_token";

export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
