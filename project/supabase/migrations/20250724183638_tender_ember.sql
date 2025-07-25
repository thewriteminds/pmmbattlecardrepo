/*
  # Update battlecard schema with new field structure

  1. Schema Changes
    - Rename `competitor` column to `company_name`
    - Add `color_code` field for visual categorization
    - Update all existing data to use new field names

  2. Data Migration
    - Preserve existing competitor data in new company_name field
    - Set default color codes for existing records

  3. Security
    - Maintain existing RLS policies with updated field references
*/

-- Add new color_code column
ALTER TABLE battlecards ADD COLUMN IF NOT EXISTS color_code text DEFAULT '';

-- Rename competitor column to company_name (if not already renamed)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'battlecards' AND column_name = 'competitor'
  ) THEN
    ALTER TABLE battlecards RENAME COLUMN competitor TO company_name;
  END IF;
END $$;

-- Update indexes to use new column name
DROP INDEX IF EXISTS idx_battlecards_competitor;
CREATE INDEX IF NOT EXISTS idx_battlecards_company_name ON battlecards(company_name);

-- Add index for color_code for filtering
CREATE INDEX IF NOT EXISTS idx_battlecards_color_code ON battlecards(color_code);