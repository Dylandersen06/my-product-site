import { redirect } from "next/navigation";
import { hrefWith, type RawParams } from "@/lib/loosen";

/** Results now live on the Quick Search page. This keeps old links working. */
export default async function ResultsRedirect({ searchParams }: { searchParams: Promise<RawParams> }) {
  redirect(hrefWith("/", await searchParams));
}
