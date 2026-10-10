import { getSubmissions } from '../../lib/db';
import { buildSubmissionsPdf } from '../../lib/admin';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) return res.status(401).json({ error: 'Invalid or missing admin key.' });

  try {
    const rows = await getSubmissions(1000);
    const buf = await buildSubmissionsPdf(rows);
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="submissions-' + stamp + '.pdf"');
    res.send(buf);
  } catch (e) {
    res.status(500).json({ error: 'PDF export failed.' });
  }
}