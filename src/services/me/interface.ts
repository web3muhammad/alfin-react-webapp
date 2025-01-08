export interface GetUserInfoResponse {
  telegram_id: number;
  username: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  volume: number;
}

export interface EditPersonalDataTypes {
  phone_number: string;
  first_name: string;
  last_name: string;
}
