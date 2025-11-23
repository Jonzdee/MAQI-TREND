// sanity/schemas/product.js
export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        { name: "name", title: "Product Name", type: "string" },
        { name: "price", title: "Price", type: "number" },
        { name: "description", title: "Description", type: "text" },
        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
        { name: "category", title: "Category", type: "reference", to: [{ type: "category" }] },
        { name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }] },
        { name: "color", title: "Color", type: "string" },
        { name: "badge", title: "Badge", type: "string" }, // e.g., "New", "Sale"
    ],
};
