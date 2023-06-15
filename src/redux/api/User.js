import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendUrl } from '../../config/env.config';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body: body,
      })
    })
  })
});

export const { useLoginUserMutation } = userApi;