/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./*html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'darkerGreen': '#1ED760',
        'green': '#1FDF64',
        'lighterBlack': '#121212',
        'innerBlack': '#1E1E1E',
        'gray': '#727272',
      },
      fontFamily: {
        'scb': 'Spotify Circular Black',
        'scbi': 'Spotify Circular Black I',
        'scbb': 'Spotify Circular Bold',
        'scbk': 'Spotify Circular Book',
        'scbki': 'Spotify Circular Book I',
        'scl': 'Spotify Circular Light',
        'scm': 'Spotify Circular Medium',
        'scmi': 'Spotify Circular Medium I'
      }
    },
  },
  variants: {
    extend: {
      textDecoration: [
        'hover',
        'group-hover',
      ],
    },
  },
  plugins: [
    // already included by default in tailwindcss v3.3 so i command this line
    // require('@tailwindcss/line-clamp'),
  ],
}

