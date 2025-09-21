import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Customer } from "@/types/customer";
import { useOrders } from "@/hooks/useOrders";

interface Props {
  customer: Customer | null;
  onClose: () => void;
}

export function CustomerDetailDialog({ customer, onClose }: Props) {
  const { data: orders = [] } = useOrders();

  const customerOrders = customer
    ? orders.filter((o) => o.customerId === customer.id)
    : [];

  return (
    <Dialog open={!!customer} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Клиент</DialogTitle>
        </DialogHeader>

        {customer ? (
          <div className="space-y-4">
            <p><strong>Имя:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Город:</strong> {customer.city}</p>
            <p><strong>LTV:</strong> {customer.ltv.toLocaleString()}</p>
            <p><strong>Заказов:</strong> {customer.ordersCount}</p>

            <div>
              <h4 className="mb-1 font-semibold">История заказов:</h4>
              {customerOrders.length > 0 ? (
                <ul className="list-disc pl-5">
                  {customerOrders.map((o) => (
                    <li key={o.id}>
                      {o.date} — {o.total.toLocaleString()} ({o.status})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Заказы отсутствуют
                </p>
              )}
            </div>
          </div>
        ) : (
          <p>Нет данных</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
