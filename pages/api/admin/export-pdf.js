import { getDb } from '../../lib/capture';
import { buildSubmissionsPdf } from '../../lib/admin';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  // Check admin key
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Invalid or missing admin key.' });
  }

  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM submissions ORDER BY id ASC').all();
    const buf = await buildSubmissionsPdf(rows);

    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="honeypot-records-${stamp}.pdf"`);
    res.setHeader('Content-Length', buf.length);
    res.send(buf);
  } catch (e) {
    console.error('[export-pdf] Error:', e);
    res.status(500).json({ error: 'PDF export failed.' });
  }
}