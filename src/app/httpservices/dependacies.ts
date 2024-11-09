import { sifcoApi } from "./axios";
import { Dependance } from "../../interfaces/deps";
export const dependanceEndpoint = "/dependancies";
export const getDependancies = async () => {
  try {
    const response = await sifcoApi.get(dependanceEndpoint);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateDepndancies = async (data: Dependance) => {
  try {
    const response = await sifcoApi.put(dependanceEndpoint, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.log(err);
  }
};
