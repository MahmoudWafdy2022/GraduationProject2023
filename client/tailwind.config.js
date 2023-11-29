/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      maxWidth: {
        "1/2": "50%",
      },
      colors: {
        primary: "#ffffff",
        secondary: "#00f6ff",
        dimWhite: "rgba(1, 1, 1, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        txtColor: "#FF5353",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
    screens: {
      xs: {
        min: "1px",
        max: "768px",
      },
      // ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
      xxl: "1980px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["dark"],
  },
});
