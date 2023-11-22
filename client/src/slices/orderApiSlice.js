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
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
