const typography = require("@tailwindcss/typography");

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
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.slate.800"),
            maxWidth: "65ch",
            a: {
              color: theme("colors.brand.accent"),
              '&:hover': {
                color: theme("colors.sky.500"),
              },
            },
            h2: {
              color: theme("colors.slate.900"),
              scrollMarginTop: theme("spacing.24"),
            },
            h3: {
              color: theme("colors.slate.900"),
              scrollMarginTop: theme("spacing.24"),
            },
            blockquote: {
              borderLeftColor: theme("colors.brand.accent"),
              color: theme("colors.slate.700"),
            },
            code: {
              color: theme("colors.slate.900"),
              fontWeight: "600",
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: theme("colors.slate.900"),
              color: theme("colors.white"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.xl"),
            },
            img: {
              borderRadius: theme("borderRadius.xl"),
              boxShadow: theme("boxShadow.xl"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};