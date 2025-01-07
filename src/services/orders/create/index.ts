import { api } from "../../api";
import { CreateOrderRequestTypes } from "../interface";

export async function CreateOrder(
  data: CreateOrderRequestTypes
): Promise<CreateOrderRequestTypes> {
  const res = await api.post<CreateOrderRequestTypes>("/orders/", data);
  return res.data;
}
