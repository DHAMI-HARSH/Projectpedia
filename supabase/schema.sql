create extension if not exists "uuid-ossp";
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  category text not null check (category in ('web','mobile','ai-ml','open-source','other')),
  status text not null default 'in-progress' check (status in ('live','in-progress','archived')),
  short_desc text,
  documentation text,
  live_url text,
  github_url text,
  cover_image text,
  screenshots text[] default '{}',
  tech_stack text[] default '{}',
  features text[] default '{}',
  notes text,
  start_date date,
  end_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table milestones (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  description text,
  date date,
  order_index integer default 0
);
create or replace function update_updated_at() returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger projects_updated_at before update on projects for each row execute function update_updated_at();
alter table projects enable row level security;
alter table milestones enable row level security;
create policy "Public read projects" on projects for select using (true);
create policy "Public read milestones" on milestones for select using (true);
