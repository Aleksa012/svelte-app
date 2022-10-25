import axios from "axios";
import { PUBLIC_BASE_URL } from "$env/static/public";
import type { User } from "./+users";

export const axiosInstance = axios.create({
  baseURL: PUBLIC_BASE_URL,
});

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | undefined => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) return;
  const user: User = JSON.parse(userJSON);
  return user;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
