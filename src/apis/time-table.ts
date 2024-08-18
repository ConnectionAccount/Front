import { TsagiinHuvaari } from "@/models/tsagiin-huvaari";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/tsagiin-huvaari", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/tsagiin-huvaari/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/tsagiin-huvaari", data);
};

export const timeGet = async (data: any) => {
  return httpRequest.get("/api/huvaari", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/tsagiin-huvaari/${id}`, data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/tsagiin-huvaari/${id}`);

  return TsagiinHuvaari.fromJson(res);
};
