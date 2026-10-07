CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  business_name VARCHAR(150) NOT NULL DEFAULT '',
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(200) NOT NULL DEFAULT '',
  business_type VARCHAR(80) NOT NULL DEFAULT '',
  requirement TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
