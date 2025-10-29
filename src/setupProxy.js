const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function proxy(app) {
  const target = 'https://localhost:44361';

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
    }),
  );

  app.use(
    '/Gender',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
    }),
  );
};
