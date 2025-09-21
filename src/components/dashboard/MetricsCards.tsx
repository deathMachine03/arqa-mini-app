import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingBag, BarChart, Percent } from "lucide-react";


interface MetricsCardsProps {
  revenue: number;
  orders: number;
  aov: number;
  conversion: number;
}

export function MetricsCards({ revenue, orders, aov, conversion }: MetricsCardsProps) {
  const items = [
    {
      title: "Revenue",
      value: revenue.toLocaleString(),
      icon: <DollarSign className="h-5 w-5 opacity-80" />,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Orders",
      value: orders.toLocaleString(),
      icon: <ShoppingBag className="h-5 w-5 opacity-80" />,
      gradient: "from-sky-400 to-sky-600",
    },
    {
      title: "AOV",
      value: aov.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      icon: <BarChart className="h-5 w-5 opacity-80" />,
      gradient: "from-violet-400 to-violet-600",
    },
    {
      title: "Conversion",
      value: conversion.toFixed(1) + "%",
      icon: <Percent className="h-5 w-5 opacity-80" />,
      gradient: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.title}
          className={`rounded-2xl bg-gradient-to-br ${item.gradient}
            p-5 text-white shadow-lg transition-transform duration-300
            hover:scale-[1.03] animate-fadeIn`}
        >
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="font-semibold">{item.title}</span>
            </div>
            <p className="text-2xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
