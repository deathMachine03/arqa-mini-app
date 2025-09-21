import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Order } from "@/types/order";

interface Props {
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailDialog({ order, onClose }: Props) {
  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg rounded-2xl bg-white dark:bg-neutral-900 shadow-xl opacity-100"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Детали заказа
          </DialogTitle>
        </DialogHeader>

        {order ? (
          <div className="space-y-4 text-sm">
            <p>
              <strong>ID:</strong> {order.id}
            </p>
            <p>
              <strong>Дата:</strong> {order.date}
            </p>
            <p>
              <strong>Город:</strong> {order.city}
            </p>
            <p>
              <strong>Канал:</strong> {order.channel}
            </p>
            <p>
              <strong>Статус:</strong> {order.status}
            </p>
            <p>
              <strong>Комментарий:</strong> {order.comment ?? "—"}
            </p>

            <div>
              <h4 className="font-semibold mb-2">Состав заказа</h4>
              <ul className="list-disc pl-5 space-y-1">
                {order.items.map((i) => (
                  <li key={i.sku}>
                    {i.name} — {i.qty} × {i.price.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-bold text-right">
              Итого: {order.total.toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Нет данных</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
