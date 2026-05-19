import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        app: {
          DEFAULT: "#0a0c1c",
          panel: "#12152a",
          panel2: "#181b33",
          border: "#23263d",
          subtle: "#1c1f38",
        },
        ink: {
          DEFAULT: "#e6e7f0",
          muted: "#8b8fa8",
          dim: "#5d6080",
        },
        brand: {
          violet: "#7c5cff",
          violet2: "#6d4dff",
          purple: "#8b5cf6",
          pink: "#ec4899",
          orange: "#f59e0b",
          green: "#10b981",
          red: "#ef4444",
          blue: "#3b82f6",
        },
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124, 92, 255, 0.55)",
        panel: "0 10px 30px -10px rgba(0,0,0,0.45)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 220ms ease-out",
        "fade-in": "fade-in 180ms ease-out",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
      },
    },
  },
  plugins: [animate],
};

export default config;
