import BodyIcon from "@/components/BodyIcon";
import { BODY_LABELS, FUEL_LABELS, USAGE_LABELS, type BodyStyle } from "@/lib/cars";
import type { Preferences } from "@/lib/match";

const BODY_OPTIONS: ["any" | BodyStyle, string][] = [
  ["any", "No preference"],
  ...(Object.entries(BODY_LABELS) as [BodyStyle, string][]),
];

/** Seats, fuel, body style and use, shared by both search forms. */
export default function BasicFields({ initial, advanced = false }: { initial: Preferences; advanced?: boolean }) {
  return (
    <div className="form-grid">
      <label className="field">
        <span className="field-label">Seats needed</span>
        <select name="seats" defaultValue={String(initial.seats)}>
          {advanced && <option value="1">Any</option>}
          {[2, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n === 8 ? "8" : `${n}+`}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">Fuel type</span>
        <select name="fuel" defaultValue={initial.fuel}>
          <option value="any">No preference</option>
          {Object.entries(FUEL_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="body-picker field-wide">
        <legend className="field-label">Body style</legend>
        <div className="body-options">
          {BODY_OPTIONS.map(([value, label]) => (
            <label key={value} className="body-option">
              <input type="radio" name="body" value={value} defaultChecked={initial.body === value} />
              <BodyIcon body={value} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field field-wide">
        <span className="field-label">How will you mostly use it?</span>
        <select name="usage" defaultValue={initial.usage}>
          {advanced && <option value="any">No preference</option>}
          {Object.entries(USAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
