import { apiSlice } from "./apiSlice";
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order, token) => ({
        url: "http://localhost:3001/orders",
        method: "POST",
        body: { ...order },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id, token) => ({
        url: `http://localhost:3001/orders/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ id, details }) => ({
        url: `http://localhost:3001/orders/${id}/pay`,
        method: "POST",
        body: details,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: "http://localhost:3001/config/paypal",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: "http://localhost:3001/orders",
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "http://localhost:3001/orders/myorders",
      }),
      keepUnusedDataFor: 5,
    }),
    getMyData: builder.query({
      query: () => ({
        url: "http://localhost:3001/orders/mydata",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (id, token) => ({
        url: `http://localhost:3001/orders/${id}/deliver`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSellerProfit: builder.query({
      query: (id, token) => ({
        url: `http://localhost:3001/seller-profits/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetMyDataQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useGetSellerProfitQuery,
} = orderApiSlice;
