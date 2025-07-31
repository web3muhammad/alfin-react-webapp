import { api } from "../api";

interface IExchangerSchedule {
  is_open: boolean;
  current_time: string;
  working_hours: string;
  timezone: string;
}

export async function getExchangerSchedule(): Promise<boolean> {
  const res = await api.get<IExchangerSchedule>("/status/open");
  return res.data.is_open;
}
