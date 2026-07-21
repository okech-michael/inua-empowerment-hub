-- Supabase schema for INUA backend

create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  fullname text not null,
  email text not null unique,
  phone text not null,
  role text not null default 'user',
  password_hash text not null,
  created_at timestamp with time zone default now()
);

create table if not exists donations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  donor_name text not null,
  phone text not null,
  amount numeric not null,
  project text,
  message text,
  payment_method text not null,
  checkout_request_id text,
  merchant_request_id text,
  status text not null default 'PENDING',
  transaction_reference text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  donation_id uuid references donations(id) on delete cascade,
  mpesa_receipt text,
  amount numeric not null,
  phone text not null,
  result_code integer not null,
  result_description text not null,
  callback_payload jsonb not null,
  created_at timestamp with time zone default now()
);

create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  action text not null,
  performed_by uuid references users(id) on delete set null,
  ip_address text,
  payload jsonb,
  created_at timestamp with time zone default now()
);

create function monthly_donation_totals()
returns table(month text, total numeric)
language sql
as $$
  select to_char(created_at, 'YYYY-MM') as month, sum(amount) as total
  from donations
  group by 1
  order by 1 desc;
$$;
