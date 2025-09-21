import { useCustomers } from "@/hooks/useCustomers";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { Loader2 } from "lucide-react";

export default function Customers() {
  const { data, isLoading, isError } = useCustomers();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-red-600">Ошибка загрузки клиентов</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Customers</h1>
      {data && <CustomersTable customers={data} />}
    </div>
  );
}
