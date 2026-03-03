import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function signPayload(payload: string) {
  const secret = getSessionSecret();
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function verifyAdminCredentials(username: string, password: string) {
  const configuredUsername = process.env.ADMIN_USERNAME ?? "";
  const configuredPassword = process.env.ADMIN_PASSWORD ?? "";
  return username === configuredUsername && password === configuredPassword;
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && getSessionSecret());
}

export function createAdminSessionToken(username: string) {
  const payload = JSON.stringify({
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });
  const encoded = base64UrlEncode(payload);
  const signature = signPayload(encoded);
  return `${encoded}.${signature}`;
}

export function verifyAdminSessionToken(token: string) {
  if (!token || !getSessionSecret()) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = signPayload(encoded);
  if (signature !== expected) return null;

  try {
    const parsed = JSON.parse(base64UrlDecode(encoded)) as { username?: string; exp?: number };
    if (!parsed.username || !parsed.exp) return null;
    if (parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return { username: parsed.username };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? "";
  return verifyAdminSessionToken(token);
}

export const adminSessionCookie = {
  name: ADMIN_SESSION_COOKIE,
  maxAge: SESSION_TTL_SECONDS,
};
