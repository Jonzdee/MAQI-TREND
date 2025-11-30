import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { client } from "../../../sanityClient"; // import your Sanity client
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import Flex from "../../designLayouts/Flex";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  // Handle responsive menu
  useEffect(() => {
    const ResponsiveMenu = () => {
      setShowMenu(window.innerWidth >= 667);
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  // Fetch categories from Sanity
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "category"] | order(title asc){
          _id,
          title,
          "slug": slug.current,
          icon
        }`;
        const data = await client.fetch(query);
        setCategories(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b border-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <Image className="w-16 object-cover" imgSrc={logo} />
          </Link>

          {showMenu && (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <NavLink
                to="/"
                className="text-gray-700 hover:text-black font-medium"
              >
                Home
              </NavLink>
              {/* Add more nav items here */}
            </motion.ul>
          )}

          <HiMenuAlt2
            onClick={() => setSidenav(!sidenav)}
            className="inline-block md:hidden cursor-pointer w-8 h-6"
          />

          {sidenav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full bg-white p-6 relative"
              >
                <img className="w-28 mb-6" src={logoLight} alt="logo" />

                {/* Shop by Category */}
                <div className="mt-4">
                  <h1
                    onClick={() => setCategory(!category)}
                    className="flex justify-between text-base cursor-pointer items-center font-semibold mb-2"
                  >
                    Shop by Category <span>{category ? "-" : "+"}</span>
                  </h1>
                  {category && (
                    <motion.ul
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-1"
                    >
                      {categories.map((cat) => (
                        <li key={cat._id} className="hover:text-orange-500">
                          <Link
                            to={`/category/${cat.slug}`}
                            onClick={() => setSidenav(false)}
                          >
                            {cat.icon && (
                              <span className="mr-2">{cat.icon}</span>
                            )}
                            {cat.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>

                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border border-gray-300 absolute top-2 right-2 text-gray-500 flex justify-center items-center cursor-pointer hover:text-red-500 hover:border-red-500"
                >
                  <MdClose />
                </span>
              </motion.div>
            </div>
          )}
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
