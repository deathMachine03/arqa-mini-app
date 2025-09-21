import { useOrders } from "@/hooks/useOrders";
import { useVisits } from "@/hooks/useVisits";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";

import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FiltersSheet } from "@/components/dashboard/FiltersSheet";
import { ExportCSVButton } from "@/components/dashboard/ExportCSVButton";

import type { Order } from "@/types/order";
import type { Visit } from "@/types/visit";
import type { CsvRow } from "@/types/csv";

export default function Dashboard() {
  // Загружаем данные
  const { filters } = useDashboardFilters();
  const { data: ordersRaw = [] } = useOrders();
  const { data: visitsRaw = [] } = useVisits();

  // ---- Фильтрация заказов ----
  const orders = ordersRaw.filter((o) => {
    const inStart = !filters.startDate || new Date(o.date) >= new Date(filters.startDate);
    const inEnd = !filters.endDate || new Date(o.date) <= new Date(filters.endDate);
    const cityOk = !filters.city || o.city === filters.city;
    const channelOk = !filters.channel || o.channel === filters.channel;
    return inStart && inEnd && cityOk && channelOk;
  });

  // ---- Фильтрация визитов ----
  const visits = visitsRaw.filter((v: Visit) => {
    const dateOk =
      (!filters.startDate || v.date >= filters.startDate) &&
      (!filters.endDate || v.date <= filters.endDate);
    const cityOk = !filters.city || v.city === filters.city;
    const channelOk = !filters.channel || v.channel === filters.channel;
    return dateOk && cityOk && channelOk;
  });

  // ---- Агрегаты ----
  const revenue = orders.reduce((acc: number, o: Order) => acc + o.total, 0);
  const aov = orders.length ? revenue / orders.length : 0;
  const visitsCount = visits.reduce((sum, v) => sum + v.count, 0);
  const conversion = visitsCount ? (orders.length / visitsCount) * 100 : 0;

  // ---- Данные для графика ----
  const chartData = orders.map((o: Order) => ({
    date: o.date,
    revenue: o.total,
  }));

  // ---- Данные для экспорта CSV ----
  const csvRows: CsvRow[] = orders.map((o: Order) => ({
    id: o.id,
    date: o.date,
    city: o.city,
    channel: o.channel,
    total: o.total,
  }));

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 to-slate-100
                    p-6 dark:from-neutral-900 dark:to-neutral-950">
      <MetricsCards
        revenue={revenue}
        orders={orders.length}
        aov={aov}
        conversion={conversion}
      />

      <FiltersSheet />

      <RevenueChart data={chartData} />

      <ExportCSVButton rows={csvRows} filename="orders.csv" />
    </div>
  );
}
