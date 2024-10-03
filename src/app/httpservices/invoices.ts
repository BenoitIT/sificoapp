import { sifcoApi } from "./axios";
export const invoiceEndpoint = "/invoices";
export const getAllinvoices = async () => {
  const response = await sifcoApi.get(invoiceEndpoint);
  return response.data.data;
};

export const getInvoice = async (id: number) => {
  const response = await sifcoApi.get(invoiceEndpoint + "/" + id);
  return response.data.data;
};
