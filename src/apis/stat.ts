import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/res");

export const list = async (data: any) => {
  return httpRequest.get("/api/stats", data);
};
