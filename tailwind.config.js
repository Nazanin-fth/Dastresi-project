// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "10px", 
      },
      screens: {
        sg: "1152px",
      },
    },
  },
  plugins: [],
}
