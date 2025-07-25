/*
# Fix RLS policies for anonymous access

1. Policy Updates
   - Allow anonymous users to perform all CRUD operations on battlecards table
   - This enables the app to work without authentication during development

2. Security Notes
   - These policies allow unrestricted access for development
   - In production, you should implement proper authentication and restrict access accordingly
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can view battlecards" ON battlecards;
DROP POLICY IF EXISTS "Authenticated users can create battlecards" ON battlecards;
DROP POLICY IF EXISTS "Authenticated users can update battlecards" ON battlecards;
DROP POLICY IF EXISTS "Authenticated users can delete battlecards" ON battlecards;

-- Create new policies that allow anonymous access
CREATE POLICY "Allow anonymous select on battlecards"
  ON battlecards
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anonymous insert on battlecards"
  ON battlecards
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update on battlecards"
  ON battlecards
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete on battlecards"
  ON battlecards
  FOR DELETE
  TO anon, authenticated
  USING (true);