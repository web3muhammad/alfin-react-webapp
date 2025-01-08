import { api } from "../../api";
import { GetAllCurrenciesResponse } from "./../interface";

interface GetCurrenciesPairsProps {
  symbol: string;
  rates: boolean;
}

export async function getCurrenciesPairs({
  symbol,
  rates,
}: GetCurrenciesPairsProps): Promise<GetAllCurrenciesResponse> {
  const res = await api.get<GetAllCurrenciesResponse>(
    `/currencies/${symbol}/pairs?rates=${rates}`
  );
  return res.data;
}

export async function getRates(): Promise<GetAllCurrenciesResponse> {
  const res = await api.get<GetAllCurrenciesResponse>(
    `/currencies/RUB/pairs/table`
  );
  return res.data;
}
