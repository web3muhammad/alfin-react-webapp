export async function getAccessToken() {
  const webAppInitData = Telegram.WebApp.initData;
  const res = await api.post("/auth/telegram", {
    init_data: webAppInitData, // Используем реальные данные вместо хардкода
  });

  localStorage.setItem("access_token", res.data?.access_token);
  return res;
}
