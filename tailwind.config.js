/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      boxShadow: {
        "grey-1": "1px 1px 0 0 #3D3D3D",
        "grey-2": "2px 2px 0 0 #3D3D3D",
        "grey-4": "4px 4px 0 0 #3D3D3D",
        "grey-6": "6px 6px 0 0 #3D3D3D",
        "grey-8": "8px 8px 0 0 #3D3D3D",
        "black-1": "1px 1px 0 0 black",
        "black-2": "2px 2px 0 0 black",
        "black--2": " -2px 2px 0 0 black",
        "black-4": "4px 4px 0 0 black",
        "black-6": "6px 6px 0 0 black",
        "black-8": "8px 8px 0 0 black",
        "orange-2": "2px 2px 0 0 #F5854E",
        "orange-4": "4px 4px 0 0 #F5854E",
        "orange-6": "6px 6px 0 0 #F5854E",
        "orange-8": "8px 8px 0 0 #F5854E",
        "yellowish-2": "2px 2px 0 0 #F9A101",
        "yellowish-4": "4px 4px 0 0 #F9A101",
        "yellowish-6": "6px 6px 0 0 #F9A101",
        "yellowish-8": "8px 8px 0 0 #F9A101",
        "burgendy-2": "2px 2px 0 0 #773439",
        "burgendy-4": "4px 4px 0 0 #773439",
        "burgendy-6": "6px 6px 0 0 #773439",
        "burgendy-8": "8px 8px 0 0 #773439",
        "purple-2": "2px 2px 0 0 #C73371",
        "purple-4": "4px 4px 0 0 #C73371",
        "purple-6": "6px 6px 0 0 #C73371",
        "purple-8": "8px 8px 0 0 #C73371",
      },
      fontFamily: {
        "roboto-flex": ["Roboto Flex", "sans-serif"],
      },
      colors: {
        bg: {
          1: "#FFD7C3",
          2: "#F2E1D0",
        },
        beige: "#FFEAB9",
        white: "#FEF9EF",
        white2: "#FFF8F5",
        grey: "#3D3D3D",
      },
      borderRadius: {
        "4xl": "2.5rem",
        "5xl": "4rem",
      },
      height: {
        100: "26rem",
        90: "21rem",
      },
      maxHeight: {
        100: "26rem",
      },
      width: {
        34:"140px",
        39: "162px",
        49: "194px",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
