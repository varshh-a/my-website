/** @type {import('tailwindcss').Config} */
export default 
{
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   
theme: {
  extend: {
    colors: {
      primary: {
        50: "#FAF5E4",  // Light cream
        100: "#F5E6CC",
        200: "#EDD2AA",
        300: "#E3BC84",
        400: "#D89E4A", // Golden ochre
        500: "#C68532",
        600: "#A56629",
        700: "#814D22",
        800: "#613A1A",
        900: "#402611", // Dark walnut
      },
      secondary: {
        50: "#E7F3F1",  // Soft mint
        100: "#C9E7E4",
        200: "#9FD5D1",
        300: "#74C2BD",
        400: "#46AFA9", // Teal jade
        500: "#32948F",
        600: "#28766F",
        700: "#1E5953",
        800: "#153D38",
        900: "#0B201E", // Deep forest green
      },
      accent: {
        50: "#FBEDE8",  // Terracotta light
        100: "#F8D9C7",
        200: "#F3BFA0",
        300: "#ECA278",
        400: "#E48250", // Clay orange
        500: "#C36A40",
        600: "#9D5233",
        700: "#7A3E28",
        800: "#562A1D",
        900: "#321710", // Burnt brown
      },
    },
    fontFamily: {
      sans: ['"Poppins"', 'system-ui', 'sans-serif'], // Clean, professional font
    },
  },
},
}