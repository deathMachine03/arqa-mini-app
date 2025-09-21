import { render, screen, fireEvent } from "@testing-library/react";
import { FiltersSheet } from "@/components/dashboard/FiltersSheet";

// Мокаем useDashboardFilters, чтобы не зависеть от localStorage
jest.mock("@/hooks/useDashboardFilters", () => ({
  useDashboardFilters: () => ({
    filters: { startDate: "", endDate: "", city: "", channel: "" },
    setFilters: jest.fn(),
  }),
}));

test("открывает панель фильтров", () => {
  render(<FiltersSheet />);

  fireEvent.click(screen.getByText(/фильтры/i));

  expect(screen.getByText("Дата от")).toBeInTheDocument();
  expect(screen.getByText("Город")).toBeInTheDocument();
});
