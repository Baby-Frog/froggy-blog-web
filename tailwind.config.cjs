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
        normalGreen: "#1DC071",
        normalGreenHover: "#4ACD8D",
      },
      boxShadow: {
        defaultShadowSpread: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        softShadowSpread: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
    },
  },
  plugins: [],
};
