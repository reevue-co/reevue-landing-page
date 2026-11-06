import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "reevue_analytics";
const sessionLabel = "reevue-analytics-session";

function expectedPassword() {
  return process.env.ANALYTICS_PASSWORD ?? "";
}

function sessionToken(password: string) {
  return createHmac("sha256", password).update(sessionLabel).digest("base64url");
}

export function passwordsMatch(input: string) {
  const expected = expectedPassword();
  if (!expected) return false;
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function hasAnalyticsSession() {
  const password = expectedPassword();
  const current = (await cookies()).get(cookieName)?.value;
  if (!password || !current) return false;
  const expected = sessionToken(password);
  const left = Buffer.from(current);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function openAnalyticsSession() {
  const password = expectedPassword();
  if (!password) return;
  (await cookies()).set(cookieName, sessionToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAnalyticsSession() {
  (await cookies()).delete(cookieName);
}
