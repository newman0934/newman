module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#FFA042'
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero_header.jpg')"
      }
    }
  },
  plugins: []
}
