import "server-only";
import { auth } from "@clerk/nextjs/server";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { db } from "./users-db";
import type { SavedList, SavedState } from "./saved-lists";

// Cars a signed-in shopper saves to their account, in a `saved_cars` table in
// the same Neon database as `users`. Each car can be on either list or both.
// The trim and condition they were looking at are kept, so the account page
// can link straight back to that view.

export interface SavedCar {
  carId: string;
  list: SavedList;
  trim: string | null;
  condition: string | null;
  savedAt: string;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(q: NeonQueryFunction<false, false>): Promise<void> {
  schemaReady ??= q`
    CREATE TABLE IF NOT EXISTS saved_cars (
      user_id    text NOT NULL,
      car_id     text NOT NULL,
      list       text NOT NULL CHECK (list IN ('favorite', 'interested')),
      trim       text,
      condition  text,
      created_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, car_id, list)
    )`.then(
    () => undefined,
    (error) => {
      schemaReady = null; // try again next time
      throw error;
    },
  );
  return schemaReady;
}

/** True when saved cars can be stored (a database is configured). */
export const savedCarsAvailable = () => db() !== null;

export interface ViewerSaved {
  signedIn: boolean;
  /** Which lists each car is on, for a signed-in viewer. */
  states: Record<string, SavedState>;
}

/**
 * The current visitor's saved cars, for drawing save buttons on a page. Null
 * when saving isn't available, so pages leave the buttons out entirely.
 */
export async function viewerSaved(): Promise<ViewerSaved | null> {
  if (!savedCarsAvailable()) return null;
  const { userId } = await auth();
  return userId ? { signedIn: true, states: await savedStates(userId) } : { signedIn: false, states: {} };
}

/** Everything this user has saved, newest first. Empty if the database is unavailable. */
export async function listSavedCars(userId: string): Promise<SavedCar[]> {
  const q = db();
  if (!q) return [];
  try {
    await ensureSchema(q);
    const rows = await q`
      SELECT car_id, list, trim, condition, created_at
      FROM saved_cars WHERE user_id = ${userId}
      ORDER BY created_at DESC`;
    return rows.map((r) => ({
      carId: r.car_id,
      list: r.list,
      trim: r.trim,
      condition: r.condition,
      savedAt: new Date(r.created_at).toISOString(),
    }));
  } catch (error) {
    console.error("saved cars read failed", error instanceof Error ? error.message : error);
    return [];
  }
}

/** Which lists each car is on, for drawing the save buttons. */
export async function savedStates(userId: string): Promise<Record<string, SavedState>> {
  const states: Record<string, SavedState> = {};
  for (const row of await listSavedCars(userId)) {
    states[row.carId] ??= { favorite: false, interested: false };
    states[row.carId][row.list] = true;
  }
  return states;
}

/** Adds or removes one car on one list. Throws on a database error so the button can roll back. */
export async function setSavedCar(
  userId: string,
  carId: string,
  list: SavedList,
  saved: boolean,
  trim: string | null,
  condition: string | null,
): Promise<void> {
  const q = db();
  if (!q) throw new Error("Saved cars aren't available right now.");
  await ensureSchema(q);
  if (saved) {
    await q`
      INSERT INTO saved_cars (user_id, car_id, list, trim, condition)
      VALUES (${userId}, ${carId}, ${list}, ${trim}, ${condition})
      ON CONFLICT (user_id, car_id, list) DO UPDATE SET trim = EXCLUDED.trim, condition = EXCLUDED.condition`;
  } else {
    await q`DELETE FROM saved_cars WHERE user_id = ${userId} AND car_id = ${carId} AND list = ${list}`;
  }
}
