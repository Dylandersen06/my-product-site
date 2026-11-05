import { BODY_LABELS, FUEL_LABELS, USAGE_LABELS } from "@/lib/cars";
import type { Preferences } from "@/lib/match";

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

      <label className="field">
        <span className="field-label">Body style</span>
        <select name="body" defaultValue={initial.body}>
          <option value="any">No preference</option>
          {Object.entries(BODY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className={advanced ? "field" : "field field-wide"}>
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
