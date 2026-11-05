# CarMatch AI

**By Dylan Andersen**

CarMatch AI helps car shoppers find the models that best fit their needs. Fill out a short form (budget, seats, fuel type, body style, how you'll use the car, and must-have features) and get a ranked list of matching cars, each with a 0–100 match score and the reasons behind it.

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

Prices are approximate 2025 starting MSRPs, and features count if any trim offers them. Confirm details with a dealer.

## Stack

Next.js (App Router), React and TypeScript, with plain CSS. No database or external APIs.
