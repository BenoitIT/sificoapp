import { NewSite } from "@/interfaces/sites";
import { sifcoApi } from "./axios";
export const deliverySitesEndpoint = "/deliverysites";
export const getAllsites = async () => {
  const response = await sifcoApi.get(deliverySitesEndpoint);
  return response.data.data;
};

export const createNewSite = async (data: NewSite) => {
  const response = await sifcoApi.post(deliverySitesEndpoint, data);
  return response.data.message;
};
export const deleteSite = async (id: number) => {
  const response = await sifcoApi.delete(deliverySitesEndpoint + `/${id}`);
  return response.data.message;
};
