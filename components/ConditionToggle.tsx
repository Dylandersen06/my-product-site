"use client";

import { useState } from "react";
import { CONDITIONS, CONDITION_LABELS, type Condition } from "@/lib/pricing";

/**
 * Multi-select toggle for Used, Certified Pre-Owned and New. The last selected
 * button can't be turned off, so a search always has a condition. Without
 * JavaScript the server falls back to New if nothing is checked.
 */
export default function ConditionToggle({ initial }: { initial: Condition[] }) {
  const [selected, setSelected] = useState<Condition[]>(initial);

  function toggle(condition: Condition, checked: boolean) {
    if (checked) setSelected((current) => [...current, condition]);
    else if (selected.length > 1) setSelected((current) => current.filter((c) => c !== condition));
  }

  return (
    <fieldset className="condition-toggle">
      <legend className="field-label">Condition</legend>
      <span className="field-hint">Pick one or more.</span>
      <div className="condition-options">
        {CONDITIONS.map((condition) => (
          <label key={condition} className="condition-option">
            <input
              type="checkbox"
              name="condition"
              value={condition}
              checked={selected.includes(condition)}
              onChange={(e) => toggle(condition, e.target.checked)}
            />
            <span>{CONDITION_LABELS[condition]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
