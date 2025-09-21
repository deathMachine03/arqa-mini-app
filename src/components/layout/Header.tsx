import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Header() {
  const [lang, setLang] = useState<"ru" | "en">("ru");

  // Восстанавливаем из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "ru" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    const next = lang === "ru" ? "en" : "ru";
    setLang(next);
    localStorage.setItem("lang", next);
    // здесь можно дернуть i18n.changeLanguage(next), если используешь i18next
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          ARQA Analytics
        </Link>

        {/* Навигация */}
        <nav className="hidden gap-6 md:flex">
          <Link to="/" className="text-sm font-medium hover:underline">
            {lang === "ru" ? "Дашборд" : "Dashboard"}
          </Link>
          <Link to="/orders" className="text-sm font-medium hover:underline">
            {lang === "ru" ? "Заказы" : "Orders"}
          </Link>
          <Link to="/customers" className="text-sm font-medium hover:underline">
            {lang === "ru" ? "Клиенты" : "Customers"}
          </Link>
          <Link to="/settings" className="text-sm font-medium hover:underline">
            {lang === "ru" ? "Настройки" : "Settings"}
          </Link>
        </nav>

        {/* Действия справа */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={toggleLang}>
            {lang.toUpperCase()}
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
