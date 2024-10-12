import { NewSite } from "@/interfaces/sites";
import { sifcoApi } from "./axios";
export const deliverySitesEndpoint = "/deliverysites";
export const getAllsites = async (
  searchValues: string,
  currentPage: number
) => {
  const response = await sifcoApi.get(
    deliverySitesEndpoint + `?search=${searchValues}&page=${currentPage}`
  );
  return response.data.data;
};
export const getAllsitesUnpaginated = async (
) => {
  const response = await sifcoApi.get(
    deliverySitesEndpoint + `/unpaginated`
  );
  return response.data.data;
};

export const createNewSite = async (data: NewSite) => {
  const response = await sifcoApi.post(deliverySitesEndpoint, data);
  return { message: response.data.message, status: response.data.status };
};
export const deleteSite = async (id: number) => {
  const response = await sifcoApi.delete(deliverySitesEndpoint + `/${id}`);
  return response.data.message;
};
export const getSite = async (id: number) => {
  const response = await sifcoApi.get(deliverySitesEndpoint + `/${id}`);
  return response.data.data;
};
export const updateSite = async (id: number, data: NewSite) => {
  const response = await sifcoApi.put(deliverySitesEndpoint + `/${id}`, data);
  return { message: response.data.message, status: response.data.status };
};
