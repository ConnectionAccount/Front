import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/aut");

export const otp = async (data: { otpMethod: string; email: string }) => {
  return httpRequest.get("/app/otp", data);
};

export const verify = async (otp: { otpCode: string; otpMethod: string }) => {
  return httpRequest.post("/app/otp/verify", otp);
};
