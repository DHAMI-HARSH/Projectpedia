import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isProtectedProjectMutation = pathname.startsWith("/api/projects") && req.method !== "GET";

  if (!isAdminPage && !isProtectedProjectMutation) {
    return NextResponse.next();
  }

  if (isLoginPage) {
    return NextResponse.next();
  }

  if (await isAdminRequestAuthenticated(req)) {
    return NextResponse.next();
  }

  if (isProtectedProjectMutation) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("from", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/projects/:path*"],
};
