import { useOrders } from "@/hooks/useOrders";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Loader2 } from "lucide-react";

export default function Orders() {
  const { data: orders, isLoading, isError } = useOrders();

if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Ошибка загрузки заказов
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Заказы</h1>
      {orders && <OrdersTable orders={orders} />}
    </div>
  );
}
