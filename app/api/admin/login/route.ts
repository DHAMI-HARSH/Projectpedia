import { createAdminSessionToken, getAdminCookieOptions, isValidAdminCredentials, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json()) as { password?: string; username?: string };

  if (!username || !password || !isValidAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const token = await createAdminSessionToken(username);

  cookieStore.set(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());

  return NextResponse.json({ ok: true });
}
