import { NewShipper } from "@/interfaces/shipper";
import { sifcoApi } from "./axios";
export const shippersEndpoint = "/shippers";
export const getAllshippers = async (searchValues: string) => {
  const response = await sifcoApi.get(
    shippersEndpoint + `?search=${searchValues}`
  );
  return response.data.data;
};

export const createNewShipper = async (data: NewShipper) => {
  const response = await sifcoApi.post(shippersEndpoint, data);
  return response.data.message;
};
export const deleteShipper = async (id: number) => {
  const response = await sifcoApi.delete(shippersEndpoint + `/${id}`);
  return response.data.message;
};
export const getShipper = async (id: number) => {
  const response = await sifcoApi.get(shippersEndpoint + `/${id}`);
  return response.data.data;
};
export const updateShipper = async (id: number, data: NewShipper) => {
  const response = await sifcoApi.put(shippersEndpoint + `/${id}`, data);
  return response.data.message;
};
