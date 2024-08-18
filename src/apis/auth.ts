import { HttpRequest } from "@/utils/request";
import { store } from "@/store";
import { authMe } from "@/store/auth-slice";

// const httpRequest = new HttpRequest(null, "/res");
const httpRequest = new HttpRequest(null, "");
const httpRequescus = new HttpRequest(null, "/cus");

export const me = async () => {
  const res = await httpRequest.get("/api/auth/me");
  store.dispatch(authMe(res));
  return res;
};

export const cusMe = async () => {
  const res = await httpRequescus.get("/api/user/me");
  store.dispatch(authMe(res));
  return res;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await httpRequest.post("/api/auth/login", data);
  console.log("login: ", JSON.stringify(data));
  return res;
};

export const forgot = async (data: { email: string }) => {
  return httpRequest.post("/app/auth/forgot", data);
};

export const changePassword = async (data: { password: string }) => {
  const res = await httpRequest.post("/app/auth/change-password", data);
  return res;
};
