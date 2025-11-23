// sanity/schemas/brand.js
export default {
    name: "brand",
    title: "Brand",
    type: "document",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    ],
};
