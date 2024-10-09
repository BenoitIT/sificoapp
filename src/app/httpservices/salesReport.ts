import { sifcoApi } from "./axios";
export const reportEndpoint = "/report";
export const getSalesReport = async (startDate: string, endDate: string) => {
  const response = await sifcoApi.get(
    reportEndpoint + `?startDate=${startDate}&endDate=${endDate}`
  );
  return response.data.data;
};
export const getSalesReportFromSingleAgent = async (
  startDate: string,
  endDate: string,
  id: number
) => {
  const response = await sifcoApi.get(
    reportEndpoint + `/${id}?startDate=${startDate}&endDate=${endDate}`
  );
  return response.data.data;
};
