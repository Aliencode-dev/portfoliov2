/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: { max: "350px" },
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      boxShadow: {
        card: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
        section: "inset 0px 1px 4px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
