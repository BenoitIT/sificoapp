import { sifcoApi } from "./axios";
export const invoiceEndpoint = "/invoices";
export const getAllinvoices = async (
  searchValues: string,
  currentPage: number
) => {
  const response = await sifcoApi.get(
    invoiceEndpoint + `?search=${searchValues}&page=${currentPage}`
  );
  return response.data.data;
};
export const getAllinvoicesByLocation = async (
  searchValues: string,
  currentPage: number,
  id: number
) => {
  const response = await sifcoApi.get(
    invoiceEndpoint +
      `/location/${id}?search=${searchValues}&page=${currentPage}`
  );
  return response.data.data;
};
export const getInvoice = async (id: number) => {
  const response = await sifcoApi.get(invoiceEndpoint + "/" + id);
  return response.data.data;
};
export const updateInvoice = async (id: number) => {
  const response = await sifcoApi.put(invoiceEndpoint + "/" + id);
  return { message: response.data.message, status: response.data.status };
};
