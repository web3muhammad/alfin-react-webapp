import { api } from "../api";

export interface Card {
  id: number;
  name: string;
  final_price: number;
  issue_days: string;
  requires_address: boolean;
  description: string | null;
  image_url: string | null;
  discount_percentage: number | null;
}

export interface ForeignCardResponse {
  cards: Card[];
  user_volume: number;
  total_cards: number;
}

export type CardType = "ibt-card" | "alfa-card";

export interface CreateForeignCardRequest {
  full_name: string;
  birth_date: string;
  phone_number: string;
  email: string;
  delivery_address: string;
  card_type_id: number; // 1 - IBT Bank, 2 - Alfa Bank
}

export interface CreateForeignCardResponse {
  success: boolean;
  message: string;
  order_id?: string;
}

// Get available foreign cards
export async function getForeignCardInfo(): Promise<ForeignCardResponse> {
  const res = await api.get("/cards/available");
  return res.data;
}

// Apply for foreign card
export async function applyForForeignCard(
  data: CreateForeignCardRequest
): Promise<CreateForeignCardResponse> {
  const res = await api.post("/cards/request", data);
  return res.data;
}
