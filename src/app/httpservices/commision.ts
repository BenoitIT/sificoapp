import { sifcoApi } from "./axios";
export const commisionsEndpoint = "/commissions";
export const getAllCommissions = async (
  searchValues?: string,
) => {
  const response = await sifcoApi.get(
    commisionsEndpoint +
      `?&search=${searchValues}`
  );
  return response.data.data;
};
export const updateCommisionInfo = async (
  id: number,
  data: { amountPaid: number; paidBy: string }
) => {
  const response = await sifcoApi.put(commisionsEndpoint + `/${id}`, data);
  return { message: response.data.message, status: response.data.status };
};
