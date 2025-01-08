import { api } from "../api";

export async function fetchExchangeRate({
  sellCurrency,
  buyCurrency,
}: {
  sellCurrency: string;
  buyCurrency: string;
}): Promise<number> {
  const response = await api.get(
    `/currencies/${sellCurrency}/${buyCurrency}/rate`
  );
  return response.data.rate;
}
