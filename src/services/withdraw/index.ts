import { api } from "../api"

interface WithdrawMoneyRequest {
  amount: number;
  wallet: string;
}

interface WithdrawMoneyResponse {
  transaction_id: number;
    amount: number;
    status: string;
    created_at: string;
    user_telegram_id: number;
    remaining_balance: number;
}

export async function withdrawMoney({amount, wallet}: WithdrawMoneyRequest): Promise<WithdrawMoneyResponse> {
  const res = await api.post<WithdrawMoneyResponse>("/withdraw", {
    amount,
    wallet,
  });

  return res.data;
}