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
  try {
    const res = await api.get<any>(
      `/currencies/RUB/pairs/table`
    );
    const data = res.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) {
        return data.data;
      }
      if (Array.isArray(data.currencies)) {
        return data.currencies;
      }
      if (Array.isArray(data.rates)) {
        return data.rates;
      }
    }
    console.warn('getRates: Unexpected response structure', data);
    return [];
  } catch (error) {
    console.error('getRates: Error fetching rates', error);
    return [];
  }
}
