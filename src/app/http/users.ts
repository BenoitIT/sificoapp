import { NewStaff } from "@/interfaces/staff";
import { sifcoApi, usersBaseEndpoint } from "./axios";
export const getAllUsers = async () => {
  const response = await sifcoApi.get(usersBaseEndpoint);
  return response.data.data;
};
export const addNewUser = async (data: NewStaff) => {
  const response = await sifcoApi.post(usersBaseEndpoint, data);
  return response.data.message;
};
export const deleteUser = async (id: number) => {
  const response = await sifcoApi.delete(usersBaseEndpoint + `/${id}`);
  return response.data.message;
};
export const sendPasswordResetLink = async ({ email }: { email: string }) => {
  const response = await sifcoApi.post(usersBaseEndpoint + `/resetlink`, {
    email,
  });
  return response.data.message;
};
export const setNewPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const response = await sifcoApi.post(usersBaseEndpoint + `/resetlink/newpassword`, {
    token,
    password,
  });
  return response.data.message;
};
