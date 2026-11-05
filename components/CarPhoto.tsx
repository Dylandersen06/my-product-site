"use client";

import { useEffect, useRef, useState } from "react";
import type { CarPhoto as Photo } from "@/lib/photos";

/**
 * The car's freely licensed photo with its credit line, or a placeholder when
 * there is no photo or the image fails to load.
 */
export default function CarPhoto({
  name,
  bodyLabel,
  photo,
  rank,
}: {
  name: string;
  bodyLabel: string;
  photo?: Photo;
  rank?: number;
}) {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);

  // An image can fail before React hydrates, when onError isn't attached yet.
  useEffect(() => {
    const el = image.current;
    if (el?.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (!photo || failed) {
    return (
      <div className="car-photo-wrap">
        {rank !== undefined && <span className="car-rank">#{rank}</span>}
        <div className="car-photo car-placeholder">
          <span className="car-placeholder-name">{name}</span>
          <span className="car-placeholder-body">{bodyLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="car-photo-wrap">
        {rank !== undefined && <span className="car-rank">#{rank}</span>}
        {/* Plain img: photos stay hosted on Wikimedia Commons, with no optimization proxy. */}
        <img
          ref={image}
          className="car-photo"
          src={photo.url}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      </div>
      <p className="photo-credit">
        Photo:{" "}
        <a href={photo.source} target="_blank" rel="noopener noreferrer">
          {photo.artist}
        </a>{" "}
        ·{" "}
        {photo.licenseUrl ? (
          <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license">
            {photo.license}
          </a>
        ) : (
          photo.license
        )}{" "}
        · Wikimedia Commons. Year and trim may differ.
      </p>
    </>
  );
}
