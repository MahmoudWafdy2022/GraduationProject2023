import { defer } from "react-router-dom";
export default async function productsLoader({ params, request }) {
  // products
  try {
    const pageNumber = params.pageNumber;
    const keyword = params.keyword;
    const u = new URL(request.url);
    const searchTerm = u.searchParams.get("sort");
    console.log(searchTerm);
    const limit = 6; // Set the same limit as in the backend
    const url = keyword
      ? `http://localhost:3001/products?pageNumber=${pageNumber}&limit=${limit}&keyword=${keyword}&sort=${searchTerm}`
      : `http://localhost:3001/products?pageNumber=${pageNumber}&limit=${limit}&sort=${searchTerm}`;
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
