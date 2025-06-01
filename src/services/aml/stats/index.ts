import { api } from "../../api";

interface AmlStats {
  total_checks: number;
  checks_this_month: number;
  remaining_checks: number;
  total_limit: number;
  reset_date: string;
  last_check_date: string;
}

export const getAmlStats = async (): Promise<AmlStats> => {
  const res = await api.get<AmlStats>("/aml/stats");
  return res.data;
};
