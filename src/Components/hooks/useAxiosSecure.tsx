'use client';

import axios from "axios";
import { useRouter } from "next/navigation";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://fitness-tracker-server-ruddy.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const router = useRouter();
  // TODO: Add authentication later
  const logout = () => {};
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // interceptors 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logout();
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;


