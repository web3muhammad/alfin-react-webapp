export interface Currency {
  id: number;
  title: string;
  symbol: string;
  icon: string;
  currency_type: "CRYPTO" | "CASH";
  rate: number;
}

export interface GetAllCurrenciesResponse extends Array<Currency> {}
