# CarMatch AI

**By Dylan Andersen**

CarMatch AI helps car shoppers find the models that best fit their needs. It has two search pages:

- **Quick Search (`/`):** a short form (new, used or certified pre-owned, budget, seats, fuel type, body style, how you'll use the car) that returns a ranked list of cars, each with a photo, a recommended trim, a 0–100 match score and the reasons behind it.
- **Advanced Search (`/advanced`):** everything on the quick form plus horsepower, 0–60, MPG or EV range, drivetrain, transmission, towing, cargo, brand include/exclude and feature filters. Cards also show key specs, and you can compare up to 3 cars side by side. If nothing matches, the page re-runs the search with each filter relaxed and suggests the changes that bring cars back.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## How matching works

Each car in `lib/cars.ts` (2025 models from mainstream, luxury and exotic brands) is scored in `lib/match.ts`:

| Criterion           | Points | Notes                                                       |
| ------------------- | ------ | ----------------------------------------------------------- |
| Budget              | 30     | Full points inside the range; partial below it; sliding scale to 20% over |
| Seats               | 15     | Required. Cars with too few seats are excluded              |
| Fuel type           | 15     | Partial credit for close types (e.g. hybrid vs. plug-in)    |
| Body style          | 15     | Partial credit for close styles (e.g. SUV vs. wagon)        |
| Primary use         | 10     | Commuting, family, road trips, off-road, towing, city, fun, luxury |
| Must-have features  | 15     | Proportional to how many must-haves the car offers          |

Shoppers pick a preset range (Under $30k, $30–60k, $60–100k, $100–250k, $250k–$1M) or type an exact max budget up to $1,000,000. Cars more than 20% over the max are excluded. Ties go to the car priced closest to the middle of the budget. If nothing fits a very low budget, the results show the most affordable cars that still seat everyone.

Bugatti isn't included: its cheapest model costs several million dollars, well above the $1M cap.

## New, used and certified pre-owned

Shoppers pick one or more conditions. Budget points use the price for the selected condition, and when several are selected each car is judged on whichever fits the budget best. Each result card compares all three side by side, with the saving versus new. Results can be sorted by best match, price or biggest savings; sorting reorders the top 10 matches rather than changing which cars appear.

New prices are approximate 2025 starting MSRPs, and features count if any trim offers them. **Used and CPO prices and mileage are modeled estimates, not market data.** `lib/pricing.ts` derives them from the new price using typical depreciation by brand, fuel type and body style, with overrides for specific models. Used and CPO examples are about 3 years old, or younger for models launched more recently. Check local listings for real prices.

## AI Car Advisor

`/advisor` is a chat where shoppers describe their lifestyle and get recommendations from the dataset, with the best trim and condition, plus answers to follow-up questions. An "Ask the AI" button links to it from every page. It calls the Anthropic API with `claude-haiku-5-5` from a server-side route (`app/api/advisor/route.ts`), so the key never reaches the browser.

When a reply recommends a car, a card appears under it with the car's photo and credit, trim, condition, price, 5-year cost and a "View details" link to `/cars/[id]`. `lib/advisor-cards.ts` reads the model's `**Make Model Trim (Condition)**` lines and looks them up in the dataset, so card figures always come from the data, and a line that doesn't match a real car and trim gets no card.

**Setup:** copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. On Vercel, add it under Settings → Environment Variables. Never commit the key: `.env*` files are gitignored, apart from the placeholder `.env.example`. Without a key the chat shows a "not set up yet" message and the rest of the site works normally.

**Cost controls** (`lib/advisor-limits.ts`, enforced on the server): 800 characters per message, 10 questions per chat, a 4,000-token limit per reply (including hidden reasoning), low effort, and 20 requests per visitor per 10 minutes. That last limit is per server instance, so also set a spend limit in the Anthropic Console, which is the real ceiling. The catalog in the system prompt uses prompt caching, so repeat requests pay about a tenth of the input price for it. Each request logs its token usage (never message content).

## 5-Year Cost to Own

Every result card estimates depreciation, fuel or charging, insurance, maintenance and taxes and fees, with a 5-year total and monthly cost. Miles per year defaults to 12,000 and can be edited on the results. Results can be sorted by lowest cost to own. The assumptions are constants at the top of `lib/ownership.ts`. These are modeled estimates, not quotes, and exclude loan interest.

## Quick vs. Advanced matching

Quick Search scores preferences: a near miss on fuel type or body style loses points but still appears. Advanced Search treats filters as requirements: a trim has to pass all of them (`lib/filters.ts`), including body style, fuel type and checked features. The search budget works the same way on both pages, except that Advanced Search defaults to "Any budget". Old `/results` links redirect to Quick Search.

## Trims

`lib/trims.ts` lists each model's main trims (2–4 for most) with starting price, engine or motor, horsepower, MPG or EV range, drivetrain, features and highlights. Six low-volume models are sold in only one trim and are listed that way. Matching checks every trim in every selected condition and recommends the one with the best mix of budget fit and must-haves. Ties go to the price closest to the middle of the budget. Used and CPO estimates are calculated per trim. `lib/trim-specs.ts` adds 0–60, transmission, cargo, towing and 360° camera availability for every trim, and the build fails if a row doesn't line up with its model's trims. Trim data is approximate and was written by hand from general knowledge, so confirm it with a dealer.

## Photos

Every photo comes from Wikimedia Commons and is stored in `lib/photos.json` with its image URL, Commons page, author and license. Only CC0, public domain, CC BY and CC BY-SA files are accepted, and authors and licenses are read from the Commons API by `scripts/fetch-photos.mjs`. Lead images from Wikipedia are the starting point, and `scripts/photo-overrides.json` names specific files where a lead image was the wrong vehicle. Result cards show a credit line with links to the file and license. If a photo is missing or fails to load, the card shows a placeholder with the car's name and body style.

Photos are representative, so the year and trim shown may differ from the listing. To refresh them, run `node scripts/fetch-photos.mjs`, then review the results by eye: the script checks licenses, not whether the picture shows the right car.

## Stack

Next.js (App Router), React and TypeScript, with plain CSS. No database. Photos load from Wikimedia at view time.
