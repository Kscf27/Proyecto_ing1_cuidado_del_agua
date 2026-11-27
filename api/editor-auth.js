const crypto = require('crypto');

const COOKIE_NAME = 'aquamind_editor_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 horas

function sha256Buffer(value) {
  return crypto.createHash('sha256').update(String(value), 'utf8').digest();
}

function safeEqual(a, b) {
  return crypto.timingSafeEqual(sha256Buffer(a), sha256Buffer(b));
}

function getSigningKey() {
  const explicitSecret = process.env.EDITOR_SESSION_SECRET;
  if (explicitSecret && explicitSecret.length >= 16) {
    return explicitSecret;
  }
  const fallbackSeed = `${process.env.EDITOR_USER || ''}:${process.env.EDITOR_PASSWORD || ''}:aquamind-poster-v1`;
  return crypto.createHash('sha256').update(fallbackSeed, 'utf8').digest('hex');
}

function signToken(username) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ u: username, exp: expiresAt }), 'utf8').toString('base64url');
  const signature = crypto.createHmac('sha256', getSigningKey()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', getSigningKey()).update(payload).digest('base64url');
  if (!safeEqual(signature, expectedSig)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!decoded || typeof decoded.exp !== 'number') return false;
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    cookies[key] = decodeURIComponent(val);
  });
  return cookies;
}

function buildCookieHeader(req, value, maxAgeSeconds) {
  const isHttps =
    req.headers['x-forwarded-proto'] === 'https' ||
    process.env.VERCEL === '1' ||
    process.env.NODE_ENV === 'production';

  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${maxAgeSeconds}`
  ];
  if (isHttps) parts.push('Secure');
  return parts.join('; ');
}

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string' && req.body.length > 0) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 10000) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const expectedUser = process.env.EDITOR_USER;
  const expectedPass = process.env.EDITOR_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return res.status(503).json({
      authenticated: false,
      code: 'ENV_NOT_CONFIGURED',
      error: 'Variables de entorno EDITOR_USER y EDITOR_PASSWORD no configuradas en el servidor.'
    });
  }

  if (req.method === 'GET') {
    const cookies = parseCookies(req.headers.cookie);
    const authenticated = verifyToken(cookies[COOKIE_NAME]);
    return res.status(200).json({ authenticated });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', buildCookieHeader(req, '', 0));
    return res.status(200).json({ authenticated: false });
  }

  if (req.method === 'POST') {
    const body = await readJsonBody(req);
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!username || !password) {
      return res.status(400).json({
        authenticated: false,
        code: 'MISSING_FIELDS',
        error: 'Ingresa usuario y contraseña.'
      });
    }

    const userMatches = safeEqual(username, expectedUser);
    const passMatches = safeEqual(password, expectedPass);

    if (!userMatches || !passMatches) {
      return res.status(401).json({
        authenticated: false,
        code: 'INVALID_CREDENTIALS',
        error: 'Usuario o contraseña incorrectos.'
      });
    }

    const token = signToken(expectedUser);
    res.setHeader('Set-Cookie', buildCookieHeader(req, token, SESSION_TTL_SECONDS));
    return res.status(200).json({ authenticated: true });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ authenticated: false, error: 'Método no permitido.' });
};
