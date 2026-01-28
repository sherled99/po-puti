// Serverless proxy for Vercel to reach the HTTP backend without mixed content.
// Route: /backend/[...path] -> forwards to API_PROXY_TARGET (or default).

module.exports = async function handler(req, res) {
  const path = (req.query && req.query.path) || [];
  const targetBase = (process.env.API_PROXY_TARGET || 'http://89.167.12.137:5000').replace(/\/$/, '');
  const targetPath = Array.isArray(path) ? path.join('/') : String(path || '');
  const url = new URL(`${targetBase}/${targetPath}`);

  // Forward query params, excluding the catch-all param itself.
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

  // set-cookie: use safe getter (raw() can be absent in Vercel runtime).
  const setCookie = response.headers.get('set-cookie');
  if (setCookie) res.setHeader('set-cookie', setCookie);

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') return;
    res.setHeader(key, value);
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  res.status(response.status).send(buffer);
};
