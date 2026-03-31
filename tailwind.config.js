/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,js}',
    './components/**/*.{ts,js,tsx}',
    './app/**/*.{ts,js}',
    './src/**/*.{ts,js}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    backgroundColor: {
      primary: "#262626",
      primaryBlur: "#26262690",
      secondary: "#E75300",
      ternary: "#8A1538",
      white: "#fff"
    },
    colors: {
      primary: "#262626",
      primaryBlur: "#26262660",
      secondary: "#E75300",
      ternary: "#8A1538",
      white: "#fff"
    },
    extend: {
      colors: {
        'theme-orange': '#e75300',
        'theme-red': '#8a1538',
      },
      backgroundImage: {
        'emblem-1': "url('/img/emblems/emblem-1.svg')",
        'emblem-2': "url('/img/emblems/emblem-2.svg')",
        'emblem-3': "url('/img/emblems/emblem-3.svg')",
        'emblem-4': "url('/img/emblems/emblem-4.svg')",
        'emblem-5': "url('/img/emblems/emblem-5.svg')",
        'emblem-white': "url('/img/grid-2.svg')",
        'campaign-content': "url('/img/campaign-content-big-back.svg')",
        'header-img': "url('/img/header-img.png')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shrink: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.9)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'shrink': 'shrink 2s infinite alternate',
      },
      fontFamily: {
        noto: ['"Noto Sans"', 'sans-serif'],
        'noto-arabic': ['"Noto Sans Arabic"', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}