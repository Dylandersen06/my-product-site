"use client";

import { useState } from "react";
import { HP_PICKS } from "@/lib/filters";

/** Min and max horsepower, with quick picks that fill both in. */
export default function HorsepowerPicker({ min, max }: { min: number | null; max: number | null }) {
  const [hpMin, setHpMin] = useState(min === null ? "" : String(min));
  const [hpMax, setHpMax] = useState(max === null ? "" : String(max));

  return (
    <div className="hp-picker">
      <span className="field-label" id="hp-label">
        Horsepower
      </span>
      <div className="quick-picks" role="group" aria-labelledby="hp-label">
        {HP_PICKS.map((pick) => (
          <button
            key={pick.label}
            type="button"
            className={`quick-pick${pick.min === hpMin && pick.max === hpMax ? " active" : ""}`}
            aria-pressed={pick.min === hpMin && pick.max === hpMax}
            onClick={() => {
              setHpMin(pick.min);
              setHpMax(pick.max);
            }}
          >
            {pick.label}
          </button>
        ))}
      </div>
      <div className="form-grid">
        <label className="field">
          <span className="field-hint">Minimum hp</span>
          <input
            type="number"
            name="hpMin"
            inputMode="numeric"
            min={0}
            step={10}
            placeholder="Any"
            value={hpMin}
            onChange={(e) => setHpMin(e.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-hint">Maximum hp</span>
          <input
            type="number"
            name="hpMax"
            inputMode="numeric"
            min={0}
            step={10}
            placeholder="Any"
            value={hpMax}
            onChange={(e) => setHpMax(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
