import { api } from "@/lib/axios";

export const loginUser = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data: { name: string; email: string; password: string , confirmPassword: string }) => {
  return api.post("/auth/register", data);
};  