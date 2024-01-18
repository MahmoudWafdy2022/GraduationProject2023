import { apiSlice } from "./apiSlice";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder, token) => ({
    getProducts: builder.query({
      query: () => ({
        url: "http://localhost:3001/products/all",
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsPaginate: builder.query({
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
    createProduct: builder.mutation({
      query: () => ({
        url: `http://localhost:3001/products`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `http://localhost:3001/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `http://localhost:3001/products/${id}`,
        method: "DELETE",
      }),
    }),
    getSellerProducts: builder.query({
      query: () => ({
        url: `http://localhost:3001/products/seller/all`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getSellerAcceptedProducts: builder.query({
      query: (id) => ({
        url: `http://localhost:3001/products/seller/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getSellerPendingProducts: builder.query({
      query: (id) => ({
        url: `http://localhost:3001/products/seller/pending/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `http://localhost:3001/uploads`,
        method: "POST",
        body: data,
      }),
    }),
    getBrands: builder.query({
      query: () => ({
        url: "http://localhost:3001/brands", // Adjust the URL accordingly
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getBrandDetails: builder.query({
      query: (brandId) => ({
        url: `http://localhost:3001/brands/${brandId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getCategory: builder.query({
      query: () => ({
        url: "http://localhost:3001/categories", // Adjust the URL accordingly
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `http://localhost:3001/categories/${categoryId}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsPaginateQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetSellerAcceptedProductsQuery,
  useGetSellerPendingProductsQuery,
  useGetSellerProductsQuery,
  useUploadProductImageMutation,
  useGetBrandsQuery,
  useGetBrandDetailsQuery,
  useGetCategoryQuery,
  useGetCategoryDetailsQuery,
} = productsApiSlice;
