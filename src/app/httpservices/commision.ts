import { sifcoApi } from "./axios";
export const commisionsEndpoint = "/commissions";
export const getAllCommissions = async (
  searchValues?: string,
  page?: number
) => {
  try {
    const response = await sifcoApi.get(
      commisionsEndpoint + `?page=${page}&search=${searchValues}`
    );
    return { data: response.data.data, count: response.data.count };
  } catch (err) {
    console.log(err);
  }
};
export const updateCommisionInfo = async (
  id: number,
  data: { amountPaid: number; paidBy: string }
) => {
  try {
    const response = await sifcoApi.put(commisionsEndpoint + `/${id}`, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.log(err);
  }
};
