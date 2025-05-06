// src/api/userApi.ts
import axios from "axios";
import { paging, User } from "./types";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const getUsersWithPageSize = async ({
  page,
  pageSize,
}: paging): Promise<User[]> => {
  const response = await apiClient.get(
    `/users?_page=${page}&_limit=${pageSize}`
  );
  return response.data;
};

export const getDetailUser = async (id: number): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const getPost = async (): Promise<User[]> => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
