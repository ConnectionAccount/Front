import { ICustomer } from "@/interface/customer";
import { Customer } from "@/models/customer";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/cus");

export const list = async (data: any) => {
  const { rows, count } = await httpRequest.get("/api/customer", data);

  return Result.fromJson<ICustomer>({
    rows: rows?.map((row: ICustomer) => Customer.fromJson(row)),
    count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/api/customer/${id}`);

  return Customer.fromJson(res);
};

export const create = async (data: any) =>
  httpRequest.post("/api/customer", data);

export const update = async (id: string, data: any) =>
  httpRequest.put(`/api/customer/${id}`, data);

export const del = async (id: string) => httpRequest.del(`/api/customer/${id}`);
