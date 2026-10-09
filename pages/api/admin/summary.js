import { getSubmissionsSummary, getSubmissions } from '../../lib/db';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  // Check admin key
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Invalid or missing admin key.' });
  }

  try {
    const summary = await getSubmissionsSummary();
    const submissions = await getSubmissions(8);
    
    const response = {
      total: summary.total,
      uniqueUsernames: summary.uniqueUsernames,
      byCountry: [],
      byCity: [],
      byMethod: [],
      recent: submissions.map(s => ({
        username: s.username,
        method: s.method,
        country: s.country,
        city: s.city,
        created_at: s.created_at
      }))
    };

    res.json(response);
  } catch (e) {
    console.error('[admin/summary] Error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
