---
name: rubberarmstrong-supabase
description: >-
  Manage the shared Rubber Armstrong Supabase project used across all RA repos.
  Covers project connection details, environment variable patterns, schema
  conventions, auth patterns, migrations, Edge Functions, Storage, Realtime,
  and CLI workflows. Use when the user mentions Supabase, supabase.co,
  SUPABASE_URL, SUPABASE_ANON_KEY, database, migrations, RLS, RPC, Edge
  Functions, or any Rubber Armstrong database work.
---

# Rubber Armstrong — Supabase

All Rubber Armstrong web properties share a **single Supabase project**.

## Project details

| Field | Value |
|-------|-------|
| Account email | `rubberarmstrongcamp@gmail.com` |
| Project ref | `xqmocjqdcvjkvtwwuqpf` |
| API URL | `https://xqmocjqdcvjkvtwwuqpf.supabase.co` |
| Dashboard | `https://supabase.com/dashboard/project/xqmocjqdcvjkvtwwuqpf` |
| Region | *(check dashboard if needed)* |

## Non-negotiables (security)

- **Never** commit `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_DB_PASSWORD` to git.
- The **anon key** is safe to embed in frontend code (it's public by design).
- Use **RLS** on every table. If a table must not be accessed directly from
  the browser, enable RLS with no policies and expose access through
  `SECURITY DEFINER` RPCs instead.
- Rotate any key that has been accidentally committed.

## Environment variable conventions

### Frontend (Next.js / browser)

```
NEXT_PUBLIC_SUPABASE_URL=https://xqmocjqdcvjkvtwwuqpf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

For vanilla JS sites (e.g. RA_Join), use non-prefixed names:

```
SUPABASE_URL=https://xqmocjqdcvjkvtwwuqpf.supabase.co
SUPABASE_ANON_KEY=<anon key>
```

### Server / CLI / Edge Functions

```
SUPABASE_URL=https://xqmocjqdcvjkvtwwuqpf.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service role key>
SUPABASE_ACCESS_TOKEN=<personal access token for CLI>
```

### `.env` files

- `.env.local` for local dev (gitignored).
- `.env.example` committed with placeholder values.
- Never commit `.env` files containing real keys.

## Repos using this project

| Repo | Usage | Auth pattern | Key features |
|------|-------|-------------|--------------|
| `RA_Portal` | Full app | Supabase Auth (magic link) | Users, shifts, notices, tents, bikes, deliveries, Realtime, Storage, Edge Functions (`sync-soi`, `send-push`), cron |
| `RA_Build` | Full app | Supabase Auth (magic link) | Users, tasks, crew schedule, store, camp layout, Storage (`build-receipts`) |
| `RA_Join` | Registration form | RPC-only lookup (no Auth accounts) | `soi_people`, `join_registrations`, SECURITY DEFINER RPCs |

## Schema conventions

- Tables live in the `public` schema.
- Use `uuid` primary keys with `gen_random_uuid()` default.
- Use `timestamptz` for all timestamps; include `created_at` and `updated_at`.
- Use `citext` (via the `extensions` schema) for case-insensitive email columns.
- Enum-like values use `text` columns with `CHECK` constraints (not Postgres
  enums) for easier migration.
- Array columns (`text[]`, `uuid[]`) are acceptable for simple multi-value
  fields like allergies or campmate IDs.
- Contribution/money fields use `int` (whole USD dollars).
- Name migration files with a timestamp prefix: `YYYYMMDDHHMMSS_description.sql`.

## Auth patterns

### Pattern 1: Supabase Auth (RA_Portal, RA_Build)

- Magic link sign-in via `supabase.auth.signInWithOtp({ email })`.
- Session managed by `@supabase/ssr` (Next.js) or `@supabase/auth-helpers-nextjs`.
- `auth.uid()` used in RLS policies.
- `public.users` table synced from `auth.users` via trigger or Edge Function.

### Pattern 2: RPC-only lookup (RA_Join)

- No Supabase Auth accounts for end users.
- All data access through `SECURITY DEFINER` RPCs called with the anon key.
- RPCs validate identity (email + birth_year) before returning/writing data.
- RLS enabled with no policies (blocks all direct table access).

Choose Pattern 1 for apps where users have accounts. Choose Pattern 2 for
public-facing forms where identity is verified by a shared secret (like SOI
approval + birth year).

> **Ownership rule (31 Oct 2026):** RA_Portal owns all database migrations for this project. Do not add migrations or run `supabase db push` from RA_Join, RA_Build or RA_Emails_v2.
> Before any push run `supabase migration list --linked` and confirm Local and Remote match. Never use `--include-all`. See `RA_Portal/supabase/DATABASE_OWNERSHIP.md` and `RA_Portal/docs/ACCESS_RULES.md`.

## Migrations workflow

### Using the Supabase CLI

```bash
supabase login
supabase link --project-ref xqmocjqdcvjkvtwwuqpf
supabase db push          # apply local migrations to remote
supabase db pull           # pull remote schema into local migrations
supabase migration new <name>  # create a new migration file
```

### Using the Dashboard SQL Editor

For quick one-off changes, paste SQL directly into the Dashboard SQL Editor.
Always copy the SQL into a migration file in the repo afterward.

### Seed data

Place seed files at `supabase/seed.sql`. Use `ON CONFLICT ... DO UPDATE`
to make seeds re-runnable.

## Edge Functions

Deploy with:

```bash
supabase functions deploy <function-name> --project-ref xqmocjqdcvjkvtwwuqpf
```

Set secrets:

```bash
supabase secrets set KEY=value --project-ref xqmocjqdcvjkvtwwuqpf
```

Existing Edge Functions (RA_Portal):
- `sync-soi` — syncs SOI data from Google Sheets into the database (cron-triggered).
- `send-push` — sends Web Push notifications (DB webhook-triggered).

## Storage

Buckets are created in migrations. Current buckets:
- `build-receipts` (RA_Build) — store item receipt photos.
- Deliveries-related buckets (RA_Portal).

Access is controlled by Storage RLS policies in migrations.

## Realtime

Enabled per-table via `alter publication supabase_realtime add table <name>`.
Used in RA_Portal for live updates on notices, shifts, users, etc.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `permission denied for table` | Check RLS policies. If using RPCs, ensure the function is `SECURITY DEFINER`. |
| `relation does not exist` | Migration not applied. Run `supabase db push` or apply via SQL Editor. |
| Edge Function 500 | Check logs: `supabase functions logs <name>`. Verify secrets are set. |
| Auth magic link not arriving | Check Supabase Auth email templates and SMTP settings in Dashboard. |
| `JWT expired` | Client session expired. Call `supabase.auth.refreshSession()`. |

## Additional resources

- For concrete examples per repo, see [examples.md](examples.md).
- For Postgres performance best practices, the `supabase-postgres-best-practices`
  skill is also available.
