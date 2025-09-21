export const ORDER_STATUSES = ["New", "Processing", "Shipped"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
