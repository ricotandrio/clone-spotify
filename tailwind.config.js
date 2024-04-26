/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./*html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        green: "#1FDF64",
        darkerGreen: "#1ED760",
        black: "#000000",
        "black-1": "#121212",
        "black-2": "#1E1E1E",
        "black-3": "#282828",
        "gray-1": "#727272",
        "gray-2": "#484848",
        "gray-3": "#3E3E3E",
      },
      fontFamily: {
        scb: "Spotify Circular Black",
        scbi: "Spotify Circular Black I",
        scbb: "Spotify Circular Bold",
        scbk: "Spotify Circular Book",
        scbki: "Spotify Circular Book I",
        scl: "Spotify Circular Light",
        scm: "Spotify Circular Medium",
        scmi: "Spotify Circular Medium I",
      },
    },
  },
  variants: {
    extend: {
      textDecoration: ["hover", "group-hover"],
    },
  },
  plugins: [
    // already included by default in tailwindcss v3.3 so i command this line
    // require('@tailwindcss/line-clamp'),
  ],
};
