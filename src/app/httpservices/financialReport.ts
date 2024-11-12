import { sifcoApi } from "./axios";
export const financialReportEndpoint = "/financialreport";
export const getFinancialReport = async (
  searchValues?: string,
  currentPage?: number,
  startDate?: string,
  endDate?: string
) => {
  try {
    const response = await sifcoApi.get(
      financialReportEndpoint +
        `?search=${searchValues}&page=${currentPage}&startDate=${startDate}&endDate=${endDate}`
    );
    return { data: response.data.data, count: response.data.count };
  } catch (err) {
    console.log(err);
  }
};
export const getFinancialReportchart = async () => {
  try {
    const response = await sifcoApi.get(financialReportEndpoint + `/chart`);
    return { chart: response.data?.chart };
  } catch (err) {
    console.log(err);
  }
};
