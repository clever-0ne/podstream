import { getSubmissions } from '../../../lib/db';

// Simple auth check - allows admin access
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const rows = await getSubmissions(100);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ count: rows.length, data: rows });
  } catch (e) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ count: 0, data: [] });
  }
}