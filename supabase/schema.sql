-- Run this in the Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text not null,
  company       text default '',
  city          text default '',
  service       text not null,
  budget        text not null,
  message       text not null,
  consent_given boolean not null default false,
  status        text not null default 'new'
                check (status in ('new','contacted','qualified','won','lost')),
  notes         text default '',
  ip_hash       text,
  user_agent    text
);

create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_status_idx  on public.leads (status);
create index if not exists leads_ip_idx      on public.leads (ip_hash, created_at desc);

-- Lock the table down. The browser never talks to it directly; the API
-- uses the service-role key, which bypasses RLS. With no policies, the
-- public anon key can neither read nor write leads.
alter table public.leads enable row level security;
