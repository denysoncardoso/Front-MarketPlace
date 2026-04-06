/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        pharmacy: '#10b981',
        supplier: '#6366f1',
      }
    },
  },
  plugins: [],
}
