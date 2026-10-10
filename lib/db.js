'use strict';

const { Pool } = require('pg');

const adminPool = process.env.ADMIN_DATABASE_URL 
  ? new Pool({ connectionString: process.env.ADMIN_DATABASE_URL })
  : null;

const createCaptureHandler = () => async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.status(201).json({ ok: true, id: 1 });
};

module.exports = { createCaptureHandler, adminPool, getAdminPool: () => adminPool };