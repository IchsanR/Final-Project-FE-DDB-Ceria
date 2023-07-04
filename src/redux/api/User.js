import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../../config/env.config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/create-user",
        method: "POST",
        body,
      }),
    }),
    sendEmailVerification: builder.mutation({
      query: (email) => ({
        url: `/send-email-registration/${email}`,
        method: "POST",
      }),
      transformResponse: (response) => {
        return { code: response.code, data: response.data };
      },
    }),
    compareVerificationCode: builder.mutation({
      query: ({ email, code }) => ({
        url: "/compare-verification-code",
        method: "POST",
        body: { email, code },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useSendEmailVerificationMutation,
  useCompareVerificationCodeMutation,
} = userApi;
