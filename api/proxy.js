module.exports = async (req, res) => {
  const targetBase = process.env.API_PROXY_TARGET || "http://89.167.12.137:5000";
  const base = targetBase.replace(/\/$/, "");

  // В CRA удобнее передавать полный путь в query ?path=/api/...
  const path = (req.query && req.query.path) ? String(req.query.path) : "/";

  const url = new URL(base + path);

  // прокинуть остальные query (кроме path)
  Object.entries(req.query || {}).forEach(([k, v]) => {
    if (k === "path") return;
    url.searchParams.set(k, Array.isArray(v) ? v[0] : String(v));
  });

  const method = req.method || "GET";
  const hasBody = !["GET", "HEAD"].includes(method);

  const r = await fetch(url.toString(), {
    method,
    headers: {
      ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
      ...(hasBody && req.headers["content-type"] ? { "Content-Type": req.headers["content-type"] } : {}),
    },
    body: hasBody ? (typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {})) : undefined,
  });

  const buf = Buffer.from(await r.arrayBuffer());
  res.statusCode = r.status;
  res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
  res.end(buf);
};