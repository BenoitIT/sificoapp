import axios from "axios";
import { getSession } from "next-auth/react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const sifcoApi = axios.create({
  baseURL: `${apiUrl}/api`,

});
sifcoApi.interceptors.request.use(
  async (config) => {
    const session:any = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

sifcoApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const usersBaseEndpoint = "/users";
