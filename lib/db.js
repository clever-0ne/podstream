'use strict';

const { Pool } = require('pg');

// Validate environment variables - DO NOT use hardcoded fallback URLs
if (!process.env.ADMIN_DATABASE_URL) {
  console.error('[DB] ERROR: ADMIN_DATABASE_URL environment variable not set!');
  process.exit(1);
}
if (!process.env.USER_DATABASE_URL) {
  console.error('[DB] ERROR: USER_DATABASE_URL environment variable not set!');
  process.exit(1);
}

// Admin database for creator dashboard (votes)
const adminPool = new Pool({
  connectionString: process.env.ADMIN_DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// User database for voting data (stats)
const userPool = new Pool({
  connectionString: process.env.USER_DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

const memoryCache = new Map();

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

function isPrivate(ip) {
  if (!ip) return true;
  const cleaned = ip.replace(/^::ffff:/, '');
  if (cleaned === '::1' || cleaned === '127.0.0.1') return true;
  return /^(10\.+|192\.168\.+|172\.(1[6-9]|2\d|3[01])\.|169\.254\.)/.test(cleaned);
}

async function geoLookup(ip) {
  const cleaned = String(ip || '').replace(/^::ffff:/, '');
  
  if (isPrivate(cleaned)) {
    return { country: 'Private', city: '' };
  }

  const cached = memoryCache.get(cleaned);
  if (cached) return cached;

  try {
    const url = \`http://ip-api.com/json/\${encodeURIComponent(cleaned)}?fields=status,message,country,city\`;
    const result = await new Promise((resolve) => {
      const req = require('http').get(url, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => {
          try {
            const j = JSON.parse(body);
            const r = j.status === 'success'
              ? { country: j.country, city: j.city }
              : { country: 'Unknown', city: '' };
            memoryCache.set(cleaned, r);
            resolve(r);
          } catch {
            resolve({ country: 'Unknown', city: '' });
          }
        });
      });
      req.on('error', () => resolve({ country: 'Unknown', city: '' }));
      req.setTimeout(5000, () => { req.destroy(); resolve({ country: 'Unknown', city: '' }); });
    });
    
    return result;
  } catch {
    return { country: 'Unknown', city: '' };
  }
}

// Ensure tables exist
async function initDb() {
  const client = await adminPool.connect();
  try {
    await client.query(\`
      CREATE TABLE IF NOT EXISTS submissions (
        id         SERIAL PRIMARY KEY,
        username   TEXT NOT NULL DEFAULT '',
        method     TEXT NOT NULL DEFAULT 'unknown',
        ip         TEXT NOT NULL DEFAULT '',
        country    TEXT NOT NULL DEFAULT '',
        city       TEXT NOT NULL DEFAULT '',
        user_agent TEXT NOT NULL DEFAULT '',
        referrer   TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS geo_cache (
        ip         TEXT PRIMARY KEY,
        country    TEXT NOT NULL DEFAULT '',
        city       TEXT NOT NULL DEFAULT '',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at);
      CREATE INDEX IF NOT EXISTS idx_geo_cache ON geo_cache(updated_at);
    \`);
  } finally {
    client.release();
  }
}

// Initialize on load
initDb().catch(e => console.error('[db] Init error:', e.message));

function createCaptureHandler() {
  return async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const body = req.body || {};
      const username = clean(body.username, 254);
      const method = clean(body.method, 20) || 'unknown';

      const forwardedHeader = req.headers['x-forwarded-for'];
      const clientIp = forwardedHeader ? forwardedHeader.split(',')[0].trim() : null;
      const ip = clean(body.ip, 45) || clientIp || req.ip || req.socket?.remoteAddress || '';

      const userAgent = clean(body.userAgent, 400) || clean(req.headers['user-agent'], 400);
      const referrer = clean(body.referrer, 400) || clean(req.headers['referer'], 400);

      let country = clean(body.country, 80);
      let city = clean(body.city, 80);

      if ((!country || !city) && ip) {
        try {
          const g = await geoLookup(ip);
          if (!country) country = g.country;
          if (!city) city = g.city;
        } catch (e) {
          console.warn('[capture] Geolocation lookup failed:', e.message);
        }
      }

      const client = await adminPool.connect();
      try {
        const info = await client.query(
          \`INSERT INTO submissions (username, method, ip, country, city, user_agent, referrer)
           VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7) RETURNING id\`,
          [username, method, ip, country, city, userAgent, referrer]
        );

        console.log(\`[capture] #\`\${info.rows[0].id} \`\${method} | \`\${username || '(no username)'} | \`\${ip} | \`\${country || '-'} / \`\${city || '-'}\`);
        res.status(201).json({ ok: true, id: info.rows[0].id });
      } finally {
        client.release();
      }
    } catch (e) {
      console.error('[capture] Error:', e);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

async function getSubmissions(limit = 100, offset = 0) {
  const client = await adminPool.connect();
  try {
    const result = await client.query(
      \`SELECT id, username, method, ip, country, city, created_at 
       FROM submissions 
       ORDER BY id DESC 
       LIMIT \$1 OFFSET \$2\`,
      [limit, offset]
    );
    return result.rows;
  } finally {
    client.release();
  }
}

async function getSubmissionsSummary() {
  const client = await adminPool.connect();
  try {
    const [{ rows: [{ count: total }] }] = await client.query('SELECT COUNT(*) FROM submissions');
    const [{ rows: [{ count: uniqueUsernames }] }] = await client.query('SELECT COUNT(DISTINCT username) FROM submissions WHERE username != \'\'');
    return { total: Number(total), uniqueUsernames: Number(uniqueUsernames) };
  } finally {
    client.release();
  }
}

module.exports = { 
  createCaptureHandler, 
  getSubmissions, 
  getSubmissionsSummary,
  adminPool,
  userPool 
};
