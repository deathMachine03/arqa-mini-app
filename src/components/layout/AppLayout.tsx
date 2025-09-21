import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light text-black dark:bg-background-dark dark:text-white">
      <Header />
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
