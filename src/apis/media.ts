import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/med");

export const upload = async (data: FormData | any) => {
  return httpRequest.upload("/api/image/upload", data);
};

export const Fileupload = async (data: FormData | any) => {
  return httpRequest.upload("/api/file/upload", data);
};
