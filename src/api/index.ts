// "use client";
// import axios from "axios";
// import { getToken, refresh, logout } from "./authservice";

// export const event_hub_axios_server = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// event_hub_axios_server.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     console.log(token, "tokennnnnnnn");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// event_hub_axios_server.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newToken = await refresh();
//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//         return event_hub_axios_server(originalRequest);
//       } catch (refreshError) {
//         logout();
//         // Redirect to login page or show a modal
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

"use client";

import axios from "axios";
import { getToken, refresh, logout } from "./authservice";

export const event_hub_axios_server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

event_hub_axios_server.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(token, "tokennnnnnnn");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

event_hub_axios_server.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refresh();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return event_hub_axios_server(originalRequest);
      } catch (refreshError) {
        logout();
        // Redirect to login page or show a modal
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
