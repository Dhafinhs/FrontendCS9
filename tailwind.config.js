/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue700: "#1d4ed8",   // biru tua
        blue600: "#2563eb",   // biru kuat
        blue500: "#3b82f6",   // biru sedang
        blue400: "#60a5fa",   // biru muda
        blue300: "#93c5fd",   // biru pucat
        blue200: "#bfdbfe",   // biru pastel
        blue100: "#dbeafe",   // biru sangat muda
        blue50:  "#eff6ff",   // biru putih
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(59, 130, 246, 0.5)",
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        bounceIn: "bounceIn 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "60%": { opacity: 1, transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
