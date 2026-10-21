import api from "./api";

type loginResponse = { token: string; user: { id: number; username: string } };

export const login = async (username: string, password: string) => {
  const response = await api.post<loginResponse>("/login", {
    username,
    password,
  });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post("/register", {
    username,
    password,
  });
  return response.data;
};
