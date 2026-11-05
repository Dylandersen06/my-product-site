import type { ReactNode } from "react";
import Form from "next/form";
import BasicFields from "@/components/BasicFields";
import BudgetPicker from "@/components/BudgetPicker";
import ConditionToggle from "@/components/ConditionToggle";
import HorsepowerPicker from "@/components/HorsepowerPicker";
import { BRANDS, FEATURE_LABELS, type Feature } from "@/lib/cars";
import {
  CARGO_OPTIONS,
  DRIVETRAIN_LABELS,
  EV_RANGE_OPTIONS,
  MPG_OPTIONS,
  TOWING_OPTIONS,
  TRANSMISSION_LABELS,
  ZERO60_OPTIONS,
  type Filters,
} from "@/lib/filters";
import { DEFAULT_SORT, type Preferences, type SortKey } from "@/lib/match";
import { DEFAULT_MILES_PER_YEAR } from "@/lib/ownership";

/** AWD and towing have their own filters here, so they aren't repeated as checkboxes. */
const FEATURE_CHECKBOXES: Feature[] = [
  "carplay",
  "adaptiveCruise",
  "heatedSeats",
  "sunroof",
  "thirdRow",
  "camera360",
  "blindSpot",
];

function NumberSelect({
  name,
  label,
  value,
  options,
  format,
}: {
  name: string;
  label: string;
  value: number | null;
  options: number[];
  format: (n: number) => string;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <select name={name} defaultValue={value === null ? "" : String(value)}>
        <option value="">Any</option>
        {value !== null && !options.includes(value) && <option value={value}>{format(value)}</option>}
        {options.map((n) => (
          <option key={n} value={n}>
            {format(n)}
          </option>
        ))}
      </select>
    </label>
  );
}

/** A filter group that starts closed unless one of its filters is set. Its summary says what's inside. */
function FilterGroup({
  title,
  hint,
  count,
  children,
}: {
  title: string;
  hint: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <details className="filter-group" open={count > 0}>
      <summary>
        <span className="filter-group-title">
          {title}
          {count > 0 && <span className="brand-count">{count} set</span>}
        </span>
        <span className="field-hint">{hint}</span>
      </summary>
      <fieldset className="filter-group-body">
        <legend className="sr-only">{title}</legend>
        {children}
      </fieldset>
    </details>
  );
}

function BrandGroup({ title, name, selected }: { title: string; name: string; selected: string[] }) {
  return (
    <details className="brand-group" open={selected.length > 0}>
      <summary>
        {title}
        {selected.length > 0 && <span className="brand-count">{selected.length} selected</span>}
      </summary>
      <div className="checkbox-grid brand-grid">
        {BRANDS.map((brand) => (
          <label key={brand} className="checkbox">
            <input type="checkbox" name={name} value={brand} defaultChecked={selected.includes(brand)} />
            <span>{brand}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

export default function AdvancedForm({
  initial,
  filters,
  sort = DEFAULT_SORT,
}: {
  initial: Preferences;
  filters: Filters;
  sort?: SortKey;
}) {
  const practicalitySet = [filters.mpgMin, filters.rangeMin, filters.towMin, filters.cargoMin].filter(
    (value) => value !== null,
  ).length;

  return (
    <Form action="/advanced" className="search-form" autoComplete="off">
      {sort !== DEFAULT_SORT && <input type="hidden" name="sort" value={sort} />}
      {initial.milesPerYear !== DEFAULT_MILES_PER_YEAR && (
        <input type="hidden" name="miles" value={initial.milesPerYear} />
      )}

      <fieldset className="filter-section">
        <legend>Basics</legend>
        <ConditionToggle initial={initial.conditions} />
        <BudgetPicker initial={initial.budget} allowAny />
        <BasicFields initial={initial} advanced />
      </fieldset>

      <fieldset className="filter-section">
        <legend>Performance</legend>
        <HorsepowerPicker min={filters.hpMin} max={filters.hpMax} />
        <div className="form-grid">
          <NumberSelect
            name="zero60Max"
            label="0–60 mph time"
            value={filters.zero60Max}
            options={ZERO60_OPTIONS}
            format={(n) => `Under ${n} seconds`}
          />
          <label className="field">
            <span className="field-label">Drivetrain</span>
            <select name="drivetrain" defaultValue={filters.drivetrain ?? ""}>
              <option value="">Any</option>
              {Object.entries(DRIVETRAIN_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="field field-wide">
            <span className="field-label">Transmission</span>
            <select name="transmission" defaultValue={filters.transmission ?? ""}>
              <option value="">Any</option>
              {Object.entries(TRANSMISSION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <FilterGroup title="Practicality" hint="MPG, EV range, towing and cargo" count={practicalitySet}>
        <div className="form-grid">
          <NumberSelect
            name="mpgMin"
            label="Minimum MPG"
            value={filters.mpgMin}
            options={MPG_OPTIONS}
            format={(n) => `${n}+ mpg`}
          />
          <NumberSelect
            name="rangeMin"
            label="Minimum EV range"
            value={filters.rangeMin}
            options={EV_RANGE_OPTIONS}
            format={(n) => `${n}+ miles`}
          />
          <p className="field-hint field-wide">
            If you set both, a car qualifies by meeting either one. Setting only MPG leaves out pure EVs.
          </p>
          <NumberSelect
            name="towMin"
            label="Towing capacity"
            value={filters.towMin}
            options={TOWING_OPTIONS}
            format={(n) => `${n.toLocaleString("en-US")}+ lb`}
          />
          <NumberSelect
            name="cargoMin"
            label="Cargo space"
            value={filters.cargoMin}
            options={CARGO_OPTIONS}
            format={(n) => `${n}+ cu ft`}
          />
          <p className="field-hint field-wide">Cargo is space behind the rearmost seats, or bed volume for pickups.</p>
        </div>
      </FilterGroup>

      <FilterGroup
        title="Brands"
        hint="Only show some brands, or exclude them"
        count={filters.makes.length + filters.excludeMakes.length}
      >
        <BrandGroup title="Only show these brands" name="make" selected={filters.makes} />
        <BrandGroup title="Exclude these brands" name="excludeMake" selected={filters.excludeMakes} />
      </FilterGroup>

      <FilterGroup title="Features" hint="Your must-haves: CarPlay, heated seats, third row and more" count={initial.features.length}>
        <p className="field-hint">The recommended trim must have every feature you check.</p>
        <div className="checkbox-grid">
          {FEATURE_CHECKBOXES.map((value) => (
            <label key={value} className="checkbox">
              <input
                type="checkbox"
                name="features"
                value={value}
                defaultChecked={initial.features.includes(value)}
              />
              <span>{FEATURE_LABELS[value]}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <div className="form-actions">
        <button type="submit" className="button button-primary button-lg">
          Show matches
        </button>
        {/* A full page load, so every field really returns to its default. */}
        <a href="/advanced" className="button button-outline button-lg">
          Reset filters
        </a>
      </div>
    </Form>
  );
}
