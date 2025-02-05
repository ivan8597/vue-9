const { configure } = require('quasar/wrappers');

module.exports = configure(function (ctx) {
  return {
    css: [
  
    ],
    framework: {
      config: {},
      plugins: [], 
    },
    build: {
      vueRouterMode: 'history', 
    },
    devServer: {
      port: 8080,
      open: true,
    },
  };
});