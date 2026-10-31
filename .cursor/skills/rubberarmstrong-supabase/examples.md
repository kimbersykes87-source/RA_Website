# Examples — Rubber Armstrong Supabase

## 1. RA_Join: RPC-only access (no Auth)

### Create a SECURITY DEFINER RPC

```sql
create or replace function public.lookup_soi_person(
  p_email      text,
  p_birth_year int
)
returns public.soi_person_public
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.soi_person_public;
begin
  select id, email::text, first_name, last_name, soi_status
    into result
    from public.soi_people
   where email = p_email::citext
     and birth_year = p_birth_year
     and soi_status = 'approved';
  return result;
end;
$$;

grant execute on function public.lookup_soi_person(text, int) to anon, authenticated;
```

### Call from vanilla JS

```js
const { data, error } = await supabaseClient.rpc('lookup_soi_person', {
  p_email: 'user@example.com',
  p_birth_year: 1990,
});
```

## 2. RA_Portal: Auth + RLS

### Magic link sign-in

```js
const { error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: { emailRedirectTo: window.location.origin + '/auth/callback' },
});
```

### RLS policy using auth.uid()

```sql
create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);
```

### Server-side client (Next.js App Router)

```ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createSupabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

## 3. Migrations workflow

```bash
# Link to the shared project (first time)
supabase login
supabase link --project-ref xqmocjqdcvjkvtwwuqpf

# Create a new migration
supabase migration new add_radiance_proposals

# Edit the generated file at supabase/migrations/YYYYMMDDHHMMSS_add_radiance_proposals.sql

# Apply to remote
supabase db push

# Pull remote schema changes made via Dashboard
supabase db pull
```

## 4. Edge Functions

```bash
# Deploy a function
supabase functions deploy sync-soi --project-ref xqmocjqdcvjkvtwwuqpf

# Set secrets for the function
supabase secrets set GOOGLE_SERVICE_ACCOUNT_KEY='...' --project-ref xqmocjqdcvjkvtwwuqpf

# View logs
supabase functions logs sync-soi --project-ref xqmocjqdcvjkvtwwuqpf
```

## 5. Storage bucket + policy

```sql
-- Create bucket in a migration
insert into storage.buckets (id, name, public)
values ('build-receipts', 'build-receipts', false);

-- Allow authenticated users to upload to their own folder
create policy "Users upload own receipts"
  on storage.objects for insert
  with check (
    bucket_id = 'build-receipts'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
```

## 6. Realtime subscription

```sql
-- Enable realtime for a table (in a migration)
alter publication supabase_realtime add table public.notices;
```

```ts
// Subscribe in the client
supabase
  .channel('notices')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, (payload) => {
    console.log('Change:', payload);
  })
  .subscribe();
```
