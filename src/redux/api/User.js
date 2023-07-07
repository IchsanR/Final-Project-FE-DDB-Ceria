import axios from "axios";
import { backendUrl } from "../../config/env.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const loginUser = createAsyncThunk('loginUser', ({ form, handleSuccess, handleError }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${backendUrl}/login`, form)
      .then((response) => {
        handleSuccess(response);
        resolve(response);
      })
      .catch((error) => {
        handleError();
        reject(error);
      });
  });
});

export const registerUser = createAsyncThunk('registerUser', ({ form }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${backendUrl}/create-user`, form)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

export const sendEmailVerification = createAsyncThunk('sendEmailVerification', ({ email, handleSuccess }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${backendUrl}/send-email-registration/${email}`)
      .then((response) => {
        resolve(response);
        handleSuccess(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

export const compareVerificationCode = createAsyncThunk(
  "compareVerificationCode",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/compare-verification-code`,
        { email, code }
      );

      return response.data; // Mengembalikan respons dari server
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendEmailForgotPassword = createAsyncThunk('sendEmailForgotPassword', ({ email, handleSuccess }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${backendUrl}/send-email/${email}`)
      .then((response) => {
        resolve(response);
        handleSuccess(response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Internal Server Error",
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
        });
        reject(error);
      });
  });
});
