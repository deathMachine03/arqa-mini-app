import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#0a0a0a",
        },
        card: {
          light: "#f5f5f5",
          dark: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
