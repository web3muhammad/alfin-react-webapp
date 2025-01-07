import { api } from "../../api";
import { CreateBankCardRequestTypes } from "../interface";

interface EditBankCardRequestTypes extends CreateBankCardRequestTypes {
  cardId: number;
}

export async function editBankCard(data: EditBankCardRequestTypes) {
  const res = await api.put(`/bank_cards/${data.cardId}`, data);

  return res.data;
}
