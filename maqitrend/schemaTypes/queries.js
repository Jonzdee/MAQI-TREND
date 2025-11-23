export const onSaleQuery = `
  *[_type == "saleProduct"]{
    _id,
    productName,
    price,
    "img": img.asset->url
  }
`;
