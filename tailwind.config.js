module.exports = {
  content: [
    "./layouts/**/*.{html,htm,tmpl}",
    "./content/**/*.{html,md}",
    "./assets/js/**/*.{js,ts}",
    "./data/**/*.{json,toml,yaml,yml}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: "#0f172a",
          accent: "#38bdf8",
          text: "#f8fafc"
        },
        canvas: {
          base: "#ffffff",
          muted: "#f8fafc"
        }
      },
      boxShadow: {
        header: "0 4px 12px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};