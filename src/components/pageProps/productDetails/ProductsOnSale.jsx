import  { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import { onSaleQuery } from "../../lib/queries";

const ProductsOnSale = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    client.fetch(onSaleQuery).then((data) => setItems(data));
  }, []);

  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
          >
            <div>
              <img className="w-24" src={item.img} alt={item.productName} />
            </div>
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium">{item.productName}</p>
              <p className="text-sm font-semibold">₦{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
