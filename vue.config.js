module.exports = {
  publicPath: '/control-food-main/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/variables.scss";
          @import "@/scss/fonts.scss";
        `,
      },
    },
  },
};
