// Links that help a shopper find a recommended car near them. The site has no
// dealer or inventory data, so these open searches on Google Maps and Google,
// which show real, current dealers and listings for the shopper's location.

import type { Condition } from "./pricing";

/** Brands that sell new cars directly, from their own stores and websites, rather than through dealers. */
const DIRECT_SALES = new Set(["Tesla", "Rivian", "Lucid"]);

const CONDITION_WORDS: Record<Condition, string> = {
  new: "new",
  cpo: "certified pre-owned",
  used: "used",
};

export interface BuyLink {
  label: string;
  href: string;
}

export interface WhereToBuy {
  links: BuyLink[];
  /** A short tip about where this car in this condition is sold. */
  note: string;
}

const mapsSearch = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const webSearch = (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`;

/** Searches for dealers and listings for a car near `location` (a ZIP code or city). */
export function whereToBuy(make: string, model: string, condition: Condition, location: string): WhereToBuy {
  const near = location.trim();
  const direct = DIRECT_SALES.has(make);
  const place = direct ? `${make} store` : `${make} dealership`;
  const links: BuyLink[] = [
    { label: `${direct ? `${make} stores` : `${make} dealers`} near ${near}`, href: mapsSearch(`${place} near ${near}`) },
    {
      label: `${CONDITION_WORDS[condition][0].toUpperCase()}${CONDITION_WORDS[condition].slice(1)} ${model} listings near ${near}`,
      href: webSearch(`${CONDITION_WORDS[condition]} ${make} ${model} for sale near ${near}`),
    },
  ];

  let note: string;
  if (direct && condition === "new") {
    note = `${make} sells new cars directly, online or at its own stores, so there's no dealer to haggle with. Order on ${make}'s website or visit a store.`;
  } else if (direct && condition === "cpo") {
    note = `${make} sells its own certified pre-owned cars, online or at its stores, with an extended warranty.`;
  } else if (condition === "cpo") {
    note = `Certified pre-owned cars are sold only by official ${make} dealers, which back them with an extended warranty. Contact two or three and compare out-the-door prices.`;
  } else if (condition === "new") {
    note = `New ${make} cars are sold by franchised ${make} dealers. Ask two or three nearby for an out-the-door price, including taxes and fees, and compare.`;
  } else {
    note = `Used ${make} cars are sold by ${direct ? "used-car dealers" : `${make} dealers, used-car dealers`} and private sellers. Ask for a vehicle history report and a pre-purchase inspection.`;
  }
  return { links, note };
}
