import { api } from "../../api";
import { CreateBankCardRequestTypes } from "../interface";

export async function createBankCard(data: CreateBankCardRequestTypes) {
  const res = await api.post("/accounts/", data);

  return res.data;
}
