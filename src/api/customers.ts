import type { Customer } from "@/types/customer";

/**
 * Загружает список клиентов из локального JSON-файла.
 */
export const getCustomers = async (): Promise<Customer[]> => {
  const res = await fetch("/data/customers.json");
  if (!res.ok) {
    throw new Error(`Ошибка загрузки customers.json: ${res.status}`);
  }
  const json = await res.json();
  return json.customers as Customer[];
};
