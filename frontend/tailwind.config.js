module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  important: true,
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ["Monoton", "serif"],
    },
    colors: {
      transparent: "transparent",
      danger: "#bb2124",
      success: "#22bb33",
      warn: "#f0ad4e",
      white: '#fff',
      basic: {
        50: "#fefefe",
        100: "#fcfcfc",
        200: "#fafafa",
        300: "#f7f7f7",
        400: "#f6f6f6",
        500: "#f4f4f4",
        600: "#f3f3f3",
        700: "#f1f1f1",
        800: "#efefef",
        900: "#ececec",
      },
      primary: {
        50: "#fceaee",
        100: "#f9cbd4",
        200: "#f5a9b7",
        300: "#f0869a",
        400: "#ed6c85",
        500: "#ea526f",
        600: "#e74b67",
        700: "#e4415c",
        800: "#e13852",
        900: "#db2840",
      },
      secondary: {
        50: "#e2e3e5",
        100: "#b7b9bf",
        200: "#878b95",
        300: "#575d6a",
        400: "#333a4a",
        500: "#0f172a",
        600: "#0d1425",
        700: "#0b111f",
        800: "#080d19",
        900: "#04070f",
      },
      blue: {
        50: "#eaf6fc",
        100: "#c9e8f8",
        200: "#a6d9f3",
        300: "#82c9ee",
        400: "#67beea",
        500: "#4cb2e6",
        600: "#45abe3",
        700: "#3ca2df",
        800: "#3399db",
        900: "#248ad5",
      },
      pink: {
        50: "#fceaee",
        100: "#f9cbd4",
        200: "#f5a9b7",
        300: "#f0869a",
        400: "#ed6c85",
        500: "#ea526f",
        600: "#e74b67",
        700: "#e4415c",
        800: "#e13852",
        900: "#db2840",
      },
      purple: {
        50: "#f5edfa",
        100: "#e7d3f2",
        200: "#d7b6ea",
        300: "#c699e2",
        400: "#ba83db",
        500: "#ae6dd5",
        600: "#a765d0",
        700: "#9d5aca",
        800: "#9450c4",
        900: "#843eba",
      },
      orange: {
        50: "#fff1eb",
        100: "#ffdcce",
        200: "#ffc5ad",
        300: "#ffad8c",
        400: "#ff9c74",
        500: "#ff8a5b",
        600: "#ff8253",
        700: "#ff7749",
        800: "#ff6d40",
        900: "#ff5a2f",
      },
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
      boxShadow: {
        thick: "3px 3px 0px rgba(0, 0,0,1) ",
        thin: "2px 2px 0px rgba(0, 0,0,1) ",
      },
    },
  },
  plugins: [],
};
