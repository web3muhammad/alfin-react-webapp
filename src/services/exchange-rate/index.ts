import { api } from "../api";
export interface FetchExchangeRateResponse {
  sell_currency: string;
  buy_currency: string;
  rate: number;
  sell_min_amount: number;
  buy_min_amount: number;
}

export async function fetchExchangeRate({
  sellCurrency,
  buyCurrency,
}: {
  sellCurrency: string;
  buyCurrency: string;
}): Promise<FetchExchangeRateResponse> {
  const response = await api.get<FetchExchangeRateResponse>(
    `/currencies/${sellCurrency}/${buyCurrency}/rate`
  );
  return response.data;
}
