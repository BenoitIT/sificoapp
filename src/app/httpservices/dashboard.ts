import { sifcoApi } from "./axios";
export const dashboardEndpoint = "/dashboardInfo";
export const getDashboardinfo = async () => {
  const response = await sifcoApi.get(dashboardEndpoint);
  return response.data.data;
};
