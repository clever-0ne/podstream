'use strict';

const { Pool } = require('pg');

const adminPool = process.env.ADMIN_DATABASE_URL 
  ? new Pool({ connectionString: process.env.ADMIN_DATABASE_URL })
  : null;

async function getSubmissions(limit = 100, offset = 0) {
  if (!adminPool) return [];
  const client = await adminPool.connect();
  try {
    const result = await client.query('SELECT id, username, method, ip, country, city, created_at FROM submissions ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset]);
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
  res.status(201).json({ ok: true, id: 1 });
};

module.exports = { createCaptureHandler, getSubmissions, getSubmissionsSummary, adminPool };
