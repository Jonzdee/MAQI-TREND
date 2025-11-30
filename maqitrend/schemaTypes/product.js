export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        { name: "name", title: "Product Name", type: "string" },
        { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },

        { name: "price", title: "Price", type: "number" },
        { name: "description", title: "Description", type: "text" },

        {
            name: "image",
            title: "Main Image",
            type: "image",
            options: { hotspot: true },
        },

        {
            name: "images",
            title: "Product Images",
            type: "array",
            of: [{ type: "image" }],
        },

        {
            name: "sizes",
            title: "Available Sizes",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
            },
        },

        {
            name: "colors",
            title: "Available Colors",
            type: "array",
            of: [{ type: "string" }],
        },

        { name: "material", title: "Material", type: "string" },
        {
            name: "fit",
            title: "Fit Type",
            type: "string",
            options: {
                list: [
                    { title: "Slim Fit", value: "slim" },
                    { title: "Regular Fit", value: "regular" },
                    { title: "Oversized", value: "oversized" },
                    { title: "Relaxed Fit", value: "relaxed" },
                ],
            },
        },

        { name: "stock", title: "Stock Quantity", type: "number" },
        { name: "sku", title: "SKU / Product Code", type: "string" },

        { name: "category", title: "Category", type: "reference", to: [{ type: "category" }] },
        { name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }] },

        {
            name: "badge",
            title: "Badge",
            type: "string",
            options: {
                list: [
                    { title: "New Arrival", value: "newArrival" }, 
                    { title: "Sale", value: "sale" },
                    { title: "Trending", value: "trending" },
                    { title: "Best Seller", value: "bestseller" },
                ],
            },
        },
    ],
};
