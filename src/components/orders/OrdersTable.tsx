import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderDetailDialog } from "./OrderDetailDialog";
import { StatusDropdown } from "./StatusDropdown";
import type { Order } from "@/types/order";
import type { OrderStatus } from "@/lib/orderStatus";

interface Props {
  orders: Order[];
}

type SortKey = "date" | "total";

export function OrdersTable({ orders }: Props) {
  const [localOrders, setLocalOrders] = useState<Order[]>([]);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const [selected, setSelected] = useState<Order | null>(null);
  const [query, setQuery] = useState(""); // для debounce
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // debounce для поиска
  useEffect(() => {
    const t = setTimeout(() => setSearch(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setLocalOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  // поиск
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return localOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customerId.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
    );
  }, [localOrders, search]);

  // сортировка
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      if (sortKey === "date") return a.date.localeCompare(b.date) * mult;
      if (sortKey === "total") return (a.total - b.total) * mult;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  // пагинация
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-4">
      {/* Поиск и сортировка */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Поиск по ID, клиенту, городу..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
        <Button
          variant="outline"
          onClick={() => {
            setSortKey("date");
            setSortDir(sortDir === "asc" ? "desc" : "asc");
          }}
        >
          Дата ({sortDir})
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSortKey("total");
            setSortDir(sortDir === "asc" ? "desc" : "asc");
          }}
        >
          Сумма ({sortDir})
        </Button>
      </div>

      {/* Таблица */}
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px] text-right">Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((order, i) => (
              <TableRow
                key={order.id}
                className={i % 2 === 0 ? "bg-muted/30" : ""}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString("ru-RU")}
                </TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>{order.city}</TableCell>
                <TableCell>{order.channel}</TableCell>
                <TableCell>
                  <StatusDropdown order={order} onChange={handleStatusChange} />
                </TableCell>
                <TableCell className="text-right">
                  {order.total.toLocaleString("ru-RU")}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelected(order)}
                  >
                    Детали
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-6 text-center text-muted-foreground">
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Пагинация */}
      <div className="flex items-center justify-between border-t p-3 text-sm">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>
          ← Назад
        </Button>
        <span>
          Стр. {currentPage} из {totalPages}
        </span>
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>
          Вперёд →
        </Button>
      </div>

      <OrderDetailDialog order={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
