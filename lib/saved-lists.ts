// The two lists a shopper can save cars to. No server code here, so browser
// components can use the labels.

export const SAVED_LISTS = {
  favorite: { label: "Favorite", heading: "Favorites", icon: "♥", empty: "♡" },
  interested: { label: "Interested", heading: "Interested in", icon: "★", empty: "☆" },
} as const;

export type SavedList = keyof typeof SAVED_LISTS;

export type SavedState = Record<SavedList, boolean>;

export const NOT_SAVED: SavedState = { favorite: false, interested: false };

export const isSavedList = (value: unknown): value is SavedList =>
  typeof value === "string" && Object.prototype.hasOwnProperty.call(SAVED_LISTS, value);

/** Most cars a shopper can keep on one list. */
export const MAX_SAVED_PER_LIST = 100;
