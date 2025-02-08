import { api } from "../api";
import { BankCard } from "./interface";

export async function getAllBankCards(): Promise<BankCard[]> {
  const res = await api.get<BankCard[]>("/accounts/user/me");

  return res.data;
}
