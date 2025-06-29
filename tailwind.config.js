/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            p: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            'h1, h2, h3, h4': {
              color: '#111827',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
