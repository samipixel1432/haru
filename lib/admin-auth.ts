const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "antonela";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "antonela123";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "haru-boutique-admin-secret";

export const ADMIN_SESSION_COOKIE = "haru_admin_session";

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function getSessionToken(): Promise<string> {
  const data = new TextEncoder().encode(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${SESSION_SECRET}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
