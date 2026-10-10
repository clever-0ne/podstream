const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Invalid or missing admin key.' });
  }

  if (req.method === 'POST' && req.body?.newKey) {
    res.json({ ok: true, message: 'Admin key changed.' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}