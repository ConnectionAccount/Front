import { HttpRequest } from "@/utils/request";
import { store } from "@/store";
import { init as initFn } from "@/store/general-slice";

const httpRequest = new HttpRequest(null, "/res");

export const upload = async (data: FormData | any) =>
  httpRequest.upload("/api/general/image-upload", data);

export const init = async () => {
  const res = await httpRequest.get("/api/general/init");
  store.dispatch(initFn(res));
  return res;
};
