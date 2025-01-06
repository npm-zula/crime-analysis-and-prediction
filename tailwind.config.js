/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        background: {
          light: "#ffffff",
          DEFAULT: "#f8fafc",
          dark: "#f1f5f9",
        },
        content: {
          primary: "#0f172a",
          secondary: "#475569",
          light: "#94a3b8",
        },
        accent: {
          blue: "#3b82f6",
          red: "#ef4444",
          yellow: "#f59e0b",
          green: "#10b981",
        },
      },
      boxShadow: {
        card: "0 0 20px rgba(0, 0, 0, 0.05)",
        hover: "0 0 30px rgba(0, 0, 0, 0.1)",
        "card-lg": "0 0 40px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scale: "scale 0.15s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scale: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
