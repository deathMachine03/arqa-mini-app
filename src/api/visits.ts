import type { Visit } from "@/types/visit";

/**
 * Загружает список визитов из локального JSON-файла.
 * @returns Promise<Visit[]>
 */
export const getVisits = async (): Promise<Visit[]> => {
  const res = await fetch("/data/visits.json");

  if (!res.ok) {
    throw new Error(`Ошибка загрузки visits.json: ${res.status}`);
  }

  const json = await res.json();
  return json.visits as Visit[];
};
