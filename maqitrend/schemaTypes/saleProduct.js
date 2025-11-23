// sanity/schemas/saleProduct.js
export default {
    name: "saleProduct",
    title: "Sale Product",
    type: "document",
    fields: [
        { name: "productName", title: "Product Name", type: "string" },
        { name: "price", title: "Price", type: "number" },
        { name: "img", title: "Image", type: "image", options: { hotspot: true } },
    ],
};
