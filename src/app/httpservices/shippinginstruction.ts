import { instruction } from "@/interfaces/instruction";
import { sifcoApi } from "./axios";
export const shippinginstructionEndpoint = "/shippinginstruction";
export const getAllshippinginstructions = async (
  searchValue?: string,
  pageNum?: number
) => {
  try {
    const response = await sifcoApi.get(
      shippinginstructionEndpoint + `?search=${searchValue}&page=${pageNum}`
    );
    return { data: response.data.data, count: response.data.count };
  } catch (err) {
    console.log(err);
  }
};
export const getSingleShippinginstruction = async (id: number) => {
  try {
    const response = await sifcoApi.get(`${shippinginstructionEndpoint}/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getShippinginstructioninLocation = async (id: number,searchValue:string,pageNum?: number) => {
  try {
    const response = await sifcoApi.get(
      `${shippinginstructionEndpoint}/location/${id}?search=${searchValue}&page=${pageNum}`
    );
    return {data: response.data.data, count: response.data.count };
  } catch (err) {
    console.log(err);
  }
};
export const updateShippinginstruction = async (
  id: number,
  data: instruction
) => {
  try {
    const response = await sifcoApi.put(
      `${shippinginstructionEndpoint}/${id}`,
      data
    );
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.log(err);
  }
};
