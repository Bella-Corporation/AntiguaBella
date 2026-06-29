alter table public.booking_requests
  add column if not exists stripe_payment_intent_id text;
