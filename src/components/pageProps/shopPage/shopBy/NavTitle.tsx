<<<<<<< HEAD:src/components/pageProps/shopPage/shopBy/NavTitle.jsx
import React from "react";
import { BiCaretDown } from "react-icons/bi";

const NavTitle = ({ title, icons }) => {
  return (
    <div className="flex items-center justify-between pb-5">
      {icons ? (
        <>
          <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
          {icons && <BiCaretDown />}
        </>
      ) : (
        <>
          <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
        </>
      )}
    </div>
  );
};

export default NavTitle;
=======
import { BiCaretDown } from "react-icons/bi";

interface NavTitleProps {
  title: string;
  icons?: boolean;
}

const NavTitle = ({ title, icons }: NavTitleProps) => {
  return (
    <div className="flex items-center justify-between pb-5">
      {icons ? (
        <>
          <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
          {icons && <BiCaretDown />}
        </>
      ) : (
        <>
          <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
        </>
      )}
    </div>
  );
};

export default NavTitle;
>>>>>>> 90a9eeb (refactor: migrate shop to strict TypeScript + Tailwind v4 CSS-first):src/components/pageProps/shopPage/shopBy/NavTitle.tsx
