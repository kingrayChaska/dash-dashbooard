/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-from-top-2": {
          "0%": { transform: "translateY(-0.5rem)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        in: "fade-in 0.2s ease-out",
      },
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
        tertiary: "#f59e0b",
        neutral: "#f3f4f6",
        dark: "#1f2937",
      },
    },
  },
  plugins: [],
};
