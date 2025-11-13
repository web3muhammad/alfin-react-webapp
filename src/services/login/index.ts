import { api } from "../api";

export async function getAccessToken() {
  // const webAppInitData = Telegram.WebApp.initData;
  const webAppInitData =
    "query_id=AAHu0SRIAAAAAO7RJEgD9_5F&user=%7B%22id%22%3A1210372590%2C%22first_name%22%3A%22%D0%A0%D0%B0%D0%BC%D0%B0%D0%B7%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%D0%A0%D0%B0%D0%BC%D0%B0%D0%B7%D0%B0%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22ramazanov_rv%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaRhPbmkXd_S80ipkTLd8YYYjCWyPB1SU-Mb6KrjywCA.svg%22%7D&auth_date=1763035549&signature=bjiRB3kDk6Wi3-EaYoQvhC5CuGF40TzGda1iSov4Wtdx6bxQ677475ex70ESye6RxQAlXgfzoLSxa99fRHKQCg&hash=003abf0772ef19dd4e99028b959266ca74d303218807edba8851b3c7f9722147";
  const res = await api.post("/auth/telegram", {
    init_data: webAppInitData,
  });

  localStorage.setItem("access_token", res.data?.access_token);

  return res;
}