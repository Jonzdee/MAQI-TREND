import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { urlFor } from "../../../sanityClient"; // ✅ correct import

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();

  const highlightStyle = { color: "#d0121a", fontWeight: "bold" };

  const renderDescription = () => {
    if (!productInfo.description) return null;
    return productInfo.description.split(/:(.*?)-/).map((part, index) => (
      <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
        {part}
      </span>
    ));
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>

      <p className="text-2xl font-semibold">
        {productInfo.price} DT
        <span className="text-xl font-semibold line-through ml-2">540</span>
        <span className="text-xs ml-2 inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white">
          Save 100
        </span>
      </p>

      <hr />
      <p className="text-base text-gray-600">{renderDescription()}</p>

      <p className="text-base text-green-600 font-medium">En Stock</p>

      {productInfo.color && (
        <p className="font-medium text-lg">
          <span className="font-normal">Colors:</span> {productInfo.color}
        </p>
      )}

      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo._id,
              name: productInfo.name,
              quantity: 1,
              image: urlFor(productInfo.image).url(),
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>

      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span>{" "}
        {productInfo.category || "N/A"}
      </p>
    </div>
  );
};

export default ProductInfo;
