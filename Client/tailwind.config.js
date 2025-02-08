/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Inter", "sans-serif"],
      },
    },
    fontSize: {
      xsm: "0.65rem",
      xs: "0.75rem",
      sm: "0.875rem",
      xxl: "4rem",
    },
  },
  plugins: [],
};
