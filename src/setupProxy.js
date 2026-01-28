const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function proxy(app) {
  const target = process.env.REACT_APP_API_URL || 'http://89.167.12.137:5000';

  // In development we call the same relative path as production (/api/_proxy/*).
  // Strip the proxy prefix so requests hit the actual backend.
  app.use(
    '/api/_proxy',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api/_proxy': '' },
    }),
  );
};
