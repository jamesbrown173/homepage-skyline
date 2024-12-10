/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        morganite: ["Morganite", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        bdo: ["BDO Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
