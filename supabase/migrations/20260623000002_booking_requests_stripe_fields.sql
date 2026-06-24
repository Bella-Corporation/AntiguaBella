alter table public.booking_requests
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_session_id text,
  add column if not exists total_amount_cents integer;
