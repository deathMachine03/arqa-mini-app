import { render, screen, fireEvent } from "@testing-library/react";
import { OrdersTable } from "@/components/orders/OrdersTable";

const mockOrders = [
  {
    id: "ORD-1",
    date: "2025-08-01",
    customerId: "CUS-001",
    city: "Алматы",
    channel: "Web",
    status: "New",
    total: 1000,
    items: [],
    comment: "",
  },
  {
    id: "ORD-2",
    date: "2025-08-02",
    customerId: "CUS-002",
    city: "Астана",
    channel: "Mobile",
    status: "Processing",
    total: 2000,
    items: [],
    comment: "",
  },
];

test("поиск фильтрует заказы по ID", () => {
  render(<OrdersTable orders={mockOrders} />);

  expect(screen.getByText("ORD-1")).toBeInTheDocument();
  expect(screen.getByText("ORD-2")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/поиск/i), {
    target: { value: "ORD-1" },
  });

  expect(screen.getByText("ORD-1")).toBeInTheDocument();
  expect(screen.queryByText("ORD-2")).not.toBeInTheDocument();
});
