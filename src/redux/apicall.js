// src/app/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://fakestoreapi.com",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
  responseHandler: async (response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { error: text }
    }
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProductsById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetProductsQuery,
  useGetProductsByIdQuery,
} = apiSlice;
