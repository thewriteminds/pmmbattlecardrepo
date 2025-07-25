/*
  # Change all field datatypes to text

  1. Changes
    - Convert all non-text columns to text datatype
    - Preserve existing data during conversion
    - Update publicly_listed from boolean to text
    - Convert array fields to text (will store pipe-separated values)
    - Convert jsonb fields to text (will store JSON strings)

  2. Security
    - Maintain existing RLS policies
*/

-- Convert boolean field to text
ALTER TABLE battlecards ALTER COLUMN publicly_listed TYPE text USING CASE WHEN publicly_listed THEN 'true' ELSE 'false' END;

-- Convert array fields to text (these will store pipe-separated values)
ALTER TABLE battlecards ALTER COLUMN marquee_customers TYPE text USING array_to_string(marquee_customers, '|');
ALTER TABLE battlecards ALTER COLUMN strongest_verticals TYPE text USING array_to_string(strongest_verticals, '|');
ALTER TABLE battlecards ALTER COLUMN strongest_regions TYPE text USING array_to_string(strongest_regions, '|');
ALTER TABLE battlecards ALTER COLUMN key_messaging_themes TYPE text USING array_to_string(key_messaging_themes, '|');
ALTER TABLE battlecards ALTER COLUMN content_themes TYPE text USING array_to_string(content_themes, '|');
ALTER TABLE battlecards ALTER COLUMN paid_marketing_countries TYPE text USING array_to_string(paid_marketing_countries, '|');
ALTER TABLE battlecards ALTER COLUMN flagship_events TYPE text USING array_to_string(flagship_events, '|');
ALTER TABLE battlecards ALTER COLUMN customers_using_alongside_kissflow TYPE text USING array_to_string(customers_using_alongside_kissflow, '|');
ALTER TABLE battlecards ALTER COLUMN customers_who_replaced_them TYPE text USING array_to_string(customers_who_replaced_them, '|');
ALTER TABLE battlecards ALTER COLUMN conversations_we_can_win TYPE text USING array_to_string(conversations_we_can_win, '|');

-- Convert jsonb fields to text (these will store JSON strings)
ALTER TABLE battlecards ALTER COLUMN social_media_platforms TYPE text USING social_media_platforms::text;
ALTER TABLE battlecards ALTER COLUMN feature_comparison TYPE text USING feature_comparison::text;
ALTER TABLE battlecards ALTER COLUMN pricing_tiers TYPE text USING pricing_tiers::text;
ALTER TABLE battlecards ALTER COLUMN deals_we_won TYPE text USING deals_we_won::text;
ALTER TABLE battlecards ALTER COLUMN deals_we_lost TYPE text USING deals_we_lost::text;
ALTER TABLE battlecards ALTER COLUMN pricing_comparison TYPE text USING pricing_comparison::text;

-- Convert timestamp fields to text
ALTER TABLE battlecards ALTER COLUMN created_at TYPE text USING created_at::text;
ALTER TABLE battlecards ALTER COLUMN updated_at TYPE text USING updated_at::text;
ALTER TABLE battlecards ALTER COLUMN last_updated TYPE text USING last_updated::text;

-- Update default values for text fields
ALTER TABLE battlecards ALTER COLUMN publicly_listed SET DEFAULT 'false';
ALTER TABLE battlecards ALTER COLUMN marquee_customers SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN strongest_verticals SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN strongest_regions SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN key_messaging_themes SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN content_themes SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN paid_marketing_countries SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN flagship_events SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN customers_using_alongside_kissflow SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN customers_who_replaced_them SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN conversations_we_can_win SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN social_media_platforms SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN feature_comparison SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN pricing_tiers SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN deals_we_won SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN deals_we_lost SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN pricing_comparison SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN created_at SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN updated_at SET DEFAULT '';
ALTER TABLE battlecards ALTER COLUMN last_updated SET DEFAULT '';