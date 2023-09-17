/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffc017",
        secondary: "#FFC947",
        softBlack: "#0e1111",
        charcoal: "#36454F",
        lightGrey: "#6B6B6B",
        darkGrey: "#242424",
        failure: "#EB5757",
      },
      boxShadow: {
        softShadowSpread: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
    },
  },
  plugins: [],
};
