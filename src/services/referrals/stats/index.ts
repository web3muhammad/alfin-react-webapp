import { api } from "../../api";

interface ReferralStats {
  referral_code: string;
  referral_link: string;
  referrals_count: number;
  referral_balance: number;
}

export const getReferralStats = async (): Promise<ReferralStats> => {
  const res = await api.get<ReferralStats>("/referrals/stats");
  return res.data;
};