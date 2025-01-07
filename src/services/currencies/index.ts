import { api } from "../api";
import { GetAllCurrenciesResponse } from "./interface";

export async function getAllCurrencies(): Promise<GetAllCurrenciesResponse> {
  const res = await api.get<GetAllCurrenciesResponse>("/currencies/");
  return res.data;
}