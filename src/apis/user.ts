import { User } from "@/models/user";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/cus");

export const list = async (data: any) => {
  return httpRequest.get("/api/user", data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/user/${id}`);

  return User.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/user", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/user/${id}`, data);
};

export const del = async (id: string) => {
  return httpRequest.del(`/api/user/${id}`);
};
