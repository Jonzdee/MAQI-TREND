import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand, clearBrands } from "../../../../redux/orebiSlice";
import { client } from "../../../../sanityClient";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const [brands, setBrands] = useState([]);
  const checkedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const dispatch = useDispatch();

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  // Fetch brands from Sanity
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "brand"]{
            _id,
            title,
            slug
          } | order(title asc)
        `);
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100">
      {/* Header */}
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand" icons={true} />
      </div>

      {/* Brands List */}
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          {brands.length === 0 ? (
            <p className="text-sm text-gray-500">Loading brands...</p>
          ) : (
            <ul className="flex flex-col gap-3 text-sm lg:text-base text-gray-700">
              {/* Default All Brands Option */}
              <li
                className={`flex items-center gap-2 py-2 cursor-pointer transition-all duration-300
                  ${
                    checkedBrands.length === 0
                      ? "font-semibold text-primeColor"
                      : ""
                  }
                `}
                onClick={() => dispatch(clearBrands())} // Clear all brands
              >
                <input
                  type="checkbox"
                  checked={checkedBrands.length === 0}
                  readOnly
                />
                <span>All Brands</span>
              </li>

              {/* Individual Brands */}
              {brands.map((brand) => (
                <li
                  key={brand._id}
                  className="flex items-center gap-2 py-2 cursor-pointer border-b border-gray-200 hover:text-primeColor hover:border-gray-400 transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    id={brand._id}
                    checked={checkedBrands.some((b) => b._id === brand._id)}
                    onChange={() => handleToggleBrand(brand)}
                  />
                  <span>{brand.title}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
