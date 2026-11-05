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

Each car in `lib/cars.ts` (43 models from 2025) is scored in `lib/match.ts`:

| Criterion           | Points | Notes                                                       |
| ------------------- | ------ | ----------------------------------------------------------- |
| Budget              | 30     | Full points at/under budget; sliding scale to 20% over      |
| Seats               | 15     | Required. Cars with too few seats are excluded              |
| Fuel type           | 15     | Partial credit for close types (e.g. hybrid vs. plug-in)    |
| Body style          | 15     | Partial credit for close styles (e.g. SUV vs. wagon)        |
| Primary use         | 10     | Commuting, family, road trips, off-road, towing, city, fun  |
| Must-have features  | 15     | Proportional to how many must-haves the car offers          |

Cars more than 20% over budget are excluded. Ties go to the cheaper car.

Prices are approximate 2025 starting MSRPs, and features count if any trim offers them. Confirm details with a dealer.

## Stack

Next.js (App Router), React and TypeScript, with plain CSS. No database or external APIs.
