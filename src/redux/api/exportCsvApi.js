import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { backendUrl } from "../../config/env.config";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const axiosBaseQuery = ({baseUrl} = {baseUrl: ''}) => async ({url, method, data, params, responseType}) => {
//   try {
//     const result = await axios({url: baseUrl + url, method, data, params, responseType})
//     return {data: result.data}
//   } catch (axiosError) {
//     let err = axiosError
//     return {
//       error : {
//         status: err.response?.status,
//         data: err.response?.data || err.message
//       }
//     }
//   }
// }

// export const apiModal = createApi({
//   reducerPath: 'modalApi',
//   baseQuery: axiosBaseQuery({baseUrl: backendUrl}),
//   endpoints: (builder) => ({
//     getModal: builder.query({
//       query: (args) => ({
//         url: `/export-transaction/${
//           args.status && args.startDate && args.endDate ? `?status=${args.status}&start_date=${args.startDate}&end_date=${args.endDate}`
//         : args.status ? `?status=${args.status}` : "" } `,
//         method: 'GET',
//         responseType: 'blob'
//       }),
//     }),
//   }),

// })

// export const { useGetModalQuery } = apiModal
// ${
//   args.status && args.startDate && args.endDate ? `?status=${args.status}&start_date=${args.startDate}&end_date=${args.endDate}`
// : args.status ? `?status=${args.status}` : "" }

// export const apiModal = createAsyncThunk("modalApi/getModal", (args) => {
//   const urlCsv = "http://localhost:8081";
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${urlCsv}/export-transaction`)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// });

// export const apiCsv = createApi({
//   reducerPath: "modalApi",
//   baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
//   endpoints: (builder) => ({
//     getExportCsv: builder.query({
//       query: (args) => ({
//         url: `/export-transaction/${
//           args.status && args.startDate && args.endDate
//             ? `?status=${args.status}&start_date=${args.startDate}&end_date=${args.endDate}`
//             : args.status
//             ? `?status=${args.status}`
//             : ""
//         }`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useGetExportCsvQuery } = apiCsv;

export const apiCsv = createAsyncThunk("modalApi/getModal", (args) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${backendUrl}/export-transaction/${
              args.status && args.startDate && args.endDate
                ? `?status=${args.status}&start_date=${args.startDate}&end_date=${args.endDate}`
                : args.status
                ? `?status=${args.status}`
                : ""
            }`, {headers: {"Content-Type": "text/csv"}}
          )
          .then((res) => {
            resolve(res);
            // console.log(`start: ${setting.startDate}, end: ${setting.endDate}, status: ${setting.status}`);
            args.handleData(res)
          })
          .catch((err) => {
            reject(err);
          });
      });
});