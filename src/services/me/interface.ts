export interface GetUserInfoResponse {
  telegram_id: number;
  username: string;
  phone_number: string;
  full_name: string;
  volume: number;
}

export interface EditPersonalDataTypes {
  phone_number: string;
  full_name: string;
}
