export default async function productDetailsLoader({ params }) {
  const url = `http://localhost:3001/products/${params.id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch product",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const obj = await res.json();
  const { data } = obj;
  const product = data.product;
  return product;
}
