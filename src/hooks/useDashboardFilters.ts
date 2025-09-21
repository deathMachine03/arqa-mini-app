import type { DashboardFilters } from "@/types/filters";
import { useQuery, useQueryClient } from "@tanstack/react-query";


const defaultFilters: DashboardFilters = {
  startDate: "",
  endDate: "",
  city: "",
  channel: "",
};

export function useDashboardFilters() {
  const qc = useQueryClient();

  const { data = defaultFilters } = useQuery({
    queryKey: ["dashboard-filters"],
    queryFn: () => defaultFilters,
    staleTime: Infinity,
  });

  const setFilters = (next: DashboardFilters) => {
    qc.setQueryData(["dashboard-filters"], next);
  };

  return { filters: data, setFilters };
}