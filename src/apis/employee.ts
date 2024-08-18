import { Ajiltan } from "@/models/ajiltan";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/ajiltan", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/ajiltan/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/ajiltan", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/ajiltan/${id}`, data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/ajiltan/${id}`);

  return Ajiltan.fromJson(res);
};
