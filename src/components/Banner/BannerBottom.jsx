import React from "react";
import { FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";

const BannerBottom = () => {
  const features = [
    {
      icon: <FiShield className="text-orange-500 w-8 h-8" />,
      title: "Two Years Warranty",
      subtitle: "On all products",
    },
    {
      icon: <FiTruck className="text-orange-500 w-8 h-8" />,
      title: "Free Shipping",
      subtitle: "Worldwide delivery",
    },
    {
      icon: <FiRefreshCw className="text-orange-500 w-8 h-8" />,
      title: "30 Days Return",
      subtitle: "Hassle-free returns",
    },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 py-6 px-4">
      <div className="max-w-container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-md px-4 py-3 w-full md:w-auto"
          >
            <span className="text-2xl">{feature.icon}</span>
            <div className="flex flex-col">
              <p className="text-sm md:text-base font-semibold text-gray-800">
                {feature.title}
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerBottom;
