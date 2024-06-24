/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        blue: {
          50: "#ccdfff",
          100: "#1A71FF",
          200: "#0060FF",
          300: "#1E2757",
          400: "#25293B",
          500: "#292D32",
          600: "#1F2335",
          700: "#1C1F2E",
          800: "#161929",
          900: "#191c2a",
          1000: "rgb(23 37 84)",
        },
        red: {
          100: "#FFC8C8",
          300: "#EB5757",
          400: "#EE6E6E",
          500: "#FF4949",
        },
        white: {
          100: "#FFFFFF",
          200: "#CDD1D6",
          300: "#C4C8DA",
          400: "#A2A7B4",
          500: "#AFAFAF",
          600: "#DFEBFF",
          700: "#F6F6F6",
          800: "#E2E2E2",
          900: "#ececec",
        },
        gray: {
          100: "#9F9F9F",
          200: "#9E9E9E",
          300: "#7E7E7E",
          400: "#8D8F98",
          500: "#0000004d",
          600: "#ACACAC",
          700: "#D9D9D9",
          800: "#EAECED",
          900: "#242737",
        },
        black: {
          300: "#d7d7d7",
          400: "#646577",
          500: "#939393",
          600: "#373131",
        },
        transparent: {
          0: "transparent",
          50: "#ffffff0a",
          90: "#ffffff14",
          100: "#ffffff1a",
          200: "#ffffff4d",
          300: "#ffffff99",
          400: "#ffffff08",
          500: "#0F0E0E",
        },
        orange: {
          100: "#FF7337",
        },
      },
    },
  },
  plugins: [],
};

