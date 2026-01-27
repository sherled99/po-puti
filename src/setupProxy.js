const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function proxy(app) {
  const target = process.env.REACT_APP_API_URL || 'https://po-puti-service.onrender.com';

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
