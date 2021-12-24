module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#131312",
        paper: "#171717",
        white: "#FEFFFE",
        purple: "#531640",
        player: "#181818",
        primary: "#1DB954",
        gray: "#B2B2B3",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
};
