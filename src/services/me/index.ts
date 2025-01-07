import { api } from "../api";
import { GetUserInfoResponse } from "./interface";

export async function getUserInfo(): Promise<GetUserInfoResponse> {
  const res = await api.get<GetUserInfoResponse>("/users/me");
  return res.data;
}
