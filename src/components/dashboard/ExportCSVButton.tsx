import { Button } from "@/components/ui/button";
import { useCsvExport } from "@/hooks/useCsvExport";
import type { CsvRow } from "@/types/csv";
import { Download } from "lucide-react";

interface Props {
  rows: CsvRow[];
  filename?: string;
}

export function ExportCSVButton({ rows, filename = "data.csv" }: Props) {
  const { download } = useCsvExport();
  return (
    <Button
  variant="secondary"
  onClick={() => download(rows, filename)}
  className="flex items-center gap-2 rounded-lg shadow hover:shadow-md"
>
  <Download className="h-4 w-4" />
  Export CSV
</Button>
  );
}
