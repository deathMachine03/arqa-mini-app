import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/orders";
import type { Order } from "@/types/order";

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};
