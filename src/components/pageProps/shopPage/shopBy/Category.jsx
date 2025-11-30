import React, { useState, useEffect } from "react";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/orebiSlice";
import { client } from "../../../../sanityClient";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkedCategorys = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );

  const dispatch = useDispatch();

  const handleToggleCategory = (slug) => {
    dispatch(toggleCategory(slug));
  };

  // Fetch categories + product count
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "category"]{
            _id,
            title,
            slug,
            
            "productCount": count(*[_type == "product" && references(^._id)])
          } | order(title asc)
        `);
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading categories...</p>
      ) : (
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedCategorys.includes(item.slug.current)}
                  onChange={() => handleToggleCategory(item.slug.current)}
                />
                <span>{item.title}</span>
              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {item.productCount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
