// ---------------------------------------------------------------------------
// Shared domain types for MAQI-TREND.
// These mirror the shapes returned by Sanity (product documents) and used
// across components and the redux store.
// ---------------------------------------------------------------------------

/** A single Sanity image reference (asset with `_ref`/`_type`), or null. */
export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

/** A product as added to and kept in the redux cart. */
export interface CartProduct {
  _id: string;
  productName: string;
  name: string;
  image: string;
  img: string;
  price: number;
  quantity: number;
  badge?: boolean | string;
  color?: string;
  colors?: string;
  description?: string;
}

/** A product card row fetched from Sanity for the home carousels/grids. */
export interface ProductCard {
  _id: string;
  name: string;
  price: number;
  colors?: string[];
  badge?: boolean | string;
  img?: string;
  description?: string;
}

/** A product card summary (home carousels, related products). */
export interface ProductSummary {
  _id: string;
  name: string;
  img: string;
  price: number;
  badge?: boolean | string;
  color?: string;
  description?: string;
  productName?: string;
  slug?: { current: string };
  [key: string]: unknown;
}

/** A brand document (used by the Brand filter). */
export interface Brand {
  _id: string;
  title: string;
  description?: string;
  slug?: { current: string };
}

/** A category row fetched with its product count (Category filter). */
export interface CategoryRow {
  _id: string;
  title: string;
  slug: { current: string };
  productCount: number;
}

/** A price range filter. */
export interface PriceRange {
  min: number;
  max: number;
}

/** A product row used by the Shop pagination grid (includes refs). */
export interface PaginationProduct {
  _id: string;
  name: string;
  price: number;
  colors?: string[];
  description?: string;
  img?: string;
  badge?: boolean | string;
  category?: { title: string; slug?: { current: string } };
  brand?: { title: string; slug?: { current: string } };
}

/** A product document fetched from Sanity (ProductDetails page). */
export interface SanityProduct {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description?: string;
  image?: SanityImage;
  images?: SanityImage[];
  sizes?: string[];
  colors?: string[];
  material?: string;
  fit?: string;
  stock?: number;
  sku?: string;
  badge?: boolean | string;
  category?: { title: string; slug?: { current: string } };
  brand?: { title: string };
}
