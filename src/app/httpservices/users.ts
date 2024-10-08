import { NewStaff, passwordUpdate } from "@/interfaces/staff";
import { sifcoApi, usersBaseEndpoint } from "./axios";
export const getAllUsers = async (searchValues: string) => {
  const response = await sifcoApi.get(
    usersBaseEndpoint + `?search=${searchValues}`
  );
  return response.data.data;
};
export const addNewUser = async (data: NewStaff) => {
  const response = await sifcoApi.post(usersBaseEndpoint, data);
  return { message: response.data.message, status: response.data.status };
};
export const deleteUser = async (id: number) => {
  const response = await sifcoApi.delete(usersBaseEndpoint + `/${id}`);
  return response.data.message;
};
export const getUser = async (id: number) => {
  const response = await sifcoApi.get(usersBaseEndpoint + `/${id}`);
  return response.data.data;
};
export const updateUser = async (id: number, data: NewStaff) => {
  const response = await sifcoApi.put(usersBaseEndpoint + `/${id}`, data);
  return { message: response.data.message, status: response.data.status };
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
  const response = await sifcoApi.post(
    usersBaseEndpoint + `/resetlink/newpassword`,
    {
      token,
      password,
    }
  );
  return { message: response.data.message, status: response.data.status };
};

export const getAllAgents = async () => {
  const response = await sifcoApi.get(usersBaseEndpoint + `/agents`);
  return response.data.data;
};

export const updatePassword = async (data: passwordUpdate) => {
  const response = await sifcoApi.put(
    usersBaseEndpoint + `/resetlink/newpassword`,
    data
  );
  return { message: response.data.message, status: response.data.status };
};
