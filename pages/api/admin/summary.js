import { getSubmissions, getSubmissionsSummary } from '../../../lib/db';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default async function handler(req, res) {
  const provided = req.headers['x-admin-key'] || '';
  if (provided !== ADMIN_KEY) return res.status(401).json({ error: 'Invalid or missing admin key.' });
  try {
    const summary = await getSubmissionsSummary();
    const submissions = await getSubmissions(8);
    res.json({ total: summary.total, uniqueUsernames: summary.uniqueUsernames, recent: submissions });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
}