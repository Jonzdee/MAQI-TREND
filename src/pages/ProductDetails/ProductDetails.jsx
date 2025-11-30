import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (src) => builder.image(src);

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(undefined);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `
      *[_type == "product" && slug.current == $slug][0]{
        _id,
        name,
        slug,
        price,
        description,
        image,
        images,
        sizes,
        colors,
        material,
        fit,
        stock,
        sku,
        badge,
    category->{
      title,
      slug
    },
 
     brand->{title}
      }
      `;
      const data = await client.fetch(query, { slug });

      setProduct(data);
      setActiveImage(urlFor(data?.image).url());
    };

    fetchProduct();
  }, [slug]);

  if (product === undefined) {
    return <div className="p-10 text-center text-xl">Loading Product...</div>;
  }

  if (product === null) {
    return <div className="p-10 text-center text-xl">Product not found.</div>;
  }

 
  const allImages = [product.image, ...(product.images || [])];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT IMAGE AREA */}
        <div>
          {/* MAIN IMAGE  IS HERE BRO*/}
          <img
            src={activeImage}
            className="w-full h-[480px] object-cover rounded-xl border"
          />

          {/* THUMBNAILS FOR THE SMALL PICTURES IS HERE BRO*/}
          <div className="flex flex-row gap-4 mt-4 overflow-x-auto">
            {allImages.map((img, index) => {
              const imgUrl = urlFor(img).url();
              return (
                <img
                  key={index}
                  src={imgUrl}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                    activeImage === imgUrl ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setActiveImage(imgUrl)}
                />
              );
            })}
          </div>
        </div>

        {/* RIGHT PRODUCT INFO  IS HERE BRO*/}
        <div className="flex flex-col gap-6">
          {product.badge && (
            <span className="inline-block bg-black text-white px-3 py-1 text-sm rounded-full w-max">
              {product.badge.toUpperCase()}
            </span>
          )}

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-blue-600">
            ₦{product.price.toLocaleString()}
          </p>

          {/* SIZES OF CLOTHES IS HERE BRO*/}
          {product.sizes?.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Available Sizes:</p>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLORS ALSO HERE BRO */}
          {product.colors?.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Colors:</p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MATERIAL IS HERE BRO */}
          {product.material && (
            <p className="text-gray-700">
              <span className="font-semibold">Material:</span>{" "}
              {product.material}
            </p>
          )}

          {/* FIT IS HERE BRO */}
          {product.fit && (
            <p className="text-gray-700">
              <span className="font-semibold">Fit:</span> {product.fit}
            </p>
          )}

          {/* STOCK FOR THE NUMBERS OF PRODUCT IS HERE BRO */}
          <p className="text-gray-900 font-semibold">
            Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
          </p>

          <button className="w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>

      {/* DESCRIPTION TAB IS HERE BRO*/}
      <div className="mt-12">
        <div className="flex gap-6 border-b pb-2">
          <button
            className={`pb-2 ${
              activeTab === "description" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
        </div>

        {activeTab === "description" && (
          <div className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
