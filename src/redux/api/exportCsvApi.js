import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendUrl } from '../../config/env.config';

export const apiModal = createApi({
  reducerPath: 'modalApi',
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl, prepareHeaders:(headers) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if(token) {
      headers.set('cookie', `gin_cookie=${token}`)
    }

    return headers
  } }),
  endpoints: (builder) => ({
    getModal: builder.query({
      query: (args) => ({
        url: `/api/export-transaction/${
          args.status && args.startDate && args.endDate ? `?status=${args.status}&start_date=${args.startDate}&end_date=${args.endDate}`
        : args.status ? `?status=${args.status}` : "" } `,
        method: 'GET',
      }),
    }),
  }),

})

export const { useGetModalQuery } = apiModal