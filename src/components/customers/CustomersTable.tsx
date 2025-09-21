import { useState, useMemo } from "react";
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
import { CustomerDetailDialog } from "./CustomerDetailDialog";
import type { Customer } from "@/types/customer";

interface Props {
  customers: Customer[];
}

export function CustomersTable({ customers }: Props) {
  const [selected, setSelected] = useState<Customer | null>(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // список городов для фильтра
  const cities = useMemo(
    () => Array.from(new Set(customers.map((c) => c.city))),
    [customers]
  );

  // фильтрация и поиск
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        (!city || c.city === city) &&
        (c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q))
    );
  }, [customers, city, search]);

  // сортировка по LTV
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      sortDir === "asc" ? a.ltv - b.ltv : b.ltv - a.ltv
    );
  }, [filtered, sortDir]);

  return (
    <div className="space-y-4">
      {/* Панель поиска и фильтра */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Поиск по имени или email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          className="rounded border px-2 py-1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Все города</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
        >
          LTV ({sortDir})
        </Button>
      </div>

      {/* Таблица клиентов */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">LTV</TableHead>
              <TableHead className="text-right">Orders</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sorted.map((c) => (
              <TableRow
                key={c.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => setSelected(c)}
              >
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.city}</TableCell>
                <TableCell className="text-right">
                  {c.ltv.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{c.ordersCount}</TableCell>
              </TableRow>
            ))}

            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center">
                  Клиенты не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Диалог деталей клиента */}
      <CustomerDetailDialog customer={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
