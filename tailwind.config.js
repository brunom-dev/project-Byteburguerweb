/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
        'sans': ['Inter', 'sans-serif']
    },
    extend: {
        backgroundImage: {
            "home": "url('/assets/images/background/back.jpg')"
        }
    },
  },
  plugins: [],
}

