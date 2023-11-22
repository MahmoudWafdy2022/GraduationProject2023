import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Add your logic to get the user token from the Redux state
      // Replace 'user.token.access' with the correct path to your token
      if (getState().auth.userInfo) {
        const user = getState().auth.userInfo;
        const token = user.token;
        if (user && endpoint !== "refresh") {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      }
    },
    credentials: "include", // This allows the server to set cookies
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
});
