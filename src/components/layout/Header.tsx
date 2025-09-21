import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";



export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          ARQA Analytics
        </Link>

        {/* Навигация */}
        <nav className="hidden gap-6 md:flex">
          <Link to="/" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>
          <Link to="/orders" className="text-sm font-medium hover:underline">
            Orders
          </Link>
          <Link to="/customers" className="text-sm font-medium hover:underline">
            Customers
          </Link>
          <Link to="/settings" className="text-sm font-medium hover:underline">
            Settings
          </Link>
        </nav>

        {/* Действия справа */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" variant="outline">
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
}
