import type { BodyStyle } from "@/lib/cars";

/** Generic side-on outlines, drawn for this site. They aren't based on any real model. */
const SHAPES: Record<BodyStyle, { body: string; windows: string }> = {
  sedan: {
    body: "M2 23V20Q2 17 6 16.2L17 14.5 25 8Q26.5 6.8 29 6.8H40Q42.5 6.8 44 8.3L50 14.5 58 16Q62 16.8 62 20V23Q62 25 60 25H4Q2 25 2 23Z",
    windows: "M20.5 14.2 26.5 9.3Q27.2 8.8 29 8.8H34V14.2ZM36 8.8H40Q41.8 8.8 42.8 9.8L47.2 14.2H36Z",
  },
  hatchback: {
    body: "M4 23V19Q4 17 7 16L15 14 23 7Q24.5 6 27 6H45Q48 6 50 8L56 15Q60 16 60 19V23Q60 25 58 25H6Q4 25 4 23Z",
    windows: "M18.5 13.8 24.2 8.8Q25 8 27 8H34V13.8ZM36 8H45Q47 8 48.4 9.4L52.5 13.8H36Z",
  },
  suv: {
    body: "M2 23V18Q2 15 6 14.5L14 13 20 5.5Q21 4 24 4H50Q53 4 54.5 6L60 13Q62 14.5 62 18V23Q62 25 60 25H4Q2 25 2 23Z",
    windows: "M17 12.8 21.8 6.8Q22.4 6 24 6H33V12.8ZM35 6H44V12.8H35ZM46 6H50Q52 6 53 7.2L57 12.8H46Z",
  },
  wagon: {
    body: "M2 23V20Q2 17 6 16L16 14.5 24 7.5Q25.5 6.5 28 6.5H52Q55 6.5 56.5 8.5L60.5 15Q62 17 62 20V23Q62 25 60 25H4Q2 25 2 23Z",
    windows: "M20 14 25.4 9.2Q26.2 8.5 28 8.5H36V14ZM38 8.5H46V14H38ZM48 8.5H52Q54 8.5 55 10L57.4 14H48Z",
  },
  minivan: {
    body: "M2 23V18Q2 15.5 5 14.5L11 12 19 4.5Q20.5 3.5 23 3.5H54Q58 3.5 59.5 7L62 15V23Q62 25 60 25H4Q2 25 2 23Z",
    windows: "M15 12.5 20.5 6.5Q21.2 5.5 23 5.5H31V12.5ZM33 5.5H44V12.5H33ZM46 5.5H54Q56.8 5.5 57.8 8L59 12.5H46Z",
  },
  truck: {
    body: "M2 23V18Q2 15.5 5 15L13 13.5 20 6Q21 5 23 5H35Q37 5 37 7V14.5H61Q62 14.5 62 16V23Q62 25 60 25H4Q2 25 2 23Z",
    windows: "M16.5 13.2 21.2 7.8Q21.8 7 23 7H27V13.2ZM29 7H35V13.2H29Z",
  },
  coupe: {
    body: "M2 23V20.5Q2 18 6 17L20 14.5 29 9Q31 8 34 8H40Q44 8 47 10.5L53 15 59 16.5Q62 17.5 62 20.5V23Q62 25 60 25H4Q2 25 2 23Z",
    windows: "M25 14.5 30 11Q31.5 10 34 10H37V14.5ZM39 10H40Q43.5 10 46 12L48.8 14.5H39Z",
  },
};

export default function BodyIcon({ body }: { body: BodyStyle | "any" }) {
  const wheels = [15, 49].map((cx) => (
    <g key={cx}>
      <circle className="body-icon-gap" cx={cx} cy={24} r={6.5} />
      <circle cx={cx} cy={24} r={4.5} />
    </g>
  ));
  return (
    <svg className="body-icon" viewBox="0 0 64 31" width="64" height="31" fill="currentColor" aria-hidden="true">
      {body === "any" ? (
        <path
          d={SHAPES.sedan.body}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="3 2.5"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <path d={SHAPES[body].body} />
          <path className="body-icon-gap" d={SHAPES[body].windows} />
          {wheels}
        </>
      )}
    </svg>
  );
}
