import { sifcoApi } from "./axios";
export const containersPyamentEndpoint = "/containerspayments";
export const getAllContainerPaymentPerPlace = async (
  searchValues: string,
  search: string,
  page: number
) => {
  const response = await sifcoApi.get(
    containersPyamentEndpoint +
      `?code=${searchValues}&search=${search}&page=${page}`
  );
  return { data: response.data.data, count: response.data.count };
};
