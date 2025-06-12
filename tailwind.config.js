module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        'progress-stripes': 'progressStripes 1s linear infinite',
      },
      keyframes: {
        progressStripes: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '1rem 0' },
        },
      },
    },
  },
  plugins: [],
}