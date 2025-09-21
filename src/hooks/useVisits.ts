import { useQuery } from "@tanstack/react-query";
import { getVisits } from "@/api/visits";
import type { Visit } from "@/types/visit";

export const useVisits = () =>
  useQuery<Visit[]>({
    queryKey: ["visits"],
    queryFn: getVisits,
  });
