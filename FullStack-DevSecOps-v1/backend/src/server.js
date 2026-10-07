import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { z } from 'zod';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 4000);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(',').map(s => s.trim()) || '*' }));
app.use(express.json({ limit: '32kb' }));

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  businessName: z.string().trim().max(150).optional().default(''),
  phone: z.string().trim().regex(/^[+0-9 ()-]{8,20}$/),
  email: z.string().trim().email().max(200).optional().or(z.literal('')).default(''),
  businessType: z.string().trim().max(80).optional().default(''),
  requirement: z.string().trim().min(5).max(1000)
});

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok', database: 'ok' }); }
  catch { res.status(503).json({ status: 'degraded', database: 'unavailable' }); }
});

app.get('/api/services', (_req, res) => res.json([
  { id: 1, name: 'MARG ERP', description: 'Billing, accounting, GST and inventory solutions.' },
  { id: 2, name: 'Hospital Management', description: 'OPD, IPD, laboratory and hospital workflows.' },
  { id: 3, name: 'Restaurant Management', description: 'Billing, tables, kitchen and restaurant operations.' },
  { id: 4, name: 'POS & Billing Machines', description: 'Reliable billing hardware and software support.' }
]));

app.post('/api/leads', async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Please check the submitted details.' });
  const { name, businessName, phone, email, businessType, requirement } = parsed.data;
  try {
    const result = await pool.query(
      `INSERT INTO leads (name,business_name,phone,email,business_type,requirement) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, created_at`,
      [name, businessName, phone, email, businessType, requirement]
    );
    res.status(201).json({ message: 'Thank you. Your enquiry has been received.', lead: result.rows[0] });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Unable to save enquiry right now.' }); }
});

app.listen(port, () => console.log(`SMART SOLUTIONS API listening on ${port}`));
