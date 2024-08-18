import { Uruu } from "@/models/uruu";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/uruu", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/uruu/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/uruu", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/uruu/${id}`, data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/uruu/${id}`);

  return Uruu.fromJson(res);
};
