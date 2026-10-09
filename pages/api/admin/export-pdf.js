import { getSubmissions } from '../../lib/db';
import { buildSubmissionsPdf } from '../../lib/admin';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Invalid or missing admin key.' });
  }

  try {
    const rows = await getSubmissions(1000);
    const buf = await buildSubmissionsPdf(rows.map(r => ({
      id: r.id,
      username: r.username,
      method: r.method,
      ip: r.ip,
      country: r.country,
      city: r.city,
      user_agent: r.user_agent,
      referrer: r.referrer,
      created_at: r.created_at
    })));

    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="submissions-${stamp}.pdf"`);
    res.setHeader('Content-Length', buf.length);
    res.send(buf);
  } catch (e) {
    console.error('[export-pdf] Error:', e);
    res.status(500).json({ error: 'PDF export failed.' });
  }
}
