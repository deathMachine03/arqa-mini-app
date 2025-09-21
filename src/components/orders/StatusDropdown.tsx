import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orderStatus";
import type { Order } from "@/types/order";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  order: Order;
  onChange: (id: string, newStatus: OrderStatus) => void;
}

export function StatusDropdown({ order, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSelect = (status: OrderStatus) => {
    setLoading(true);
    setTimeout(() => {
      onChange(order.id, status);
      toast.success(`Статус заказа ${order.id} изменён на ${status}`);
      setLoading(false);
    }, 600);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : order.status}
        </Button>
      </DropdownMenuTrigger>
<DropdownMenuContent
  className="bg-white dark:bg-neutral-800 text-sm shadow-lg rounded-md p-1 opacity-100"
>
  {ORDER_STATUSES.map((s) => (
    <DropdownMenuItem
      key={s}
      onClick={() => handleSelect(s)}
      className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700"
    >
      {s}
    </DropdownMenuItem>
  ))}
</DropdownMenuContent>

    </DropdownMenu>
  );
}
