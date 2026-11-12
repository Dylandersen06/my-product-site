import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { User } from "@clerk/nextjs/server";
import { accessFrom } from "./plan";

// Every CarMatch account is copied into a `users` table in Neon Postgres.
// Clerk handles sign-up and log-in; this table is our own record of who has
// an account and what plan they're on. It's written whenever a signed-in user
// loads a page, logs in, or pays, so new accounts appear right away.

let sql: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

/** The Neon connection, or null when no database is configured (e.g. local dev). */
export function db(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) return null;
  sql ??= neon(url);
  return sql;
}

function ensureSchema(q: NeonQueryFunction<false, false>): Promise<void> {
  schemaReady ??= q`
    CREATE TABLE IF NOT EXISTS users (
      id              text PRIMARY KEY,
      email           text NOT NULL,
      first_name      text,
      last_name       text,
      plan            text NOT NULL DEFAULT 'free',
      pass_until      timestamptz,
      created_at      timestamptz NOT NULL,
      last_sign_in_at timestamptz,
      updated_at      timestamptz NOT NULL DEFAULT now()
    )`.then(
    () => undefined,
    (error) => {
      schemaReady = null; // try again next time
      throw error;
    },
  );
  return schemaReady;
}

const toDate = (ms: number | null) => (ms ? new Date(ms).toISOString() : null);

/** Inserts or updates the user's row. Never throws: a database hiccup mustn't break a page. */
export async function syncUser(user: User): Promise<void> {
  const q = db();
  if (!q) return;
  try {
    await ensureSchema(q);
    const access = accessFrom(user.publicMetadata);
    const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? "";
    await q`
      INSERT INTO users (id, email, first_name, last_name, plan, pass_until, created_at, last_sign_in_at, updated_at)
      VALUES (${user.id}, ${email}, ${user.firstName}, ${user.lastName}, ${access.plan ?? "free"},
              ${access.passUntil?.toISOString() ?? null}, ${toDate(user.createdAt)}, ${toDate(user.lastSignInAt)}, now())
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        plan = EXCLUDED.plan,
        pass_until = EXCLUDED.pass_until,
        last_sign_in_at = EXCLUDED.last_sign_in_at,
        updated_at = now()`;
  } catch (error) {
    console.error("user sync failed", error instanceof Error ? error.message : error);
  }
}

// Each server instance syncs a given user at most once every few minutes.
const recentlySynced = new Map<string, number>();
const RESYNC_MS = 5 * 60 * 1000;

export function syncedRecently(userId: string, now = Date.now()): boolean {
  const last = recentlySynced.get(userId);
  if (last && now - last < RESYNC_MS) return true;
  recentlySynced.set(userId, now);
  if (recentlySynced.size > 5000) recentlySynced.clear();
  return false;
}
