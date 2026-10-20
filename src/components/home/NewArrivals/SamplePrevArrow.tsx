<<<<<<< HEAD:src/components/home/NewArrivals/SamplePrevArrow.jsx
import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default SamplePrevArrow;
=======
import { FaLongArrowAltLeft } from "react-icons/fa";

interface SamplePrevArrowProps {
  onClick?: () => void;
}

const SamplePrevArrow = ({ onClick }: SamplePrevArrowProps) => {
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default SamplePrevArrow;
>>>>>>> 90a9eeb (refactor: migrate shop to strict TypeScript + Tailwind v4 CSS-first):src/components/home/NewArrivals/SamplePrevArrow.tsx
