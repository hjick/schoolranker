const { createProxyMiddleware } = require("http-proxy-middleware");
const PORT = process.env.PORT || 5000;

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: `http://localhost:${PORT}`,
      target: `${process.env.REACT_APP_SERVER}:${PORT}`,
      changeOrigin: true,
    })
  );
};
