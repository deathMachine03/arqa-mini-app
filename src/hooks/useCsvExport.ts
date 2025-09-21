import type { CsvRow, CsvCell } from "@/types/csv";

function serialize(v: CsvCell): string {
  const s = v instanceof Date ? v.toISOString() : String(v ?? "");
  // Экранируем кавычки, оборачиваем в кавычки по CSV-правилам
  return `"${s.replace(/"/g, '""')}"`;
}

export function useCsvExport() {
  const download = (rows: CsvRow[], filename = "data.csv") => {
    if (!rows.length) return;

    // Единый набор колонок: объединяем ключи всех строк, сохраняя порядок
    const headers = Array.from(
      rows.reduce<Set<string>>((acc, r) => {
        Object.keys(r).forEach((k) => acc.add(k));
        return acc;
      }, new Set())
    );

    const headerLine = headers.join(",");
    const body = rows
      .map((r) => headers.map((h) => serialize(r[h])).join(","))
      .join("\n");

    const blob = new Blob([`${headerLine}\n${body}`], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return { download };
}
