export interface CreateBankCardRequestTypes {
  account_name: string;
  owner_name: string;
  currency: string;
  card_number?: number;
  trc_20?: string;
  iban?: string;
}

export interface BankCard {
  account_name: string;
  owner_name: string;
  card_number?: number;
  trc_20?: string;
  iban?: string;
  currency: string;
  id: number;

  user_telegram_id: number;
}
