import { axiosInstance } from "./+instance";

export interface User {
  name: string;
  id: string;
  createdAt: string;
}

interface UserCredentials {
  name: string;
  password: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const data = await axiosInstance.get("/users");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (user: UserCredentials) => {
  try {
    const data = await axiosInstance.post("/users/login", user);
    return data;
  } catch (error) {
    throw error;
  }
};
