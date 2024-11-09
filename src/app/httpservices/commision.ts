import { sifcoApi } from "./axios";
export const commisionsEndpoint = "/commissions";
export const getAllCommissions = async (
  searchValues?: string,
  page?:number
) => {
  const response = await sifcoApi.get(
    commisionsEndpoint +
      `?page=${page}&search=${searchValues}`
  );
  return {data:response.data.data,count:response.data.count};
};
export const updateCommisionInfo = async (
  id: number,
  data: { amountPaid: number; paidBy: string }
) => {
  const response = await sifcoApi.put(commisionsEndpoint + `/${id}`, data);
  return { message: response.data.message, status: response.data.status };
};
