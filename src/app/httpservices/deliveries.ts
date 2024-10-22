import { NewSite } from "@/interfaces/sites";
import { sifcoApi } from "./axios";
export const deliveryEndpoint = "/deliveries";
export const getAlldeliveries = async (
  searchValues: string,
  currentPage: number
) => {
  const response = await sifcoApi.get(
    deliveryEndpoint + `?search=${searchValues}&page=${currentPage}`
  );
  return response.data.data;
};
export const getAllDeliveriesUnpaginated = async () => {
  const response = await sifcoApi.get(deliveryEndpoint + `/unpaginated`);
  return response.data.data;
};
export const getDelivery = async (id: number) => {
  const response = await sifcoApi.get(deliveryEndpoint + `/${id}`);
  return response.data.data;
};
export const createNewDelivery = async (data: NewSite) => {
  const response = await sifcoApi.post(deliveryEndpoint, data);
  return { message: response.data.message, status: response.data.status };
};
export const deleteDelivery = async (id: number) => {
  const response = await sifcoApi.delete(deliveryEndpoint + `/${id}`);
  return response.data.message;
};
export const updateDelivery = async (id: number, data: NewSite) => {
  const response = await sifcoApi.put(deliveryEndpoint + `/${id}`, data);
  return { message: response.data.message, status: response.data.status };
};
