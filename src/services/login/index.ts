import { api } from "../api";

export async function getAccessToken() {
  const webAppInitData = Telegram.WebApp.initData;
  const myInitData =
    "query_id=AAHQEXNwAgAAANARc3CLBetQ&user=%7B%22id%22%3A6181556688%2C%22first_name%22%3A%22%D0%9A%D1%80%D0%B8%D0%BF%D1%82%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FSk0LfC5rDpB9Xnf6O1RWXvl7O_lIdeZo-OP3J6GqtWTH-mnjexsWmIZshMyAQVuy.svg%22%7D&auth_date=1738059305&signature=d6fU0VRptmK1OxI5i6um73mEtyGXNKNOlx6TMaUo9F-ki6jCP-u3hlkloqlJFAMahupqwFoklBYmo3XZJWF_CQ&hash=4509bbaf86e455e451d51d67eb9fa60346be66226bce562f0b7a9134e7eafe54"
  const res = await api.post("/auth/telegram", {
    init_data: webAppInitData,
  });

  localStorage.setItem("access_token", res.data?.access_token);

  return res;
}
