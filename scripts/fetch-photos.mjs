// Finds a freely licensed Wikimedia Commons photo for every car and writes
// lib/photos.json. Run with: node scripts/fetch-photos.mjs
//
// The starting point is the lead image of the model's Wikipedia article. A file
// is only accepted if it lives on Commons and its machine-readable license is
// CC0, public domain, CC BY or CC BY-SA. Author and license come from the
// Commons API, never from guesses. Cars with no acceptable image are left out,
// and the site shows a placeholder for them. FILE_OVERRIDES names a specific
// Commons file where the lead image isn't a clear exterior shot of that model.

import { readFileSync, writeFileSync } from "node:fs";

const USER_AGENT = "CarMatchAI-photo-fetch/1.0 (https://github.com/Dylandersen06/my-product-site)";
const WIDTH = 960;

/** Wikipedia article for models whose title isn't simply "Make Model". */
const ARTICLES = {
  "mazda-mazda3-hatchback": "Mazda3",
  "toyota-rav4-hybrid": "Toyota RAV4",
  "toyota-rav4-plug-in-hybrid": "Toyota RAV4",
  "chrysler-pacifica": "Chrysler Pacifica (minivan)",
  "chrysler-pacifica-plug-in-hybrid": "Chrysler Pacifica (minivan)",
  "mazda-mx-5-miata": "Mazda MX-5",
  "mitsubishi-outlander-phev": "Mitsubishi Outlander",
  "ram-1500": "Ram pickup",
  "ram-2500": "Ram pickup",
  "gmc-sierra-1500": "GMC Sierra",
  "chevrolet-silverado-1500": "Chevrolet Silverado",
  "land-rover-defender-110": "Land Rover Defender",
  "land-rover-range-rover-sport": "Range Rover Sport",
  "land-rover-range-rover": "Range Rover",
  "audi-s-e-tron-gt": "Audi e-tron GT",
  "porsche-911-carrera": "Porsche 911",
  "porsche-macan-electric": "Porsche Macan",
  "lamborghini-urus-se": "Lamborghini Urus",
  "jeep-gladiator": "Jeep Gladiator (JT)",
  "aston-martin-vantage": "Aston Martin Vantage (2018)",
  "aston-martin-dbx707": "Aston Martin DBX",
  "ford-f-150": "Ford F-Series",
  "toyota-corolla-hatchback": "Toyota Corolla (E210)",
  "mazda-mazda3-sedan": "Mazda3",
};

/** Specific Commons files chosen by hand after reviewing the results. */
const FILE_OVERRIDES = JSON.parse(readFileSync(new URL("./photo-overrides.json", import.meta.url), "utf8"));

const FREE_LICENSE = /^(cc0|cc[- ]by(-sa)?([- ]\d(\.\d)?)?|public domain|pd\b)/i;
const NOT_FREE = /\b(nc|nd|non-?commercial|no-?deriv|fair use)\b/i;

async function api(host, params) {
  const url = `https://${host}/w/api.php?${new URLSearchParams({ format: "json", formatversion: "2", ...params })}`;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    if (res.ok) return res.json();
    if (attempt >= 4) throw new Error(`${res.status} from ${url}`);
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
  }
}

const stripHtml = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

async function leadImage(title) {
  const data = await api("en.wikipedia.org", {
    action: "query",
    prop: "pageimages",
    piprop: "name",
    redirects: "1",
    titles: title,
  });
  return data.query?.pages?.[0]?.pageimage ?? null;
}

async function commonsPhoto(file) {
  const data = await api("commons.wikimedia.org", {
    action: "query",
    titles: `File:${file}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime",
    iiurlwidth: String(WIDTH),
  });
  const page = data.query?.pages?.[0];
  const info = page?.imageinfo?.[0];
  // A file that isn't on Commons exists only on Wikipedia and may be non-free.
  if (!info || page.missing) return { reason: "not on Commons" };
  if (!/^image\/(jpeg|png|webp)$/.test(info.mime)) return { reason: `type ${info.mime}` };

  const meta = info.extmetadata ?? {};
  const license = stripHtml(meta.LicenseShortName?.value ?? "");
  if (!FREE_LICENSE.test(license) || NOT_FREE.test(license)) return { reason: `license "${license}"` };

  const artist = stripHtml(meta.Artist?.value ?? "");
  if (!artist) return { reason: "no author listed" };

  return {
    photo: {
      url: info.thumburl ?? info.url,
      source: info.descriptionurl,
      artist: artist.length > 70 ? `${artist.slice(0, 67)}...` : artist,
      license,
      licenseUrl: meta.LicenseUrl?.value ?? null,
    },
    file,
  };
}

const source = readFileSync(new URL("../lib/cars.ts", import.meta.url), "utf8");
const cars = [...source.matchAll(/^\s*car\("([^"]+)", "([^"]+)",/gm)].map(([, make, model]) => ({
  make,
  model,
  id: `${make}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
}));

const photos = {};
const report = [];
for (const car of cars) {
  const override = FILE_OVERRIDES[car.id];
  if (override === null) {
    report.push(`SKIP ${car.id}: no suitable free photo`);
    continue;
  }
  const file = override ?? (await leadImage(ARTICLES[car.id] ?? `${car.make} ${car.model}`));
  if (!file) {
    report.push(`NONE ${car.id}: no lead image`);
    continue;
  }
  const result = await commonsPhoto(file);
  if (result.photo) {
    photos[car.id] = result.photo;
    report.push(`ok   ${car.id}: ${file} [${result.photo.license}]`);
  } else {
    report.push(`NONE ${car.id}: ${file} rejected, ${result.reason}`);
  }
}

writeFileSync(new URL("../lib/photos.json", import.meta.url), `${JSON.stringify(photos, null, 2)}\n`);
console.log(report.join("\n"));
console.log(`\n${Object.keys(photos).length} of ${cars.length} cars have a free photo`);
