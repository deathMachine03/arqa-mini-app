import type { Order } from "@/types/order";

export const getOrders = async (): Promise<Order[]> => {
  const res = await fetch("/data/orders.json");
  if (!res.ok) {
    throw new Error(`Ошибка загрузки orders.json: ${res.status}`);
  }
  const json = await res.json();
  return json.orders as Order[];
};
