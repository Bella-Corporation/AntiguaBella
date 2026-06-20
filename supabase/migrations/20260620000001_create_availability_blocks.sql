-- P3-WP-06: Availability Calendar MVP
-- Creates the availability_blocks table, index, and RLS policies

create table public.availability_blocks (
  id          uuid        primary key default gen_random_uuid(),
  villa_id    text        not null check (villa_id in ('antiguabella', 'antiguasoleil', 'both')),
  start_date  date        not null,
  end_date    date        not null,
  reason      text        not null check (reason in ('booked', 'owner_block', 'maintenance', 'pending')),
  source      text        not null default 'manual' check (source in ('manual')),
  created_at  timestamptz not null default now(),
  created_by  uuid        references auth.users(id),
  constraint valid_date_range check (end_date > start_date)
);

create index idx_availability_blocks_villa_dates
  on public.availability_blocks (villa_id, start_date, end_date);

alter table public.availability_blocks enable row level security;

create policy "Public can read availability blocks"
  on public.availability_blocks for select
  using (true);

create policy "Authenticated users can insert availability blocks"
  on public.availability_blocks for insert
  to authenticated
  with check (true);
