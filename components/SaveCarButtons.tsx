"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { saveCar } from "@/lib/saved-car-actions";
import { NOT_SAVED, SAVED_LISTS, type SavedList, type SavedState } from "@/lib/saved-lists";

/**
 * "Favorite" and "Interested" toggles for one car. They flip at once and roll
 * back if saving fails. Visitors who aren't logged in get a link to log in
 * that brings them back to the same page.
 */
export default function SaveCarButtons({
  carId,
  carName,
  trim,
  condition,
  initial = NOT_SAVED,
  signedIn,
  returnTo,
}: {
  carId: string;
  carName: string;
  trim: string;
  condition: string;
  initial?: SavedState;
  signedIn: boolean;
  /** The page to come back to after logging in. */
  returnTo: string;
}) {
  const [state, setState] = useState<SavedState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!signedIn) {
    return (
      <Link href={`/sign-in?redirect_url=${encodeURIComponent(returnTo)}`} className="button button-outline save-login">
        <span aria-hidden="true">{SAVED_LISTS.favorite.empty}</span> Log in to save
      </Link>
    );
  }

  const toggle = (list: SavedList) => {
    const next = !state[list];
    setError(null);
    setState((s) => ({ ...s, [list]: next }));
    startTransition(async () => {
      const result = await saveCar(carId, list, next, trim, condition);
      if (!result.ok) {
        setState((s) => ({ ...s, [list]: !next }));
        setError(result.error);
      }
    });
  };

  return (
    <div className="save-buttons">
      {(Object.keys(SAVED_LISTS) as SavedList[]).map((list) => {
        const info = SAVED_LISTS[list];
        const on = state[list];
        return (
          <button
            key={list}
            type="button"
            className={`button button-outline save-toggle${on ? " save-on" : ""}`}
            aria-pressed={on}
            aria-label={`${on ? "Remove" : "Add"} ${carName} ${on ? "from" : "to"} ${info.heading}`}
            onClick={() => toggle(list)}
            disabled={pending}
          >
            <span aria-hidden="true">{on ? info.icon : info.empty}</span> {info.label}
          </button>
        );
      })}
      {error && (
        <p className="save-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
