import { TasagiinAjiltan } from "@/models/tasagiin-ajiltan";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/tasgiin-ajiltan", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/tasgiin-ajiltan/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/api/tasgiin-ajiltan", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/api/tasgiin-ajiltan/${id}`, data);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/tasgiin-ajiltan/${id}`);

  return TasagiinAjiltan.fromJson(res);
};
