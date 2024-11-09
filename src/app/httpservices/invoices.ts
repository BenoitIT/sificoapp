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
  try {
    const response = await sifcoApi.get(
      invoiceEndpoint +
        `/location/${id}?search=${searchValues}&page=${currentPage}`
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getInvoice = async (id: number) => {
  try {
    const response = await sifcoApi.get(invoiceEndpoint + "/" + id);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateInvoice = async (id: number) => {
  try {
    const response = await sifcoApi.put(invoiceEndpoint + "/" + id);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.log(err);
  }
};
