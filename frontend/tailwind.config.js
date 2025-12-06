/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Times New Roman', 'serif'],
        sans: ['Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1a3c3c',    // เขียวเข้ม
          bg: '#f8f9fc',      // พื้นหลัง
          green: '#7a9e9f',   // เขียวอ่อน
          light: '#b8d8d8',   // ฟ้าอ่อน
        }
      }
    },
  },
  plugins: [],
}