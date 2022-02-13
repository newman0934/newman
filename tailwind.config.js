module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#FFA042'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
