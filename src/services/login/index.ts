import { api } from "../api";

export async function getAccessToken() {
  const webAppInitData = Telegram.WebApp.initData;
  const res = await api.post("/auth/telegram", {
    init_data: webAppInitData,
  });

  localStorage.setItem("access_token", res.data?.access_token);

  return res;
}
