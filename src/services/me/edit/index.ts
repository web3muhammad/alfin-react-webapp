import { api } from "../../api";
import { EditPersonalDataTypes } from "../interface";


export async function editPersonalData(data: EditPersonalDataTypes) {
  const res = await api.put("/users/me", data);
  return res.data;
}
