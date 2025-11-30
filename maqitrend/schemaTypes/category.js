export default {
    name: "category",
    title: "Category",
    type: "document",
    to: [{ type: "category" }],
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
        {
            name: "icon",
            title: "Icon",
            type: "string",
            description: "Optional icon name",
            initialValue: "none",
        }
    ],
};
