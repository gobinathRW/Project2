/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        default:'0px 0px 17.5px 0px rgba(208, 208, 208, 0.3)',
      },
    },
  },
  plugins: [],
}
