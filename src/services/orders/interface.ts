export type OrderType = 'EXCHANGE' | 'SERVICE';
export type ExchangeOrderStatus = 'IN_PROGRESS' | 'SUCCEEDED' | 'NEW' | 'CANCELLED';
export type ServiceOrderStatus = 'PENDING' | 'CANCELLED' | 'PAID' | 'COMPLETED';

export interface CreateOrderRequestTypes {
  sell_currency: string;
  buy_currency: string;
  sell_amount: number;
  buy_amount: number;
  rate: number;
  payment_method: string;
  payment_city?: string;
  receive_method?: string;
  receive_city?: string;
  comment?: string;
  status: string;
  promo_code_id?: number;
  account_id?: number | string | null;
  phone_number: string;
  buy_amount_without_discount: number;
  discount_percentage: number;
  order_type: OrderType;
}

export interface Order {
  sell_currency: string;
  buy_currency: string;
  sell_amount: number;
  buy_amount: number;
  exchange_rate: number;
  payment_method: string;
  comment: string;
  status: ExchangeOrderStatus | ServiceOrderStatus;
  id: number;
  user_telegram_id: number;
  promo_code_id: number | null;
  account_id: number | string | null;
  created_at: string;
  buy_amount_without_discount?: number;
  discount_percentage?: number;
  order_type: OrderType;
  service_name?: string; // For SERVICE type orders
}
