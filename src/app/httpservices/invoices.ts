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

export const getInvoice = async (id: number) => {
  const response = await sifcoApi.get(invoiceEndpoint + "/" + id);
  return response.data.data;
};
