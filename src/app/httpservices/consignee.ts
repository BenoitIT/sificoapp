import { NewShipper } from "@/interfaces/shipper";
import { sifcoApi } from "./axios";
export const consigneesEndpoint = "/consignees";
export const getAllconsignees = async (
  searchValues: string,
  currentPage: number
) => {
  const response = await sifcoApi.get(
    consigneesEndpoint + `?search=${searchValues}&page=${currentPage}`
  );
  return response.data.data;
};

export const createNewConsignee = async (data: NewShipper) => {
  const response = await sifcoApi.post(consigneesEndpoint, data);
  return { message: response.data.message, status: response.data.status };
};
export const deleteConsignee = async (id: number) => {
  const response = await sifcoApi.delete(consigneesEndpoint + `/${id}`);
  return response.data.message;
};
export const getConsignee = async (id: number) => {
  const response = await sifcoApi.get(consigneesEndpoint + `/${id}`);
  return response.data.data;
};
export const updateShipper = async (id: number, data: NewShipper) => {
  const response = await sifcoApi.put(consigneesEndpoint + `/${id}`, data);
  return { message: response.data.message, status: response.data.status };
};
