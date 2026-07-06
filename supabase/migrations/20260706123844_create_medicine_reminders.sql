create table public.medicine_reminders (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    prescription_id uuid references public.prescriptions(id) on delete set null,
    medicine_name text not null,
    dosage text not null,
    frequency text not null,
    reminder_times text[] not null,
    start_date date not null,
    end_date date,
    instructions text,
    status text not null default 'Active' check (status in ('Active', 'Paused', 'Completed')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table public.medicine_adherence_logs (
    id uuid primary key default gen_random_uuid(),
    reminder_id uuid references public.medicine_reminders(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    scheduled_date date not null,
    scheduled_time time not null,
    status text not null check (status in ('Taken', 'Skipped', 'Missed')),
    recorded_at timestamptz not null default now()
);

alter table public.medicine_reminders enable row level security;
alter table public.medicine_adherence_logs enable row level security;

create policy "Users can view their own reminders"
    on public.medicine_reminders for select
    using (auth.uid() = user_id);

create policy "Users can insert their own reminders"
    on public.medicine_reminders for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own reminders"
    on public.medicine_reminders for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own reminders"
    on public.medicine_reminders for delete
    using (auth.uid() = user_id);

create policy "Users can view their own adherence logs"
    on public.medicine_adherence_logs for select
    using (auth.uid() = user_id);

create policy "Users can insert their own adherence logs"
    on public.medicine_adherence_logs for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own adherence logs"
    on public.medicine_adherence_logs for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own adherence logs"
    on public.medicine_adherence_logs for delete
    using (auth.uid() = user_id);

create trigger set_updated_at_reminders
    before update on public.medicine_reminders
    for each row
    execute function public.handle_updated_at();

-- Note: In a production environment, you would enable pg_cron and schedule the notification generator.
-- Because timezone handling requires the user's timezone (which we don't store yet) or saving times in UTC,
-- we define the generator function here.
create or replace function public.generate_medicine_notifications()
returns void
security definer
as $$
declare
    current_time text := to_char(now() at time zone 'UTC', 'HH24:MI');
    current_date date := (now() at time zone 'UTC')::date;
begin
    insert into public.notifications (
        user_id,
        type,
        title,
        message,
        reference_id,
        reference_type,
        is_read
    )
    select 
        user_id,
        'Medicine',
        'Medicine Reminder',
        'Time to take your ' || dosage || ' of ' || medicine_name || '.',
        id,
        'medicine_reminder',
        false
    from public.medicine_reminders
    where 
        status = 'Active' 
        and start_date <= current_date
        and (end_date is null or end_date >= current_date)
        and current_time = any(reminder_times);
end;
$$ language plpgsql;
