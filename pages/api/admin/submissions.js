import { getSubmissions } from '../../lib/db';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  // Check admin key
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Invalid or missing admin key.' });
  }

  try {
    if (req.method === 'GET') {
      const limit = Number(req.query.limit) || 100;
      const offset = Number(req.query.offset) || 0;

      const rows = await getSubmissions(limit, offset);
      return res.json({ count: rows.length, data: rows });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('[admin/submissions] Error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
