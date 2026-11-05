import data from "./photos.json";

/** A freely licensed Wikimedia Commons photo and its required attribution. */
export interface CarPhoto {
  /** Image URL on Wikimedia's own servers. */
  url: string;
  /** The file's Commons page, which documents its author and license. */
  source: string;
  artist: string;
  license: string;
  licenseUrl: string | null;
}

const PHOTOS: Record<string, CarPhoto> = data;

export function photoFor(id: string): CarPhoto | undefined {
  return PHOTOS[id];
}
