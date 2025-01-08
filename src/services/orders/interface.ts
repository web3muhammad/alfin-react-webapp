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
  bank_card_id: number;
  phone_number: string;
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
  bank_card_id: number | null;
  created_at: string;
}
