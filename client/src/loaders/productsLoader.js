import { defer } from "react-router-dom";
export default async function productsLoader({ params, request }) {
  // products
  try {
    const pageNumber = params.pageNumber;
    const keyword = params.keyword;
    const u = new URL(request.url);
    const sort = u.searchParams.get("sort");
    let brand = u.searchParams.get("brand");
    // const searchParams = new URLSearchParams(document.location.search);

    // Get all query parameters as an object

    brand = brand ? brand[0].toUpperCase() + brand.slice(1) : "";

    console.log(params);
    const limit = 6; // Set the same limit as in the backend
    const baseURL = `http://localhost:3001/products?pageNumber=${pageNumber}&limit=${limit}`;
    const queryParams = [];

    if (keyword) queryParams.push(`keyword=${keyword}`);
    if (sort) queryParams.push(`sort=${sort}`);
    if (brand) queryParams.push(`brand=${brand}`);

    const url = `${baseURL}${
      queryParams.length > 0 ? `&${queryParams.join("&")}` : ""
    }`;

    console.log(url);
    const res = await fetch(url);

    if (!res.ok) {
      throw {
        message: "Failed to fetch products",
        statusText: res.statusText,
        status: res.status,
      };
    }
    const obj = await res.json();
    console.log(obj);
    const { data } = obj;

    const products = data.products;
    return defer({
      products,
      pageInfo: {
        page: obj.page,
        pages: obj.pages,
        numOfProducts: obj.numOfProducts,
      },
    });
  } catch (err) {
    return {
      message: err.message,
      statusText: err.statusText,
      status: err.status,
    };
  }
}
