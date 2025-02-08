import { api } from "../../api";

export async function deleteBankCard(cardId: number) {
  const res = await api.delete(`/accounts/${cardId}`);

  return res.data;
}
