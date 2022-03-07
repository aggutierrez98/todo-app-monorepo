// Tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        cellphone: "400px",
      },
      width: {
        500: "500px",
        700: "700px",
        1200: "1200px",
      },
      boxShadow: {
        sh: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        mh: "rgba(0, 0, 0, 0.35) 0px 5px 30px",
      },
      marginRight: {
        "mr-50-": "-50%",
      },
      fontSize: {
        "40px": "48px !important",
        "20px": "28px !important",
      },
      backgroundColor: {
        over: " rgba(0, 0, 0, .3)",
      },
      animation: {
        fadeIn: "fadeIn 0.15s ease-in-out both",
      },
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }),
      spacing: {
        "-50": "-50%",
      },
      outline: {
        "custom-light": "3px solid black",
        "custom-dark": "3px solid white",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
};
