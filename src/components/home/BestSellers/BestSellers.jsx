import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { client } from "../../../sanityClient";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const query = `
          *[_type == "product" && badge == "bestseller"]{
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
        setBestSellers(data);
        setLoading(false);
      } catch (err) {
        console.error("Sanity Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const settings = {
    infinite: bestSellers.length > 1,
    speed: 500,
    slidesToShow: Math.min(bestSellers.length, 4),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: { slidesToShow: Math.min(bestSellers.length, 3) },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: Math.min(bestSellers.length, 2),
          slidesToScroll: 2,
        },
      },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="w-full py-16 text-center text-gray-500">
        Loading Bestsellers...
      </div>
    );
  }

  if (!bestSellers || bestSellers.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500">
        No Bestsellers Found.
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <Heading heading="Our Bestsellers" />

      <Slider {...settings} className="mt-8">
        {bestSellers.map((item) => (
          <div key={item._id} className="px-2">
            <div className="overflow-hidden group">
              <Product
                _id={item._id}
                img={item.img || "/placeholder.png"}
                productName={item.name}
                price={item.price}
                color={item.colors?.join(", ") || "N/A"}
                badge={item.badge === "bestseller"}
                des={item.description}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellers;
