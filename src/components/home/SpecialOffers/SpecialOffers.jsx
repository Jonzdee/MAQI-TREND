import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { client } from "../../../sanityClient";
import { useParams } from "react-router-dom";

const SpecialOffers = () => {
  const { category } = useParams();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Fetch products from Sanity with the "specialOffer" badge and optional category filter
        const query = `
          *[_type == "product" && badge == "specialOffer" ${
            category ? `&& category->slug.current == "${category}"` : ""
          }]{
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
        setOffers(data);
        setLoading(false);
      } catch (err) {
        console.error("Sanity Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchOffers();
  }, [category]);

  if (loading) {
    return (
      <div className="w-full py-16 text-center text-gray-500">
        Loading Special Offers...
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500">
        No Special Offers Found.
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 mt-8">
        {offers.map((item) => (
          <div
            key={item._id}
            className="group transition-transform duration-300 hover:scale-105"
          >
            <Product
              _id={item._id}
              img={item.img || "/placeholder.png"}
              productName={item.name}
              price={item.price}
              color={item.colors?.join(", ") || "N/A"}
              badge={item.badge === "specialOffer"}
              des={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
