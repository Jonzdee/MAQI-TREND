import { useDispatch, useSelector } from "react-redux";
import { togglePrice } from "../../../../redux/orebiSlice";
import NavTitle from "./NavTitle";

const Price = () => {
  const dispatch = useDispatch();
  const selectedPrice = useSelector(
    (state) => state.orebiReducer.selectedPrice
  );

  const priceList = [
    { _id: 950, priceOne: 0, priceTwo: 999.99 },
    { _id: 951, priceOne: 1000, priceTwo: 3999.99 },
    { _id: 952, priceOne: 4000, priceTwo: 6999.99 },
    { _id: 953, priceOne: 7000, priceTwo: 8999.99 },
    { _id: 954, priceOne: 9000, priceTwo: 29999.99 },
    { _id: 955, priceOne: 30000, priceTwo: 50000 },
  ];

  const handlePriceSelect = (range) => {
    dispatch(togglePrice(range));
  };

  const formatCurrency = (value) =>
    `₦${value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  return (
    <div className="cursor-pointer bg-white p-4 rounded-lg border border-gray-100">
      <NavTitle title="Shop by Price" icons={false} />

      <ul className="flex flex-col mt-4 gap-3">
        {/* Default option */}
        <li
          onClick={() => handlePriceSelect(null)}
          className={`flex items-center justify-between py-2 transition-all duration-300
            ${
              !selectedPrice
                ? "border-primeColor bg-primeColor/10 text-primeColor font-semibold"
                : "text-gray-600 hover:text-primeColor"
            }
          `}
        >
          <span>All Prices</span>
          {!selectedPrice && (
            <span className="w-2 h-2 rounded-full bg-primeColor"></span>
          )}
        </li>

        {priceList.map((item) => {
          const isActive =
            selectedPrice?.min === item.priceOne &&
            selectedPrice?.max === item.priceTwo;

          return (
            <li
              key={item._id}
              onClick={() =>
                handlePriceSelect({ min: item.priceOne, max: item.priceTwo })
              }
              className={`flex items-center justify-between whitespace-nowrap py-2 transition-all duration-300
                ${
                  isActive
                    ? "border-primeColor bg-primeColor/10 text-primeColor font-semibold"
                    : " text-gray-600 hover:text-primeColor"
                }
              `}
            >
              <span className="whitespace-nowrap">
                {formatCurrency(item.priceOne)} –{" "}
                {formatCurrency(item.priceTwo)}
              </span>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-primeColor"></span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Price;
