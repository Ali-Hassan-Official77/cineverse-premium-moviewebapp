/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#EFF1EC",
          soft: "#F7F8F5",
        },
        ink: {
          DEFAULT: "#15181C",
          dim: "#565C63",
          faint: "#8B9096",
        },
        cobalt: {
          DEFAULT: "#1D3E8C",
          bright: "#2E56B8",
          deep: "#12295E",
        },
        ochre: {
          DEFAULT: "#D98E2B",
          bright: "#EBA542",
          deep: "#96601A",
        },
        line: "#D8DAD4",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        body: ["var(--font-worksans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(21,24,28,0.04), 0 12px 24px -16px rgba(21,24,28,0.18)",
        lift: "0 20px 40px -20px rgba(21,24,28,0.28)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
