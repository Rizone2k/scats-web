import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

// Call API movie
export const axiosMovie = axios.create({
  method: "GET",
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // paramsSerializer: (params) => queryString.stringify({ ...params }),
});

// axiosMovie.interceptors.request.use(async (config) => {
//   config.headers["Access-Control-Allow-Origin"] = "*";
//   config.headers["Access-Control-Allow-Methods"] =
//     "GET, PUT, DELETE, PATCH, OPTIONS";
//   config.headers["Content-Type"] = "multipart/form-data";
//   return  config
// });

// Interceptors response

axiosMovie.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

// Call API detail movie
export const axiosDetailMovie = axios.create({
  baseURL: apiConfig.detailUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // paramsSerializer: (params) => queryString.stringify({ ...params }),
});

axiosDetailMovie.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);
