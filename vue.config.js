module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/newman/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/config/_mixins.scss";'
      }
    }
  }
}
