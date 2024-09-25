import { sifcoApi } from "./axios";
export const deliverySitesEndpoint = "/deliverysites";
export const getAllsites = async () => {
  const response = await sifcoApi.get(deliverySitesEndpoint);
  return response.data.data;
};
