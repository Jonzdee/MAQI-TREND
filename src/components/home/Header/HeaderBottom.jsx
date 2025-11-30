import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { client } from "../../../sanityClient";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const ref = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch categories from Sanity
  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"] | order(title asc){
        _id,
        title,
        "slug": slug.current
      }`;
      const data = await client.fetch(query);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products dynamically
    if (query) {
      const filtered = products.filter((p) =>
        p.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          {/* Shop by Category */}
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor relative"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-14 z-50 bg-primeColor w-52 text-[#767676] h-auto p-2 shadow-lg"
              >
                {categories.map((cat) => (
                  <Link key={cat._id} to={`/category/${cat.slug}`}>
                    <li className="text-gray-400 px-4 py-2 hover:text-white hover:bg-orange-500 rounded cursor-pointer">
                      {cat.title}
                    </li>
                  </Link>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search your products here"
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            />
            <FaSearch className="w-5 h-5" />

            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute top-14 left-0 w-full max-h-96 bg-white overflow-y-auto shadow-2xl scrollbar-hide z-50">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(
                        `/product/${item.productName
                          .toLowerCase()
                          .split(" ")
                          .join("")}`,
                        {
                          state: { item },
                        }
                      );
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-3 border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      className="w-20 h-20 object-cover"
                      src={item.img}
                      alt={item.productName}
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-xs">{item.des.slice(0, 100)}...</p>
                      <p className="text-sm text-primeColor font-semibold">
                        ₦{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User, Cart, Wishlist */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div
              onClick={() => setShowUser(!showUser)}
              className="flex items-center gap-1"
            >
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-10 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6 shadow-lg"
              >
                <Link to="/signin">
                  <li className="px-4 py-2 hover:text-white hover:bg-orange-500 rounded cursor-pointer">
                    Login
                  </li>
                </Link>
                <Link to="/signup">
                  <li className="px-4 py-2 hover:text-white hover:bg-orange-500 rounded cursor-pointer">
                    Sign Up
                  </li>
                </Link>
                <li className="px-4 py-2 hover:text-white hover:bg-orange-500 rounded cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:text-white hover:bg-orange-500 rounded cursor-pointer">
                  Others
                </li>
              </motion.ul>
            )}

            <Link to="/cart" className="relative">
              <FaShoppingCart />
              <span className="absolute top-0 -right-2 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-primeColor text-white">
                {products.length}
              </span>
            </Link>
            <BsSuitHeartFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
