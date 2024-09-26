import { sifcoApi } from "./axios";
import { StuffingReport } from "@/interfaces/stuffingreport";
export const stuffingReportEndpoint = "/stuffingreports";
export const getAllStuffingReports = async () => {
  const response = await sifcoApi.get(stuffingReportEndpoint);
  return response.data.data;
};
export const createStuffingReports = async (data: StuffingReport) => {
  const response = await sifcoApi.post(stuffingReportEndpoint, data);
  return response.data.message;
};
export const deleteStuffingReports = async (id: number) => {
  const response = await sifcoApi.delete(stuffingReportEndpoint + `/${id}`);
  return response.data.message;
};
