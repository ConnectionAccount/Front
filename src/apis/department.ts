import { Tasag } from "@/models/tasag";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/tasag", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/tasag/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/tasag", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/tasag/${id}`, data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/tasag/${id}`);

  return Tasag.fromJson(res);
};
