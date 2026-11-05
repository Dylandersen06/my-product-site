"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export const COMPARE_LIMIT = 3;

export interface CompareItem {
  id: string;
  name: string;
  photoUrl: string | null;
  /** Display rows for the table, by row label. */
  rows: Record<string, string>;
  /** Numbers used to mark the best value in a row. */
  numbers: Record<string, { value: number; better: "high" | "low" }>;
}

interface CompareState {
  selected: string[];
  toggle: (id: string) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareState | null>(null);

function useCompare() {
  const state = useContext(CompareContext);
  if (!state) throw new Error("Compare components need a CompareProvider");
  return state;
}

/** Holds the cars picked for comparison, and renders the bar and table. */
export function CompareProvider({ items, children }: { items: CompareItem[]; children: ReactNode }) {
  const [picked, setPicked] = useState<string[]>([]);
  // A new search can remove a picked car from the results.
  const selected = useMemo(() => picked.filter((id) => items.some((item) => item.id === id)), [picked, items]);

  const state = useMemo<CompareState>(
    () => ({
      selected,
      toggle: (id) =>
        setPicked((current) => {
          const live = current.filter((x) => items.some((item) => item.id === x));
          if (live.includes(id)) return live.filter((x) => x !== id);
          return live.length < COMPARE_LIMIT ? [...live, id] : live;
        }),
      clear: () => setPicked([]),
    }),
    [selected, items],
  );

  return (
    <CompareContext.Provider value={state}>
      {children}
      <CompareBar items={items} />
    </CompareContext.Provider>
  );
}

export function CompareCheckbox({ id, name }: { id: string; name: string }) {
  const { selected, toggle } = useCompare();
  const checked = selected.includes(id);
  const full = !checked && selected.length >= COMPARE_LIMIT;
  return (
    <label className={`compare-check${checked ? " checked" : ""}${full ? " full" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={full}
        onChange={() => toggle(id)}
        aria-label={`Compare ${name}`}
      />
      <span>{full ? `Compare (${COMPARE_LIMIT} max)` : "Compare"}</span>
    </label>
  );
}

function CompareBar({ items }: { items: CompareItem[] }) {
  const { selected, toggle, clear } = useCompare();
  const dialog = useRef<HTMLDialogElement>(null);
  const chosen = selected.flatMap((id) => items.find((item) => item.id === id) ?? []);

  useEffect(() => {
    if (chosen.length < 2 && dialog.current?.open) dialog.current.close();
  }, [chosen.length]);

  if (chosen.length === 0) return null;

  const labels = Object.keys(chosen[0].rows);
  const isBest = (item: CompareItem, label: string) => {
    const mine = item.numbers[label];
    if (!mine) return false;
    const values = chosen.flatMap((x) => x.numbers[label]?.value ?? []);
    if (new Set(values).size < 2) return false;
    return mine.value === (mine.better === "high" ? Math.max(...values) : Math.min(...values));
  };

  return (
    <>
      <div className="compare-spacer" aria-hidden="true" />
      <div className="compare-bar" role="region" aria-label="Cars selected to compare">
        <div className="compare-bar-inner">
          <span className="compare-bar-count">
            {chosen.length} of {COMPARE_LIMIT} selected
          </span>
          <button type="button" className="compare-clear" onClick={clear}>
            Clear
          </button>
          <button
            type="button"
            className="button button-primary"
            disabled={chosen.length < 2}
            onClick={() => dialog.current?.showModal()}
          >
            {chosen.length < 2 ? "Pick one more" : `Compare ${chosen.length} cars`}
          </button>
        </div>
      </div>

      <dialog ref={dialog} className="compare-dialog" aria-labelledby="compare-title">
        <div className="compare-dialog-head">
          <h2 id="compare-title">Side-by-side comparison</h2>
          <button type="button" className="button button-outline" onClick={() => dialog.current?.close()}>
            Close
          </button>
        </div>
        <p className="field-hint compare-note">
          The best value in each row is in bold green. Used and CPO prices are estimates, so check local listings.
        </p>
        <div className="compare-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <td />
                {chosen.map((item) => (
                  <th key={item.id} scope="col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {item.photoUrl && <img src={item.photoUrl} alt="" loading="lazy" />}
                    <span>{item.name}</span>
                    <button type="button" className="compare-remove" onClick={() => toggle(item.id)}>
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map((label) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {chosen.map((item) => (
                    <td key={item.id} className={isBest(item, label) ? "best" : undefined}>
                      {item.rows[label]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dialog>
    </>
  );
}
