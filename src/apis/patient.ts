import { Uilchluulegch } from "@/models/uilchluulegch";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/uilchluulegch", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/uilchluulegch/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/uilchluulegch", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/uilchluulegch/${id}`, data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/uilchluulegch/${id}`);

  return Uilchluulegch.fromJson(res);
};
