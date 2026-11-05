"use client";

import { useState } from "react";
import {
  BUDGET_INPUT_MAX,
  BUDGET_INPUT_MIN,
  BUDGET_RANGES,
  DEFAULT_RANGE,
  type Budget,
  type BudgetRangeKey,
} from "@/lib/budget";

/**
 * Preset price ranges plus an optional exact max budget. Picking a preset
 * clears the exact field and typing an exact amount deselects the preset.
 * Without JavaScript both are submitted, and the server gives the exact
 * amount priority.
 */
export default function BudgetPicker({ initial }: { initial: Budget }) {
  const [range, setRange] = useState<BudgetRangeKey | null>(initial.range);
  const [lastRange, setLastRange] = useState<BudgetRangeKey>(initial.range ?? DEFAULT_RANGE);
  const [exact, setExact] = useState(initial.range === null ? String(initial.max) : "");

  return (
    <fieldset className="features-fieldset">
      <legend className="field-label">Budget</legend>
      <div className="checkbox-grid budget-grid">
        {BUDGET_RANGES.map((r) => (
          <label key={r.key} className="checkbox">
            <input
              type="radio"
              name="range"
              value={r.key}
              checked={range === r.key}
              onChange={() => {
                setRange(r.key);
                setLastRange(r.key);
                setExact("");
              }}
            />
            <span>{r.label}</span>
          </label>
        ))}
      </div>
      <label className="field budget-exact">
        <span className="field-hint">Or enter an exact max budget (up to $1,000,000)</span>
        <input
          type="number"
          name="budget"
          inputMode="numeric"
          min={BUDGET_INPUT_MIN}
          max={BUDGET_INPUT_MAX}
          step={500}
          placeholder="e.g. 45000"
          value={exact}
          onChange={(e) => {
            const value = e.target.value;
            setExact(value);
            setRange(value ? null : lastRange);
          }}
        />
      </label>
    </fieldset>
  );
}
