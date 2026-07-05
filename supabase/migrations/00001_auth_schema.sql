-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Create Profiles Table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (id)
);

-- 2. Create User Roles Table
create table public.user_roles (
  user_id uuid not null references auth.users on delete cascade,
  role text not null check (role in ('PATIENT', 'DOCTOR', 'ADMIN')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (user_id)
);

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

-- Profiles RLS Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- User Roles RLS Policies
create policy "User roles are viewable by everyone."
  on user_roles for select
  using ( true );

create policy "Only admins can update user roles."
  on user_roles for update
  using ( 
    (select role from public.user_roles where user_id = auth.uid()) = 'ADMIN'
  );

-- 4. Triggers for Automatic Profile and Role Creation

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Create profile
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  -- Assign default PATIENT role
  insert into public.user_roles (user_id, role)
  values (new.id, 'PATIENT');
  
  return new;
end;
$$;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
