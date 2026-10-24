-- Rawdah Tours V2 schema. Apply to a new Supabase project
-- (V1's bookings stay in V1's project).
--
-- Only the website's server writes here, using the service-role key, so RLS is
-- on with no policies: nothing is readable or writable from a browser.

create extension if not exists pgcrypto;

create type payment_status as enum ('pending', 'deposit_paid', 'expired', 'failed', 'cancelled', 'refunded');
create type booking_status as enum ('pending', 'confirmed', 'cancelled');
create type payment_method as enum ('card', 'bank_transfer');

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── Bookings ─────────────────────────────────────────────────────────────────
create table bookings (
  id                        uuid primary key default gen_random_uuid(),
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),

  trip_slug                 text not null,            -- matches src/lib/trips.ts
  trip_name                 text not null,
  room_id                   text not null,
  room_label                text not null,

  full_name                 text not null,
  email                     text not null,
  phone                     text not null,
  gender                    text not null check (gender in ('male', 'female')),
  citizenship               text not null,
  age                       integer not null check (age between 18 and 100),
  emergency_contact_name    text not null,
  emergency_contact_phone   text not null,
  medical_info              text,                     -- sensitive: trip leaders only

  total_pence               integer not null check (total_pence > 0),
  deposit_pence             integer not null check (deposit_pence > 0),
  card_fee_pence            integer not null default 0,
  balance_pence             integer not null,

  payment_method            payment_method not null,
  payment_status            payment_status not null default 'pending',
  booking_status            booking_status not null default 'pending',
  stripe_session_id         text unique,
  stripe_payment_intent_id  text,

  terms_accepted_at         timestamptz not null,
  privacy_accepted_at       timestamptz not null
);

create trigger bookings_updated_at before update on bookings
  for each row execute function set_updated_at();

create index bookings_trip_status_idx on bookings (trip_slug, payment_status);
create index bookings_email_idx on bookings (email);

-- ── Payments (append-only log; external_id is the idempotency guard) ─────────
create table payments (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  booking_id    uuid not null references bookings (id) on delete cascade,
  provider      text not null check (provider in ('stripe', 'manual')),
  external_id   text not null unique,    -- Stripe event id, or manual-<uuid>
  amount_pence  integer not null,
  currency      text not null default 'gbp',
  note          text
);

create index payments_booking_idx on payments (booking_id);

-- ── Registered interest ──────────────────────────────────────────────────────
create table enquiries (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  journey            text not null check (journey in ('hajj-2027', 'umrah', 'not-sure')),
  full_name          text not null,
  email              text not null,
  phone              text not null,
  travellers         integer not null check (travellers between 1 and 30),
  travelling_from    text,
  message            text,
  marketing_consent  boolean not null default false,
  page               text,
  handled            boolean not null default false
);

create index enquiries_created_idx on enquiries (created_at desc);

alter table bookings  enable row level security;
alter table payments  enable row level security;
alter table enquiries enable row level security;
