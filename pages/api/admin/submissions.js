import { getSubmissions } from '../../../lib/db';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) return res.status(401).json({ error: 'Invalid or missing admin key.' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const rows = await getSubmissions(100);
    res.json({ count: rows.length, data: rows });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
}