import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      orders: "Orders",
      customers: "Customers",
      settings: "Settings",
      theme: "Theme",
      language: "Language",
    },
  },
  ru: {
    translation: {
      dashboard: "Дашборд",
      orders: "Заказы",
      customers: "Клиенты",
      settings: "Настройки",
      theme: "Тема",
      language: "Язык",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") ?? "ru",
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default i18n;
