import { sifcoApi } from "./axios";
import { Dependance } from "../../interfaces/deps";
export const dependanceEndpoint = "/dependancies";
export const getDependancies = async () => {
  const response = await sifcoApi.get(dependanceEndpoint);
  return response.data.data;
};

export const updateDepndancies = async (data: Dependance) => {
  const response = await sifcoApi.put(dependanceEndpoint, data);
  return { message: response.data.message, status: response.data.status };
};
