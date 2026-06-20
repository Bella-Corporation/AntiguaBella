-- P3-WP-05: Booking Request Persistence
-- Creates the booking_requests table and RLS policies

create table if not exists public.booking_requests (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users on delete cascade,
  villa_id    text        not null check (villa_id in ('antiguabella', 'antiguasoleil', 'both')),
  check_in    date        not null,
  check_out   date        not null,
  guest_count integer     not null check (guest_count >= 1),
  status      text        not null default 'new',
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.booking_requests enable row level security;

-- Authenticated users can insert their own requests
create policy "Users can insert their own booking requests"
  on public.booking_requests
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Authenticated users can read only their own requests
create policy "Users can view their own booking requests"
  on public.booking_requests
  for select
  to authenticated
  using (auth.uid() = user_id);
