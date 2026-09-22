CREATE TABLE IF NOT EXISTS payment_orders (
  id UUID PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  plan_id VARCHAR(30) NOT NULL,
  credits INTEGER NOT NULL CHECK (credits > 0),
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  currency CHAR(3) NOT NULL DEFAULT 'PEN',
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  mercado_pago_preference_id VARCHAR(120),
  mercado_pago_payment_id VARCHAR(120) UNIQUE,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS payment_orders_parent_id_created_at_idx ON payment_orders(parent_id, created_at DESC);
