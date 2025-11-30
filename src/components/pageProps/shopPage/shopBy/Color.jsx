import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../../../../redux/orebiSlice";

const Color = () => {
  const [showColors, setShowColors] = useState(true);
  const checkedColors = useSelector(
    (state) => state.orebiReducer.checkedColors
  );
  const dispatch = useDispatch();

  const colors = [
    { _id: 9001, title: "Green", base: "#22c55e" },
    { _id: 9002, title: "Gray", base: "#a3a3a3" },
    { _id: 9003, title: "Red", base: "#dc2626" },
    { _id: 9004, title: "Yellow", base: "#f59e0b" },
    { _id: 9005, title: "Blue", base: "#3b82f6" },
  ];

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Color" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {colors.map((color) => (
              <li
                key={color._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 cursor-pointer hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  checked={checkedColors.includes(color.title)}
                  onChange={() => dispatch(toggleColor(color.title))}
                />
                <span
                  style={{ background: color.base }}
                  className="w-3 h-3 rounded-full"
                ></span>
                <span>{color.title}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
