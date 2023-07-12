import axios from "axios";
import { backendUrl } from "../../config/env.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk('loginUser', ({ form }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${backendUrl}/login`, form)
      .then((response) => {
        // handleSuccess(response);
        resolve(response);
      })
      .catch((error) => {
        // handleError(error);
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


export const compareVerificationCode = createAsyncThunk("compareVerificationCode", ({ email, code }) => {
  return new Promise((resolve, reject) => {
    axios.post(`${backendUrl}/compare-verification-code`, { email, code })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

export const sendEmailForgotPassword = createAsyncThunk('sendEmailForgotPassword', ({ email }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${backendUrl}/send-email/${email}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

export const updatePassword = createAsyncThunk('updatePassword', ({ code, id, form }) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${backendUrl}/edit-password/${code}?id=${id}`, form)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
});