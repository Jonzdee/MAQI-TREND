import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { client } from "../../../sanityClient";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `
          *[_type == "product" && badge == "newArrival"]{
            _id,
            name,
            price,
            colors,
            badge,
            "img": image.asset->url,
            description
          }
        `;
        const data = await client.fetch(query);
        setNewProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    infinite: newProducts.length > 1,
    speed: 500,
    slidesToShow: Math.min(newProducts.length, 4),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: { slidesToShow: Math.min(newProducts.length, 3) },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: Math.min(newProducts.length, 2),
          slidesToScroll: 2,
        },
      },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="w-full py-16 text-center text-gray-500">
        Loading New Arrivals...
      </div>
    );
  }

  if (!newProducts || newProducts.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500">
        No New Arrivals Found.
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <Heading heading="New Arrivals" />

      <Slider {...settings} className="mt-8">
        {newProducts.map((item) => (
          <div key={item._id} className="px-2">
            <div className="overflow-hidden group ">
              <Product
                _id={item._id}
                img={item.img || "/placeholder.png"}
                productName={item.name}
                price={item.price}
                color={item.colors?.join(", ") || "N/A"}
                badge={item.badge === "newArrival"}
                des={item.description}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
