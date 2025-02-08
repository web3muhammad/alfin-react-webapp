import { api } from "../api";

export async function getAccessToken() {
  const webAppInitData = Telegram.WebApp.initData;
  const myInitData =
    "query_id=AAGlqXUoAwAAAKWpdSjxuD03&user=%7B%22id%22%3A7121250725%2C%22first_name%22%3A%22%D0%A0%D0%B0%D0%BC%D0%B0%D0%B7%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%D0%A0%D0%B0%D0%BC%D0%B0%D0%B7%D0%B0%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22ramazanov_rv_dev%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FzmLSII5MM0vmLFzr2KDMzWM0iaouwYlfkw7L5-MKL8VcVdGcfMWgAksdQN6m96lC.svg%22%7D&auth_date=1737976647&signature=rTMc05q4GIdKNK6BISlYvuJ1pXtb9W-92LHA2C5xNcitCc2Jaj7S_78z9vvsk5aJVhoMXuSgRmlV_WclTh7rBA&hash=638f8b7911978269214a97284e282f7080c4d9b6f5e7578aa92dc90d5a401113";
  const res = await api.post("/auth/telegram", {
    init_data: myInitData,
  });

  localStorage.setItem("access_token", res.data?.access_token);

  return res;
}
