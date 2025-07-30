/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        biru1: "#0096dc",
        biru2: "#4ba8e2",
        hijau1: "#1CCB8C",
        hijau2: "#1cca93",
        kuning1: "#f6d12c",
        merah1: "#ff6e61",
        toska1: "#50e2c3",
      },
    },
  },
  plugins: [],
}