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

  // Close mobile sidenav automatically when switching to desktop layout
  useEffect(() => {
    if (showMenu) {
      setSidenav(false);
    }
  }, [showMenu]);

  // Close on Escape key for convenience/accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSidenav(false);
    };
    if (sidenav) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sidenav]);

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

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primeColor font-medium"
      : "text-gray-700 hover:text-black font-medium";

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b border-gray-200">
      <nav
        className="h-full px-4 max-w-container mx-auto relative"
        aria-label="Main navigation"
      >
        <Flex className="flex items-center justify-between h-full">
          <Link to="/" aria-label="Home">
            <Image className="w-16 object-cover" imgSrc={logo} />
          </Link>

          {showMenu && (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                Cart
              </NavLink>
              <NavLink to="/journal" className={navLinkClass}>
                Journal
              </NavLink>
            </motion.ul>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setSidenav((s) => !s)}
            className="inline-block md:hidden p-1"
            aria-label={sidenav ? "Close menu" : "Open menu"}
            aria-expanded={sidenav}
            aria-controls="mobile-sidenav"
          >
            <HiMenuAlt2 className="w-8 h-6" />
          </button>

          {/* Mobile sidenav overlay */}
          {sidenav && (
            <div
              className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-50"
              role="dialog"
              aria-modal="true"
              onClick={() => setSidenav(false)} // close when clicking the overlay
            >
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] max-w-xs h-full bg-white p-6 relative"
                id="mobile-sidenav"
                onClick={(e) => e.stopPropagation()} // prevent overlay click from closing when interacting with menu
              >
                <img className="w-28 mb-6" src={logoLight} alt="logo" />

                {/* Primary nav links on mobile */}
                <nav className="mb-4" aria-label="Mobile primary">
                  <motion.ul
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3"
                  >
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primeColor font-medium block"
                            : "text-gray-700 hover:text-black block"
                        }
                        onClick={() => setSidenav(false)}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/shop"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primeColor font-medium block"
                            : "text-gray-700 hover:text-black block"
                        }
                        onClick={() => setSidenav(false)}
                      >
                        Shop
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primeColor font-medium block"
                            : "text-gray-700 hover:text-black block"
                        }
                        onClick={() => setSidenav(false)}
                      >
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/journal"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primeColor font-medium block"
                            : "text-gray-700 hover:text-black block"
                        }
                        onClick={() => setSidenav(false)}
                      >
                        Journal
                      </NavLink>
                    </li>
                  </motion.ul>
                </nav>

                {/* Shop by Category */}
                <div className="mt-4">
                  <h2
                    onClick={() => setCategory(!category)}
                    className="flex justify-between text-base cursor-pointer items-center font-semibold mb-2"
                  >
                    Shop by Category{" "}
                    <span className="ml-2 text-lg">{category ? "−" : "+"}</span>
                  </h2>
                  {category && (
                    <motion.ul
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-2"
                    >
                      {categories.map((cat) => (
                        <li key={cat._id} className="hover:text-orange-500">
                          <Link
                            to={`/category/${cat.slug}`}
                            onClick={() => setSidenav(false)}
                            className="flex items-center gap-2"
                          >
                            {cat.icon && (
                              <span className="mr-2">{cat.icon}</span>
                            )}
                            <span>{cat.title}</span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border border-gray-300 absolute top-3 right-3 text-gray-500 flex justify-center items-center cursor-pointer hover:text-red-500 hover:border-red-500"
                  aria-label="Close menu"
                >
                  <MdClose />
                </button>
              </motion.div>
            </div>
          )}
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
