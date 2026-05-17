import { ADMIN_COOKIE_NAME, getAdminCookieOptions } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    ...getAdminCookieOptions(),
    maxAge: 0,
  });

  return NextResponse.json({ ok: true });
}
