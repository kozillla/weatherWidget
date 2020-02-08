const proxy = require("http-proxy-middleware");
module.exports = app => {
  app.use(
    proxy("/api", {
      target: "https://www.metaweather.com/api/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
