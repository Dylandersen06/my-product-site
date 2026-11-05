import Form from "next/form";
import BudgetPicker from "@/components/BudgetPicker";
import ConditionToggle from "@/components/ConditionToggle";
import { DEFAULT_RANGE, findRange } from "@/lib/budget";
import { BODY_LABELS, FEATURE_LABELS, FUEL_LABELS, USAGE_LABELS, type Feature } from "@/lib/cars";
import { DEFAULT_SORT, type Preferences, type SortKey } from "@/lib/match";
import { DEFAULT_CONDITIONS } from "@/lib/pricing";

const defaultRange = findRange(DEFAULT_RANGE)!;

const DEFAULTS: Preferences = {
  conditions: DEFAULT_CONDITIONS,
  budget: { min: defaultRange.min, max: defaultRange.max, range: defaultRange.key },
  seats: 5,
  fuel: "any",
  body: "any",
  usage: "commute",
  features: [],
};

export default function SearchForm({
  initial = DEFAULTS,
  sort = DEFAULT_SORT,
}: {
  initial?: Preferences;
  sort?: SortKey;
}) {
  return (
    <Form action="/results" className="search-form">
      <ConditionToggle initial={initial.conditions} />
      <BudgetPicker initial={initial.budget} />
      {sort !== DEFAULT_SORT && <input type="hidden" name="sort" value={sort} />}

      <div className="form-grid">
        <label className="field">
          <span className="field-label">Seats needed</span>
          <select name="seats" defaultValue={String(initial.seats)}>
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

        <label className="field field-wide">
          <span className="field-label">How will you mostly use it?</span>
          <select name="usage" defaultValue={initial.usage}>
            {Object.entries(USAGE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="features-fieldset">
        <legend className="field-label">Must-have features</legend>
        <div className="checkbox-grid">
          {(Object.entries(FEATURE_LABELS) as [Feature, string][]).map(([value, label]) => (
            <label key={value} className="checkbox">
              <input
                type="checkbox"
                name="features"
                value={value}
                defaultChecked={initial.features.includes(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="button button-primary button-lg">
        Find my matches
      </button>
    </Form>
  );
}
