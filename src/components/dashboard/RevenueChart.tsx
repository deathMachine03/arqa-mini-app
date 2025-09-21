import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export interface ChartPoint {
  date: string;
  revenue: number;
}

export function RevenueChart({ data }: { data: ChartPoint[] }) {
  return (
 <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-md backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/70">
  <h2 className="mb-4 text-lg font-semibold">Revenue</h2>
  <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="revenue" fill="url(#colorRev)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
