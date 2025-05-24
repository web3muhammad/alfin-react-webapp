import { api } from "../api";

export async function getAccessToken() {
  const webAppInitData = Telegram.WebApp.initData;
  const myInitData =
    "query_id=AAHu0SRIAAAAAO7RJEhSReIO&user=%7B%22id%22%3A1210372590%2C%22first_name%22%3A%22%D0%A0%D0%B0%D0%BC%D0%B0%D0%B7%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%D0%A0%D0%B0%D0%BC%D0%B0%D0%B7%D0%B0%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22ramazanov_rv%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaRhPbmkXd_S80ipkTLd8YYYjCWyPB1SU-Mb6KrjywCA.svg%22%7D&auth_date=1748099870&signature=f8wJvXw9fk3qS-B1V0VYsQ0VI5pt8rlhHQ1we84Pe-CXkiYfSAQSFzKFk1vEjqyph67SfSqNgiEHO2x_eOj6BA&hash=802eaade580471da72c75b63109ac17cd2ac100d71bd5cb54641ebe9504cd802";
  const res = await api.post("/auth/telegram", {
    init_data: myInitData,
  });

  localStorage.setItem("access_token", res.data?.access_token);

  return res;
}
