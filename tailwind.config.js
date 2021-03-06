module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#FFA042',
        'manu-bg-opacity': 'rgba(0,0,0,0.5)',
        'modal-bg-opacity': 'rgba(0,0,0,0.8)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
