import { api } from "../api";
import { BankCard } from "./interface";

export async function getAllBankCards(): Promise<BankCard[]> {
  const res = await api.get<BankCard[]>("/bank_cards/user/me");

  return res.data;
}
