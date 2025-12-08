/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Times New Roman', 'serif'], // ใช้ Times New Roman ให้เหมือนดีไซน์
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1a3c3c',    // เขียวเข้ม
          green: '#7a9e9f',   // เขียวกลาง
          light: '#eefcf6',   // พื้นหลังเขียวอ่อนๆ
          text: '#2d3748',
        }
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}