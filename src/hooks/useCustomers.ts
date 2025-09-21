import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/api/customers";
import type { Customer } from "@/types/customer";

/**
 * React Query хук для получения списка клиентов
 */
export const useCustomers = () =>
  useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
