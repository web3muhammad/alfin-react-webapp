import { api } from "../../api";
import { CreateBankCardRequestTypes } from "../interface";

export async function createBankCard(data: CreateBankCardRequestTypes) {
  const res = await api.post("/bank_cards/", data);

  return res.data;
}
