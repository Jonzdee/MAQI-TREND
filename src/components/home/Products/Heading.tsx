<<<<<<< HEAD:src/components/home/Products/Heading.jsx
import React from "react";

const Heading = ({ heading }) => {
  return <div className="text-3xl font-semibold pb-6">{heading}</div>;
};

export default Heading;
=======
interface HeadingProps {
  heading: string;
}

const Heading = ({ heading }: HeadingProps) => {
  return <div className="text-3xl font-semibold pb-6">{heading}</div>;
};

export default Heading;
>>>>>>> 90a9eeb (refactor: migrate shop to strict TypeScript + Tailwind v4 CSS-first):src/components/home/Products/Heading.tsx
