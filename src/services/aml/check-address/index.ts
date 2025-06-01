import { api } from "../../api";

interface AddressInfo {
  network: string;
  address: string;
}

interface ExposureDetail {
  entity_category: string;
  value_share: number;
}

interface AddressExposure {
  entity_category: string;
  entity_name: string;
  exposure: ExposureDetail[];
}

interface RiskRule {
  rule_type: string;
  min_value_share: number;
}

interface Risk {
  risk_level: string;
  occurred_at: string;
  detected_at: string;
  risk_type: string;
  entity_category: string;
  proximity: string;
  value_in_fiat: number;
  value_share: number;
  rule: RiskRule;
  fiat_currency: string;
}

interface CheckAddressResponse {
  id: string;
  created_at: string;
  check_type: "address";
  check_status: "checking" | "completed" | "failed";
  risk_level: "low" | "medium" | "high";
  risk_score: number;
  address: AddressInfo;
  fiat_currency: string;
  checked_at: string;
  address_exposure: AddressExposure[];
  risks: Risk[];
}

export const checkAddress = async (
  address: string
): Promise<CheckAddressResponse> => {
  const response = await api.post<CheckAddressResponse>("/aml/check-address", {
    address,
  });
  return response.data;
};
