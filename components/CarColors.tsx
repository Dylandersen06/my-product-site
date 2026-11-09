import type { Car } from "@/lib/cars";
import { paletteFor } from "@/lib/colors";

/** A short row of color dots for a result card. */
export function ColorDots({ car }: { car: Car }) {
  const palette = paletteFor(car);
  if (!palette) return null;
  const names = palette.colors.map((c) => c.name).join(", ");
  return (
    <div className="color-dots">
      <span className="color-dots-label">Colors</span>
      <ul aria-label={`Typical colors: ${names}`}>
        {palette.colors.map((c) => (
          <li key={c.name} title={c.name} style={{ background: c.hex }} />
        ))}
      </ul>
    </div>
  );
}

/** The full set of swatches for a car's details page. */
export default function CarColors({ car }: { car: Car }) {
  const palette = paletteFor(car);
  if (!palette) return null;
  return (
    <section className="car-colors" aria-labelledby="colors-title">
      <h2 id="colors-title">Colors</h2>
      <p className="field-hint">
        {palette.modelSpecific
          ? `Typical factory colors for the ${car.make} ${car.model}.`
          : `Typical factory colors across ${car.make}'s lineup, to give you a general idea.`}{" "}
        Not every color is offered on every trim or year, and on-screen shades are approximate.
      </p>
      <ul className="swatches">
        {palette.colors.map((c) => (
          <li key={c.name}>
            <span className="swatch" style={{ background: c.hex }} aria-hidden="true" />
            <span>{c.name}</span>
          </li>
        ))}
      </ul>
      {palette.note && <p className="field-hint">{palette.note}</p>}
    </section>
  );
}
