/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        niceItalic: ["Roboto", "sans-serif"],
      },
      screens: {
        ipad: { max: "1023px" },
      },

      colors: {
        primary: "#ffc017",
        secondary: "#FFC947",
        softBlack: "#0e1111",
        charcoal: "#36454F",
        whiteF2: "#F2F2F2",
        normalGrey: "#6B6B6B",
        lightGrey: "#6B6B6B",
        darkGrey: "#242424",
        failure: "#EB5757",
        normalGreen: "#1a8917",
        normalGreenHover: "#156d12",
      },
      boxShadow: {
        niceShadowSpread: "rgba(99, 99, 99, 0.3) 0px 2px 8px 0px",
        defaultShadowSpread: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        softShadowSpread: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
    },
  },
  plugins: [],
};
