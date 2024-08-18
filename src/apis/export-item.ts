import { ExportItem } from "@/models/export-item";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/se1");

export const list = async (data: any) => {
  return httpRequest.get("/api/export-item", data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/api/export-item/${id}`);
};

export const actpdf = async (id: string) => {
  return httpRequest.blob(`/api/export-item/${id}/print`);
};

export const excel = async (filter: any) => {
  return httpRequest.get("/api/export-item/excel", filter);
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/export-item/${id}`);

  return ExportItem.fromJson(res);
};
