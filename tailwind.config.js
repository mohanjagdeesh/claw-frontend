/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "500px",
        md: "768px",
        lg: "1300px",
      },
      padding: {
        DEFAULT: "16px",
        sm: "20px",
        md: "94px",
        lg: "60px",
      },
    },
    extend: {
      screens: {
        sm: "500px",
        md: "768px",
        lg: "1300px",
      },
      colors: {
        "color-1": "#F8F8F8",
        "color-2": "#636364",
        "color-3": "#C4C4C4",
        "color-4": "#EA454C",
        "color-5": "#FC0307",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
