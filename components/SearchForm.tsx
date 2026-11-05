import Form from "next/form";
import Link from "next/link";
import BasicFields from "@/components/BasicFields";
import BudgetPicker from "@/components/BudgetPicker";
import ConditionToggle from "@/components/ConditionToggle";
import { DEFAULT_SORT, type Preferences, type SortKey } from "@/lib/match";
import { parsePreferences } from "@/lib/params";

/** The Quick Search form, with the route to Advanced Search underneath. */
export default function SearchForm({
  initial = parsePreferences({}),
  sort = DEFAULT_SORT,
}: {
  initial?: Preferences;
  sort?: SortKey;
}) {
  return (
    <>
      <Form action="/" className="search-form">
        <ConditionToggle initial={initial.conditions} />
        <BudgetPicker initial={initial.budget} />
        {sort !== DEFAULT_SORT && <input type="hidden" name="sort" value={sort} />}
        <BasicFields initial={initial} />
        <button type="submit" className="button button-primary button-lg">
          Find my matches
        </button>
      </Form>
      <Link href="/advanced" className="button button-outline advanced-link">
        Want more control? Try Advanced Search →
      </Link>
    </>
  );
}
