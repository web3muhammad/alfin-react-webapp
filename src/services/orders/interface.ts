export interface CreateOrderRequestTypes {
  sell_currency: string;
  buy_currency: string;
  sell_amount: number;
  buy_amount: number;
  rate: number;
  payment_method: string;
  comment?: string;
  status: string;
  promo_code_id?: number;
  account_id: number | string | null;
  phone_number: string;
  buy_amount_without_discount: number;
}

export interface Order {
  sell_currency: string;
  buy_currency: string;
  sell_amount: number;
  buy_amount: number;
  rate: number;
  payment_method: string;
  comment: string;
  status: string;
  id: number;
  user_telegram_id: number;
  promo_code_id: number | null;
  account_id: number | string | null;
  created_at: string;
  buy_amount_without_discount?: number;
  discount_percentage?: number;
}
