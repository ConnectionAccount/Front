import { Role } from "@/models/role";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/role", data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/role/${id}`);

  return Role.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/role", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/role/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/role/${id}`);
};
