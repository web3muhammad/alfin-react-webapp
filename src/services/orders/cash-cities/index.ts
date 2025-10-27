import { api } from "../../api";
import { CashCitiesResponse } from "./interface";


export const getCashCities = async (
  currency: string
): Promise<CashCitiesResponse> => {
  const response = await api.get<CashCitiesResponse>(
    `/orders/cash-cities`,
    {
      params: { currency },
    }
  );
  return response.data;
};

