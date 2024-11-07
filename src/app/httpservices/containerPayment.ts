import { sifcoApi } from "./axios";
export const containersPyamentEndpoint = "/containerspayments";
export const getAllContainerPaymentPerPlace = async (
  searchValues: string,
  search: string,
) => {
  const response = await sifcoApi.get(
    containersPyamentEndpoint +
      `?code=${searchValues}&search=${search}`
  );
  return response.data.data;
};
