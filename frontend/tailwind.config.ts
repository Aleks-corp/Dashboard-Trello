/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        m24px: "-24px",
        m8px: "-8px",
        calcmodh: "calc(100vh - 24px)",
        calcmodw: "calc(100vw - 24px)",
        calclisth: "calc(100vh - 80px)",
      },
      flex: {
        "240": "0 0 240px",
      },
    },
  },
  plugins: [],
};
