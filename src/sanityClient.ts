// src/sanityClient.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "ow90gbna",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2023-10-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

// `source` is a Sanity image reference object or an asset ref string.
export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);
