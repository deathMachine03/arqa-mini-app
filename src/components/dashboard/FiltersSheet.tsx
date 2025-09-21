import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";

const cities = ["Алматы", "Астана"];
const channels = ["Web", "Mobile", "Offline"];

export function FiltersSheet() {
  const { filters, setFilters } = useDashboardFilters();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);

  // когда панель открывается — подтягиваем актуальные фильтры в черновик
  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  const handleChange = (key: keyof typeof draft, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const applyFilters = () => {
    setFilters({ ...draft }); // создаём новый объект -> гарантированный ререндер
    setOpen(false);
  };

  const resetFilters = () => {
    const empty = { startDate: "", endDate: "", city: "", channel: "" };
    setDraft(empty);
    setFilters(empty);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Фильтры</Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-80 space-y-4 rounded-l-2xl border-l
                   bg-white/70 p-6 shadow-lg backdrop-blur
                   dark:bg-neutral-800/70"
      >
        <h2 className="text-lg font-semibold">Фильтры</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium">Дата от</label>
          <Input
            type="date"
            value={draft.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Дата до</label>
          <Input
            type="date"
            value={draft.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Город</label>
          <select
            className="w-full rounded border px-2 py-1"
            value={draft.city}
            onChange={(e) => handleChange("city", e.target.value)}
          >
            <option value="">Все</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Канал</label>
          <select
            className="w-full rounded border px-2 py-1"
            value={draft.channel}
            onChange={(e) => handleChange("channel", e.target.value)}
          >
            <option value="">Все</option>
            {channels.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="flex-1" onClick={applyFilters}>
            Применить
          </Button>
          <Button variant="secondary" className="flex-1" onClick={resetFilters}>
            Сбросить
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
