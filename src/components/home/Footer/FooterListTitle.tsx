<<<<<<< HEAD:src/components/home/Footer/FooterListTitle.jsx
import React from "react";

const FooterListTitle = ({ title }) => {
  return <h3 className="text-xl font-bodyFont font-semibold mb-6">{title}</h3>;
};

export default FooterListTitle;
=======
interface FooterListTitleProps {
  title: string;
}

const FooterListTitle = ({ title }: FooterListTitleProps) => {
  return <h3 className="text-xl font-bodyFont font-semibold mb-6">{title}</h3>;
};

export default FooterListTitle;
>>>>>>> 90a9eeb (refactor: migrate shop to strict TypeScript + Tailwind v4 CSS-first):src/components/home/Footer/FooterListTitle.tsx
