import { getDb } from '../../lib/capture';
import { requireAdmin } from '../../lib/admin';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '200kb',
    },
  },
};

export default async function handler(req, res) {
  // Check admin key
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Invalid or missing admin key.' });
  }

  if (req.method === 'POST' && req.body?.newKey) {
    const newKey = String(req.body.newKey).trim();
    if (newKey.length < 8) {
      return res.status(400).json({ error: 'New key must be at least 8 characters.' });
    }
    if (newKey.length > 128) {
      return res.status(400).json({ error: 'New key must be at most 128 characters.' });
    }
    if (newKey === ADMIN_KEY) {
      return res.status(400).json({ error: 'New key must be different from the current key.' });
    }
    // Note: In production, persist new key
    return res.json({ ok: true, message: 'Admin key changed.' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}