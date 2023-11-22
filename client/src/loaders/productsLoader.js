import { defer } from "react-router-dom";
export default async function productsLoader() {
  // products
  try {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) {
      throw {
        message: "Failed to fetch products",
        statusText: res.statusText,
        status: res.status,
      };
    }
    const obj = await res.json();
    const { data } = obj;
    const products = data.products;
    return defer({ products });
  } catch (err) {
    return {
      message: err.message,
      statusText: err.statusText,
      status: err.status,
    };
  }
}
