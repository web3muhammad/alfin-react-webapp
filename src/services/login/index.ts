import { api } from "../api";

export async function getAccessToken() {
  const webAppInitData = "query_id=AAH2HtMwAgAAAPYe0zAvZWYn&user=%7B%22id%22%3A5114109686%2C%22first_name%22%3A%22Muhammad%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22muhammadamiragaev%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FT5eOHWGFi3wN3Rk620Y01wJM6sAmkK7wL4_wJbC11_q78COLhsRIBtISZGKlt5nv.svg%22%7D&auth_date=1764069435&signature=rGeAEErjN1wwuuLmXkj_ugBe7qRfU1BJRWgt1Qgb4nC5_mmb1CPGE5EvRM9b64Ny7uVK1IfbDHt_H-Bl2sJKDA&hash=d81be4955dc0196c73eadeabe42b594d13c8a193e1c4dab9f3f6259e6ced9e4a";
  const res = await api.post("/auth/telegram", {
    init_data: webAppInitData,
  });

  localStorage.setItem("access_token", res.data?.access_token);

  return res;
}