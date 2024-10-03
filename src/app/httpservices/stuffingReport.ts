import { NewStuffingItem } from "@/interfaces/stuffingItem";
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
export const getStuffingReportsItems = async (id: number) => {
  const response = await sifcoApi.get(stuffingReportEndpoint + `/${id}`);
  return response.data.data;
};
export const getStuffingReportsItemsDetail = async (id: number,itmId:number) => {
  const response = await sifcoApi.get(stuffingReportEndpoint + `/${id}/detail/${itmId}`);
  return response.data.data;
};
export const addStuffingReportsItems = async (
  id: number,
  data: NewStuffingItem
) => {
  const response = await sifcoApi.post(stuffingReportEndpoint + `/${id}`, data);
  return response.data.message;
};

export const getStuffingReportsItemsInvoice = async (
  Itemsid: number,
  invoiceId: number
) => {
  const response = await sifcoApi.get(
    stuffingReportEndpoint + `/${Itemsid}/invoice/${invoiceId}`
  );
  return response.data.data;
};
export const generateInvoice = async (
  Itemsid: number,
  invoiceId: number,
  data: { vat: number; totalAmountInWords: string; detailsId: string }
) => {
  const response = await sifcoApi.post(
    stuffingReportEndpoint + `/${Itemsid}/invoice/${invoiceId}`,
    data
  );
  return response.data.message;
};
