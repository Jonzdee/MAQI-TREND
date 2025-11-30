import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Breadcrumbs = ({ prevLocation, title }) => {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");

  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean); // removes empty segments

    setLocationPath(parts[0] || "home"); // default to home
  }, [location]);

  return (
    <div className="w-full py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>

      <p className="text-sm font-normal text-lightText flex items-center">
        <span>{prevLocation || "Home"}</span>

        {locationPath !== "home" && (
          <>
            <span className="px-1">
              <HiOutlineChevronRight />
            </span>
            <span className="capitalize font-semibold text-primeColor">
              {locationPath}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default Breadcrumbs;
