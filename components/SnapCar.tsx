"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { SnapCar as SnapCarInfo, SnapResult } from "@/lib/snap";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const LONG_EDGE = 1568; // plenty for identifying a car, and keeps uploads small

/** Shrinks a photo to a JPEG no larger than LONG_EDGE on its longest side. */
async function shrink(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, LONG_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob ?? file), "image/jpeg", 0.85));
}

function CarTile({ car, label }: { car: SnapCarInfo; label?: string }) {
  return (
    <Link href={car.href} className="snap-tile">
      {car.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={car.photoUrl} alt="" loading="lazy" />
      ) : (
        <span className="snap-tile-placeholder" aria-hidden="true" />
      )}
      <span className="snap-tile-body">
        {label && <span className="eyebrow">{label}</span>}
        <strong>{car.name}</strong>
        <span className="muted">
          {car.body} · New from {usd(car.newFrom)} · Used from about {usd(car.usedFrom)}
        </span>
        {car.stars !== null && <span className="muted">NHTSA {car.stars}★ overall</span>}
        <span className="snap-tile-cta">See prices, specs and if you can afford it →</span>
      </span>
    </Link>
  );
}

export default function SnapCar() {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SnapResult | null>(null);

  async function identify(file: File) {
    setError(null);
    setResult(null);
    if (!file.type.startsWith("image/")) {
      setError("That file isn't a photo. Choose a JPEG, PNG or HEIC image.");
      return;
    }
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
    setBusy(true);
    try {
      const body = new FormData();
      body.append("photo", await shrink(file), "photo.jpg");
      const response = await fetch("/api/snap", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as (SnapResult & { error?: string }) | null;
      if (!response.ok || !data || data.error) throw new Error(data?.error ?? "Something went wrong. Please try again.");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const id = result?.identification;
  const named = id && id.is_vehicle && (id.make || id.model) ? [id.year_range, id.make, id.model].filter(Boolean).join(" ") : null;

  return (
    <div className="snap">
      <div
        className="snap-drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) identify(file);
        }}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Your photo" className="snap-preview" />
        ) : (
          <p className="muted">Take a photo of a car, or drop one here. A clear shot of the front or side works best.</p>
        )}
        <input
          ref={input}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) identify(file);
            e.target.value = "";
          }}
        />
        <button type="button" className="button button-primary button-lg" onClick={() => input.current?.click()} disabled={busy}>
          {busy ? "Identifying…" : preview ? "Try another photo" : "Take or choose a photo"}
        </button>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {result && id && (
        <section className="snap-result" aria-live="polite">
          {!id.is_vehicle ? (
            <p>We couldn&rsquo;t spot a car in that photo. Try a clearer shot of the whole car.</p>
          ) : (
            <>
              <h2>{named ? `Looks like a ${named}` : "We couldn't tell exactly which car this is"}</h2>
              <p className="muted">
                {id.confidence === "high" ? "Confident match" : id.confidence === "medium" ? "Likely match" : "Best guess, so double-check"}
                {id.color ? ` · ${id.color}` : ""}
                {id.notes ? ` · ${id.notes}` : ""}
              </p>
              {result.match ? (
                <CarTile car={result.match} label="In our catalog" />
              ) : (
                named && <p>That model isn&rsquo;t in our catalog yet, but here are similar cars we know well.</p>
              )}
              {result.similar.length > 0 && (
                <>
                  <h3>{result.match ? "Similar cars that might suit you" : "Cars like it"}</h3>
                  <div className="snap-similar">
                    {result.similar.map((car) => (
                      <CarTile key={car.id} car={car} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}
