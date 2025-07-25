/*
  # Change Threat Level to Text Field

  1. Changes
    - Change `threat_level` column from color code to text field
    - Remove color-specific constraints
    - Allow text values like "High", "Medium", "Low", etc.

  2. Notes
    - Existing color codes will be preserved as text values
    - Applications should handle both color codes and text values gracefully
*/

-- Change the threat_level column to text (it's already text, but ensure no constraints)
ALTER TABLE battlecards ALTER COLUMN threat_level TYPE text;

-- Add a comment to clarify the field purpose
COMMENT ON COLUMN battlecards.threat_level IS 'Threat level assessment (e.g., High, Medium, Low, or custom text)';