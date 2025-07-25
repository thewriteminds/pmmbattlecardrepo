/*
  # Create battlecards table

  1. New Tables
    - `battlecards`
      - `id` (uuid, primary key)
      - `competitor_name` (text, required)
      - `logo_url` (text, optional)
      - `category` (text, required - direct/indirect/emerging)
      - `last_updated` (timestamp, auto-updated)
      - `overview` (text, required)
      - `strengths` (text array)
      - `weaknesses` (text array)
      - `pricing_model` (text)
      - `pricing_details` (text)
      - `key_messaging` (text)
      - `objection_handling` (jsonb for objection/response pairs)
      - `win_strategies` (text array)
      - `target_market` (text)
      - `recent_news` (text)
      - `key_differentiators` (text array)
      - `market_share` (text, optional)
      - `funding_status` (text, optional)
      - `employee_count` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `battlecards` table
    - Add policies for authenticated users to manage battlecards
*/

CREATE TABLE IF NOT EXISTS battlecards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_name text NOT NULL,
  logo_url text,
  category text NOT NULL CHECK (category IN ('direct', 'indirect', 'emerging')),
  last_updated date DEFAULT CURRENT_DATE,
  overview text NOT NULL,
  strengths text[] DEFAULT '{}',
  weaknesses text[] DEFAULT '{}',
  pricing_model text DEFAULT '',
  pricing_details text DEFAULT '',
  key_messaging text DEFAULT '',
  objection_handling jsonb DEFAULT '[]',
  win_strategies text[] DEFAULT '{}',
  target_market text DEFAULT '',
  recent_news text DEFAULT '',
  key_differentiators text[] DEFAULT '{}',
  market_share text DEFAULT '',
  funding_status text DEFAULT '',
  employee_count text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE battlecards ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can view battlecards"
  ON battlecards
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create battlecards"
  ON battlecards
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update battlecards"
  ON battlecards
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete battlecards"
  ON battlecards
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_battlecards_updated_at
  BEFORE UPDATE ON battlecards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();