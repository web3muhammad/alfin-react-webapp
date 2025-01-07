import { api } from "../../api";

export async function deleteBankCard(cardId: number) {
  const res = await api.delete(`/bank_cards/${cardId}`);

  return res.data;
}
