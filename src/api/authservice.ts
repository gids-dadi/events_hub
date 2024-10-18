// "use client";

// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// let accessToken: string | null = null;

// export const setToken = (token: string) => {
//   accessToken = token;
// };

// export const getToken = () => accessToken;

// export const loginUser = async (email: string, password: string) => {
//   const response = await axios.post(
//     `${API_URL}/auth`,
//     { email, password },
//     { withCredentials: true }
//   );
//   setToken(response.data.accessToken);
//   return response.data;
// };

// export const refresh = async () => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/auth/refresh`,
//       {},
//       { withCredentials: true }
//     );
//     setToken(response.data.accessToken);
//     return response.data.accessToken;
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     throw error;
//   }
// };

// export const logout = () => {
//   accessToken = null;
//   // You might want to call a logout endpoint here if your backend requires it
// };

"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/auth`,
    { email, password },
    { withCredentials: true }
  );
  setToken(response.data.accessToken);
  return response.data;
};

export const refresh = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );
    setToken(response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
  // You might want to call a logout endpoint here if your backend requires it
};
