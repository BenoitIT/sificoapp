import { NewSite } from "@/interfaces/sites";
import { sifcoApi } from "./axios";
export const deliverySitesEndpoint = "/deliverysites";
export const getAllsites = async (
  searchValues: string,
  currentPage: number
) => {
  try {
    const response = await sifcoApi.get(
      deliverySitesEndpoint + `?search=${searchValues}&page=${currentPage}`
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAllsitesUnpaginated = async () => {
  try {
    const response = await sifcoApi.get(deliverySitesEndpoint + `/unpaginated`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const createNewSite = async (data: NewSite) => {
  try {
    const response = await sifcoApi.post(deliverySitesEndpoint, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.log(err);
  }
};
export const deleteSite = async (id: number) => {
  try {
    const response = await sifcoApi.delete(deliverySitesEndpoint + `/${id}`);
    return response.data.message;
  } catch (err) {
    console.log(err);
  }
};
export const getSite = async (id: number) => {
  try {
    const response = await sifcoApi.get(deliverySitesEndpoint + `/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateSite = async (id: number, data: NewSite) => {
  try {
    const response = await sifcoApi.put(deliverySitesEndpoint + `/${id}`, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.log(err);
  }
};
