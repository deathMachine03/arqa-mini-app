// Разрешаем безопасные примитивы и Date (сконвертируем в строку)
export type CsvCell = string | number | boolean | null | undefined | Date;
export type CsvRow = Record<string, CsvCell>;
