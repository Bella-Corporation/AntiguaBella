create table public.villa_rates (
  villa_id text primary key
    check (villa_id in ('antiguabella', 'antiguasoleil', 'both')),
  nightly_rate_usd integer not null,
  cleaning_fee_usd integer not null default 60000,
  min_nights integer not null default 3,
  updated_at timestamptz not null default now()
);
insert into public.villa_rates
  (villa_id, nightly_rate_usd, cleaning_fee_usd, min_nights)
values
  ('antiguabella', 85000, 60000, 3),
  ('antiguasoleil', 85000, 60000, 3),
  ('both', 170000, 120000, 3);
alter table public.villa_rates enable row level security;
create policy "Public can read villa rates"
  on public.villa_rates for select using (true);
create policy "Authenticated can update villa rates"
  on public.villa_rates for update to authenticated using (true);
