// Vercel serverless proxy to avoid mixed-content issues.
// Path: /api/_proxy/[...path] -> forwards to API_PROXY_TARGET or fallback.

module.exports = async function handler(req, res) {
  const path = (req.query && req.query.path) || [];
  const targetBase = (process.env.API_PROXY_TARGET || 'http://89.167.12.137:5000').replace(/\/$/, '');
  const targetPath = Array.isArray(path) ? path.join('/') : String(path || '');
  const url = new URL(`${targetBase}/${targetPath}`);

  // Forward query params except the catch-all param.
  for (const [key, value] of Object.entries(req.query || {})) {
    if (key === 'path') continue;
    url.searchParams.set(key, Array.isArray(value) ? value[0] : value);
  }

  const method = req.method || 'GET';
  const hasBody = !['GET', 'HEAD'].includes(method);

  const body =
    hasBody && req.body !== undefined
      ? Buffer.isBuffer(req.body)
        ? req.body
        : typeof req.body === 'string'
          ? req.body
          : JSON.stringify(req.body ?? {})
      : undefined;

  const headers = {
    ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
    ...(hasBody && req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {}),
    ...(req.headers.cookie ? { Cookie: req.headers.cookie } : {}),
  };

  const response = await fetch(url.toString(), {
    method,
    headers,
    body,
    redirect: 'manual',
  });

  // set-cookie: raw() may not exist in edge runtimes; use get.
  const setCookie = response.headers.get('set-cookie');
  if (setCookie) res.setHeader('set-cookie', setCookie);

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') return;
    res.setHeader(key, value);
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  res.status(response.status).send(buffer);
};
