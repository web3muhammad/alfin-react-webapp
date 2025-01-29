export interface CreateBankCardRequestTypes {
  bank_name: string;
  owner_name: string;
  card_number: number | null;
  currency: string;
  trc_wallet: string | null;
  iban: string | null;
}

export interface BankCard {
  bank_name: string;
  owner_name: string;
  card_number: number;
  currency: string;
  id: number;
  user_telegram_id: number;
}
