import { sifcoApi } from "./axios";
export const dashboardEndpoint = "/dashboardInfo";
export const getDashboardinfo = async (startDate: string, endDate: string) => {
  try {
    const response = await sifcoApi.get(
      dashboardEndpoint + `?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
