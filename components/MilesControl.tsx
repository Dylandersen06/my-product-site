import Form from "next/form";
import type { RawParams } from "@/lib/loosen";
import { MAX_MILES_PER_YEAR, MIN_MILES_PER_YEAR } from "@/lib/ownership";

/** Edits the miles per year behind every cost estimate, keeping the rest of the search. */
export default function MilesControl({ params, basePath, miles }: { params: RawParams; basePath: string; miles: number }) {
  const hidden = Object.entries(params).flatMap(([key, value]) =>
    key === "miles" || value === undefined ? [] : (Array.isArray(value) ? value : [value]).filter(Boolean).map((v) => [key, v]),
  );
  return (
    <Form action={basePath} scroll={false} className="miles-control" key={miles}>
      {hidden.map(([key, value]) => (
        <input key={`${key}-${value}`} type="hidden" name={key} value={value} />
      ))}
      <label htmlFor="miles-input">Miles per year</label>
      <input
        id="miles-input"
        type="number"
        name="miles"
        inputMode="numeric"
        min={MIN_MILES_PER_YEAR}
        max={MAX_MILES_PER_YEAR}
        step={500}
        defaultValue={miles}
      />
      <button type="submit" className="button button-outline">
        Update costs
      </button>
    </Form>
  );
}
