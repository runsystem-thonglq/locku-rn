/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".{js,jsx,ts,tsx}",
    "./public/index.html",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./App.tsx"],
  theme: {
    extend: {
      colors: {
        'yellow': "#123452",
        'black': "#000",
        'w': "#fff",
        'gray-100': "#f5f5f5",
        'gray-200': "#e0e0e0",
        'gray-300': "#c0c0c0",
        'gray-400': "#a0a0a0",
        'gray-500': "#808080",
        'gray-600': "#606060",
        'gray-700': "#404040",
        'gray-800': "#202020",
        'gray-900': "#000000",
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")]// Add the NativeWind preset here
}

