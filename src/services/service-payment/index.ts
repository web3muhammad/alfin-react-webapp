import { api } from "../api";
import { CreatePaymentData, Payment, Service, ServiceRate } from "./interface";

export async function getServices(): Promise<Service[]> {
  const res = await api.get<Service[]>("/services/list");
  return res.data;
}

export async function getServiceRate(): Promise<ServiceRate> {
  const res = await api.get<ServiceRate>("/services/rate");
  return res.data;
}

export async function createPayment(data: CreatePaymentData): Promise<Payment> {
  const res = await api.post<Payment>("/services/payment", data);
  return res.data;
}