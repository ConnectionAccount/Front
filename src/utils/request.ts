import { store } from "../store";
import { logout } from "@/store/auth-slice";
import { HttpHandler } from "@/libs/http/http-handler";
import { HttpRequest as BaseHttpRequest } from "@/libs/http/http-request";

export class HttpRequest extends BaseHttpRequest {
  store = store;
  host = "http://localhost:8000";
  errorHandler = (statusCode: number, error: HttpHandler): HttpHandler => {
    if (statusCode === 401) {
      store.dispatch(logout());
    }
    throw error as any;
  };
}
