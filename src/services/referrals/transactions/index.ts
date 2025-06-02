import { api } from "../../api";

interface ReferralTransaction {
  referral_id: number;
  order_id: number;
  amount: number;
  status: "COMMISSION" | "WITHDRAWN";
  id: number;
  created_at: string;
}

export const getReferralTransactions = async (): Promise<
  ReferralTransaction[]
> => {
  const res = await api.get<ReferralTransaction[]>("/referrals/transactions");
  return res.data;
};
