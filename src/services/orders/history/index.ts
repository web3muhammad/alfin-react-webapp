import { api } from "../../api";
import { Order } from "../interface";

export async function getOrderHistory(): Promise<Order[]> {
  const res = await api.get<Order[]>("/orders/history");

  return res.data;
}
