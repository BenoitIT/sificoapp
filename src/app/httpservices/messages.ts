import { sifcoApi } from "./axios";
import { ContactInfo } from "@/interfaces/contactForm";
export const messageEndpoint = "/messages";
export const getAllMessage = async () => {
  const response = await sifcoApi.get(messageEndpoint);
  return response.data.data;
};

export const createNewMessage = async (data: ContactInfo) => {
  const response = await sifcoApi.post(messageEndpoint, data);
  return { message: response.data.message, status: 201 };
};
export const deleteMessage = async (id: number) => {
  const response = await sifcoApi.delete(messageEndpoint + `/${id}`);
  return response.data.message;
};
export const getMessage = async (id: number) => {
  const response = await sifcoApi.get(messageEndpoint + `/${id}`);
  return response.data.data;
};
export const updateMessage = async (id: number, data: { message: string }) => {
  try {
    const response = await sifcoApi.put(messageEndpoint + `/${id}`, data);
    return { message: response.data.message, status: response.data.status };
  } catch (err) {
    console.log(err);
  }
};
