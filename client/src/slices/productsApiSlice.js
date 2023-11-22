import { apiSlice } from "./apiSlice";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder, token) => ({
    getProducts: builder.query({
      query: () => ({
        url: "http://localhost:3001/products",
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId, token) => ({
        url: `http://localhost:3001/products/${productId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
