import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-brand-primary)",
          surface: "var(--color-brand-surface)",
          accent: "var(--color-brand-accent)",
        },
        info: "var(--color-brand-accent)",
        danger: "var(--color-status-danger)",
        success: "var(--color-status-success)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
      boxShadow: {
        brand: "var(--shadow-elevated)",
      },
      borderRadius: {
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        sans: ["'InterVariable'", ...fontFamily.sans],
        numeric: ["'JetBrains Mono'", ...fontFamily.mono],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
