const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function proxy(app) {
  const target = process.env.REACT_APP_API_URL || 'http://89.167.12.137:5000';

  // In development we mimic production proxy: /api/proxy?path=/api/...
  app.use(
    '/api/proxy',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      pathRewrite: (path, req) => {
        const requestedPath = req.query?.path;
        if (Array.isArray(requestedPath)) {
          return requestedPath[0] || '/';
        }
        if (typeof requestedPath === 'string') {
          return requestedPath || '/';
        }
        // Fallback: strip the proxy prefix if no explicit path provided.
        return path.replace(/^\/api\/proxy/, '') || '/';
      },
      onProxyReq: (proxyReq) => {
        // Remove the helper query parameter before forwarding.
        const rewritten = new URL(proxyReq.path, target);
        rewritten.searchParams.delete('path');
        proxyReq.path = `${rewritten.pathname}${rewritten.search}`;
      },
    }),
  );
};
