import { Uilchilgee } from "@/models/uilchilgee";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/uilchilgee", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/uilchilgee/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/uilchilgee", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/uilchilgee/${id}`, data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/uilchilgee/${id}`);

  return Uilchilgee.fromJson(res);
};
