/*
# Create service_clicks table for tracking service card clicks

1. New Tables
- `service_clicks`
  - `id` (uuid, primary key, auto-generated)
  - `service_id` (text, not null) — identifier of the clicked service (e.g. "caregiver")
  - `service_title` (text, not null) — human-readable title of the clicked service
  - `created_at` (timestamptz, defaults to now()) — when the click occurred

2. Security
- Enable RLS on `service_clicks`.
- This is a single-tenant app with no sign-in screen, so the frontend operates
  entirely as the `anon` role. All policies use `TO anon, authenticated`.
- INSERT is allowed for everyone (any visitor can record a click).
- SELECT, UPDATE, DELETE are NOT needed by the frontend and are left locked down
  (no policies = no access), since only the admin needs to read this data and
  that is done through the Supabase dashboard, not the anon key.

3. Important Notes
- No `user_id` column — this is a no-auth app; clicks are anonymous analytics.
- Only an INSERT policy is created intentionally. Without SELECT/UPDATE/DELETE
  policies, the anon key cannot read or modify click data, which is correct.
*/

CREATE TABLE IF NOT EXISTS service_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id text NOT NULL,
  service_title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_clicks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_service_clicks" ON service_clicks;
CREATE POLICY "anon_insert_service_clicks" ON service_clicks FOR INSERT
  TO anon, authenticated WITH CHECK (true);
