import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminEnv } from "./env";

export const ADMIN_COOKIE_NAME = "ppedia_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

type AdminSessionPayload = {
  exp: number;
  sub: string;
};

function getAdminSecret() {
  return getAdminEnv().secret;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

async function sign(value: string) {
  const secret = getAdminSecret();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));

  return Buffer.from(signature).toString("base64url");
}

export async function createAdminSessionToken(username: string) {
  const payload: AdminSessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    sub: username,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = await sign(encodedPayload);
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as AdminSessionPayload;
    if (!payload.sub || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function isValidAdminCredentials(username: string, password: string) {
  const adminEnv = getAdminEnv();
  return username === adminEnv.username && password === adminEnv.password;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function isAdminRequestAuthenticated(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  return Boolean(await verifyAdminSessionToken(token));
}
