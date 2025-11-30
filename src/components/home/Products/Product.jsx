import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { toast } from "react-toastify";

const Product = ({
  _id,
  productName,
  img,
  price,
  badge,
  color,
  ...restProps
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [wishList, setWishList] = useState([]);

  // Create slug for product detail navigation
  const rootId = String(productName).toLowerCase().split(" ").join("-");

  // Navigate to product details
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: {
          _id,
          productName,
          img,
          price,
          badge,
          color,
          ...restProps,
        },
      },
    });
  };

  // Wishlist handler
  const handleWishList = () => {
    toast.success("Product added to wish list");
    setWishList((prev) => [...prev, { _id, productName, img, price }]);
  };

  return (
    <div className="w-full relative group">
      {/* Product Image Area */}
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <div onClick={handleProductDetails}>
          <Image className="w-full h-full" imgSrc={img} />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-6 left-8">
            <Badge text={badge === "new" ? "New" : badge} />
          </div>
        )}

        {/* Hover Actions */}
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm border-b border-gray-200 hover:border-primeColor duration-300 flex items-center justify-end gap-2 w-full pb-1 cursor-pointer">
              Compare <GiReturnArrow />
            </li>

            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id,
                    name: productName,
                    quantity: 1,
                    image: img,
                    badge,
                    price,
                    colors: color,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm border-b border-gray-200 hover:border-primeColor duration-300 flex items-center justify-end gap-2 w-full pb-1 cursor-pointer"
            >
              Add to Cart <FaShoppingCart />
            </li>

            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm border-b border-gray-200 hover:border-primeColor duration-300 flex items-center justify-end gap-2 w-full pb-1 cursor-pointer"
            >
              View Details <MdOutlineLabelImportant className="text-lg" />
            </li>

            <li
              onClick={handleWishList}
              className="text-[#767676] hover:text-primeColor text-sm border-b border-gray-200 hover:border-primeColor duration-300 flex items-center justify-end gap-2 w-full pb-1 cursor-pointer"
            >
              Add to Wish List <BsSuitHeartFill />
            </li>
          </ul>
        </div>
      </div>

      {/* Product Info */}
      <div className="max-w-80 py-6 flex flex-col gap-1 border border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">{productName}</h2>
          <p className="text-[#767676] text-[14px]">₦{price}</p>
        </div>

        <p className="text-[#767676] text-[14px]">{color}</p>
      </div>
    </div>
  );
};

export default Product;
