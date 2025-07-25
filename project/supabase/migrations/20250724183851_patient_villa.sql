/*
  # Change Color Code to Threat Level

  1. Schema Changes
    - Rename color_code column to threat_level in battlecards table
    - Update indexes to use new column name
    - Preserve existing data during migration

  2. Security
    - Maintain existing RLS policies
    - No changes to access permissions
*/

-- Rename the column from color_code to threat_level
ALTER TABLE battlecards RENAME COLUMN color_code TO threat_level;

-- Update the index name to match new column
DROP INDEX IF EXISTS idx_battlecards_color_code;
CREATE INDEX idx_battlecards_threat_level ON battlecards(threat_level);