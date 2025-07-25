/*
  # Clear existing battlecards data

  1. Data Cleanup
    - Remove all existing battlecard records to start fresh
    - Reset the system for proper CSV import testing

  2. Purpose
    - Ensure clean state before CSV import
    - Remove any mock or test data
*/

-- Clear all existing battlecard data
DELETE FROM battlecards;

-- Reset any sequences if needed
-- Note: UUID primary keys don't use sequences, so no reset needed