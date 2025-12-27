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
          surface: {
            base: "#ffffff",
            secondary: "#f8f9fa",
            footer: "#f3f4f6",
            sidebar: "#fbfbfc"
          },
          text: {
            primary: "#3a3a3a",
            heading: "#111111",
            muted: "#6b6b6b",
            footer: "#4a4a4a"
          },
          border: {
            base: "#e0e0e0",
            header: "#eaeaea"
          },
          accent: {
            primary: "#8bc34a",
            hover: "#649130",
            soft: "#e6f4ea"
          }
        },
        canvas: {
          base: "#ffffff",
          muted: "#f8f9fa"
        }
      },
      boxShadow: {
        header: "0 4px 12px rgba(15, 23, 42, 0.08)",
        sidebar: "0 0 10px 0 rgba(35, 31, 32, 0.1)"
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.brand.text.primary"),
            maxWidth: "65ch",
            a: {
              color: theme("colors.brand.accent.primary"),
              textDecoration: "none",
              '&:hover': {
                color: theme("colors.brand.accent.hover"),
                textDecoration: "underline",
                textDecorationColor: theme("colors.brand.accent.hover"),
              },
            },
            h1: {
              color: theme("colors.brand.text.heading"),
              scrollMarginTop: theme("spacing.24"),
              a: {
                color: theme("colors.brand.text.heading"),
                textDecoration: "none",
              },
              'a:hover': {
                color: theme("colors.brand.accent.hover"),
                textDecoration: "none",
              },
            },
            h2: {
              color: theme("colors.brand.text.heading"),
              scrollMarginTop: theme("spacing.24"),
              a: {
                color: theme("colors.brand.text.heading"),
                textDecoration: "none",
              },
              'a:hover': {
                color: theme("colors.brand.accent.hover"),
                textDecoration: "none",
              },
            },
            h3: {
              color: theme("colors.brand.text.heading"),
              scrollMarginTop: theme("spacing.24"),
              a: {
                color: theme("colors.brand.text.heading"),
                textDecoration: "none",
              },
              'a:hover': {
                color: theme("colors.brand.accent.hover"),
                textDecoration: "none",
              },
            },
            h4: {
              color: theme("colors.brand.text.heading"),
              scrollMarginTop: theme("spacing.24"),
              a: {
                color: theme("colors.brand.text.heading"),
                textDecoration: "none",
              },
              'a:hover': {
                color: theme("colors.brand.accent.hover"),
                textDecoration: "none",
              },
            },
            blockquote: {
              borderLeftColor: theme("colors.brand.accent.primary"),
              color: theme("colors.brand.text.primary"),
            },
            code: {
              color: theme("colors.brand.text.heading"),
              fontWeight: "600",
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: theme("colors.brand.surface.secondary"),
              color: theme("colors.brand.text.primary"),
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
