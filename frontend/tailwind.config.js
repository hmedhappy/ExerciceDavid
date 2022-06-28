module.exports = {
  mode: "jit",
  purge: ['./src/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', "./src/**/**/*.{js,jsx,ts,tsx}'", './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      blue: '#1B57ED',
      blueLight: '#F0F5FB',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
