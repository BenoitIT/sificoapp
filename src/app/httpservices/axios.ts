import axios from "axios";

export const sifcoApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const usersBaseEndpoint = "/users";
