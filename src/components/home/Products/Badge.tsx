<<<<<<< HEAD:src/components/home/Products/Badge.jsx
import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-primeColor w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-black duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
=======
interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <div className="bg-primeColor w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-black duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
>>>>>>> 90a9eeb (refactor: migrate shop to strict TypeScript + Tailwind v4 CSS-first):src/components/home/Products/Badge.tsx
