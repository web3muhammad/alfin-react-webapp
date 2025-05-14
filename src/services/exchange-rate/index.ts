import { api } from "../api";

export interface FetchExchangeRateResponse {
  sell_currency: string;
  buy_currency: string;
  rate: number;
  sell_min_amount: number;
  buy_min_amount: number;
  show_rate: number;
  sell_amount?: number;
  buy_amount?: number;
  buy_amount_without_discount?: number;
  payment_type: string;
  is_wholesale_rate: boolean;
  discount_percentage: number;
  needs_rate_request: boolean;
}

export interface FetchExchangeRateRequest {
  fromCurrency: string;
  toCurrency: string;
  sellAmount?: number;
  buyAmount?: number;
  paymentType?: "CARD" | "CASH";
}

export async function fetchExchangeRate({
  fromCurrency,
  toCurrency,
  sellAmount,
  buyAmount,
  paymentType = "CARD",
}: FetchExchangeRateRequest): Promise<FetchExchangeRateResponse> {
  const payload: Record<string, any> = {
    from_currency: fromCurrency,
    to_currency: toCurrency,
    payment_type: paymentType,
  };

  if (sellAmount != null) {
    payload.sell_amount = sellAmount;
  }
  if (buyAmount != null) {
    payload.buy_amount = buyAmount;
  }

  const response = await api.post<FetchExchangeRateResponse>(
    `/exchange/`,
    payload
  );
  return response.data;
}
