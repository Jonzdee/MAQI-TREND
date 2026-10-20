<<<<<<< HEAD:src/components/pageProps/shopPage/ShopSideNav.jsx
import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <Brand />
      <Color />
      <Price />
    </div>
  );
};

export default ShopSideNav;
=======
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <Brand />
      <Color />
      <Price />
    </div>
  );
};

export default ShopSideNav;
>>>>>>> 90a9eeb (refactor: migrate shop to strict TypeScript + Tailwind v4 CSS-first):src/components/pageProps/shopPage/ShopSideNav.tsx
