import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleLang = () => {
    const next = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    
    <div className="space-y-6 p-4">
<div className="p-6 rounded-lg bg-card-light dark:bg-card-dark">
  Hello Dark Mode
</div>

      <h1 className="text-xl font-semibold">{t("settings")}</h1>

      {/* Переключатель темы */}
      <div className="space-x-2">
        <span>{t("theme")}:</span>
        <Button
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
        >
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </Button>
      </div>

      {/* Переключатель языка */}
      <div className="space-x-2">
        <span>{t("language")}:</span>
        <Button variant="outline" onClick={toggleLang}>
          {i18n.language === "ru" ? "EN" : "RU"}
        </Button>
      </div>
    </div>
  );
}
