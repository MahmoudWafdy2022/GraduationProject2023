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
      query: (id) => ({
        url: `http://localhost:3001/orders/${id}`,
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
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetOrdersQuery,
} = orderApiSlice;
