import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { client } from "../../../sanityClient";
import ProductBanner from "./ProductBanner";

function Items({ currentItems, gridViewActive }) {
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const selectedColors = useSelector(
    (state) => state.orebiReducer.checkedColors
  );
const selectedPrice = useSelector((state) => state.orebiReducer.selectedPrice);
  const filteredItems = currentItems.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some(
        (brand) =>
          brand?.slug?.current &&
          item.brand?.slug?.current === brand.slug.current
      );

  const isCategorySelected =
    selectedCategories.length === 0 ||
    selectedCategories.some(
      (categorySlug) => categorySlug === item.category.slug.current
    );
const isPriceSelected =
  !selectedPrice ||
  (item.price >= selectedPrice.min && item.price <= selectedPrice.max);

    const isColorSelected =
      selectedColors.length === 0 ||
      item.colors?.some((c) =>
        selectedColors.some((sc) => sc.toLowerCase() === c.toLowerCase())
      );
    return (
      isBrandSelected &&
      isCategorySelected &&
      isColorSelected &&
      isPriceSelected
    );
  });

  return (
    <>
      {filteredItems.map((item) => (
        <div
          key={item._id}
          className={gridViewActive ? "w-full" : "w-full flex gap-4"}
        >
          <Product
            _id={item._id}
            img={item.img}
            productName={item.name}
            price={item.price}
            badge={item.badge}
            des={item.description}
            isListView={!gridViewActive}
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [gridViewActive, setGridViewActive] = useState(true);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);

  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );

  // Fetch products
  useEffect(() => {
    const query = `*[_type == "product"]{
    _id,
    name,
    colors,
    price,
    description,
    "img": image.asset->url,
    category->{title, slug},
    brand->{title, slug} 
  }`;
    client.fetch(query).then((data) => setItems(data));
  }, []);


  const endOffset = itemOffset + currentItemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / currentItemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * currentItemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  const handleItemsPerPageChange = (value) => {
    setCurrentItemsPerPage(value);
    setItemOffset(0);
    setItemStart(1);
  };

  return (
    <div>
      {/* Product Banner */}
      <ProductBanner
        itemsPerPageFromBanner={handleItemsPerPageChange}
        gridViewActive={gridViewActive}
        setGridViewActive={setGridViewActive}
      />

      {/* Products */}
      <div
        className={
          gridViewActive
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10"
            : "flex flex-col gap-6"
        }
      >
        <Items
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          gridViewActive={gridViewActive}
        />
      </div>

     
      {/* Pagination to next or back products  */}
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center gap-6 py-10">
        <ReactPaginate
          nextLabel="Next"
          previousLabel="Prev"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          containerClassName="flex items-center gap-3 text-base font-semibold font-titleFont"
          pageClassName="list-none"
          pageLinkClassName="w-10 h-10 flex justify-center items-center border border-gray-300 rounded hover:border-gray-500 duration-300"
          activeClassName="bg-black text-white border-black"
          previousLinkClassName="px-4 py-2 border border-gray-300 rounded hover:border-gray-500 duration-300"
          nextLinkClassName="px-4 py-2 border border-gray-300 rounded hover:border-gray-500 duration-300"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
