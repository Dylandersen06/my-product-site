"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CARS } from "./cars";
import { CONDITIONS } from "./pricing";
import { listSavedCars, setSavedCar } from "./saved-cars";
import { MAX_SAVED_PER_LIST, isSavedList } from "./saved-lists";

export type SaveResult = { ok: true } | { ok: false; error: string };

/**
 * Puts a car on, or takes it off, one of the signed-in shopper's lists.
 * Server actions can be called directly over HTTP, so every input is checked
 * here: the shopper must be signed in, and the car, trim, condition and list
 * must all be real.
 */
export async function saveCar(
  carId: string,
  list: string,
  saved: boolean,
  trim: string | null,
  condition: string | null,
): Promise<SaveResult> {
  const { userId } = await auth();
  if (!userId) return { ok: false, error: "Log in to save cars." };

  const car = CARS.find((c) => c.id === carId);
  if (!car || !isSavedList(list) || typeof saved !== "boolean") return { ok: false, error: "That car can't be saved." };
  const trimName = car.trims.some((t) => t.name === trim) ? trim : null;
  const conditionKey = CONDITIONS.find((c) => c === condition) ?? null;

  try {
    if (saved) {
      const onList = (await listSavedCars(userId)).filter((r) => r.list === list && r.carId !== carId);
      if (onList.length >= MAX_SAVED_PER_LIST) {
        return { ok: false, error: `You can save up to ${MAX_SAVED_PER_LIST} cars per list. Remove one first.` };
      }
    }
    await setSavedCar(userId, car.id, list, saved, trimName, conditionKey);
  } catch (error) {
    console.error("saving car failed", error instanceof Error ? error.message : error);
    return { ok: false, error: "Couldn't save that right now. Please try again." };
  }

  revalidatePath("/account");
  return { ok: true };
}
