import { render, screen } from "@testing-library/react";
import { MetricsCards } from "@/components/dashboard/MetricsCards";

test("рендерит все карточки метрик", () => {
  render(
    <MetricsCards revenue={1000} orders={5} aov={200} conversion={50} />
  );

  expect(screen.getByText("Revenue")).toBeInTheDocument();
  expect(screen.getByText("Orders")).toBeInTheDocument();
  expect(screen.getByText("AOV")).toBeInTheDocument();
  expect(screen.getByText("Conversion")).toBeInTheDocument();

  expect(screen.getByText("1,000")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("200")).toBeInTheDocument();
  expect(screen.getByText("50.0%")).toBeInTheDocument();
});
