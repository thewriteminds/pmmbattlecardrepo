/*
  # Comprehensive Battlecard Schema Update

  1. New Tables
    - Drop and recreate `battlecards` table with comprehensive fields
    - All fields organized by categories: Company Info, Market Position, Product, Marketing, Technology, etc.
    
  2. Security
    - Enable RLS on `battlecards` table
    - Add policies for anonymous and authenticated users to perform all operations
    
  3. Data Types
    - Text fields for most content
    - JSONB for complex structured data (social media, pricing tiers, etc.)
    - Boolean fields for yes/no questions
    - Arrays for lists of items
*/

-- Drop existing table and recreate with comprehensive schema
DROP TABLE IF EXISTS battlecards CASCADE;

CREATE TABLE battlecards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  competitor text NOT NULL,
  website text DEFAULT '',
  one_line_summary text DEFAULT '',
  
  -- Company Information
  overall_market_position text DEFAULT '',
  parent_company text DEFAULT '',
  headquarters text DEFAULT '',
  year_founded text DEFAULT '',
  years_in_market text DEFAULT '',
  publicly_listed boolean DEFAULT false,
  employee_count text DEFAULT '',
  annual_revenue text DEFAULT '',
  mergers_acquisitions text DEFAULT '',
  strategic_alliances text DEFAULT '',
  major_news_litigation text DEFAULT '',
  analyst_recognition text DEFAULT '',
  
  -- Product Information
  product_portfolio_overview text DEFAULT '',
  core_offerings text DEFAULT '',
  augmenting_tools text DEFAULT '',
  marquee_customers text[] DEFAULT '{}',
  strongest_verticals text[] DEFAULT '{}',
  strongest_regions text[] DEFAULT '{}',
  
  -- Sales & Marketing
  ideal_customer_profile text DEFAULT '',
  sales_model text DEFAULT '',
  sales_team_focus text DEFAULT '',
  partner_ecosystem text DEFAULT '',
  primary_value_proposition text DEFAULT '',
  positioning_statement text DEFAULT '',
  positioning_with_ai text DEFAULT '',
  key_messaging_themes text[] DEFAULT '{}',
  guarantees_bold_claims text DEFAULT '',
  primary_target_audience text DEFAULT '',
  target_audience_relevance text DEFAULT '',
  
  -- Marketing & Content
  promoted_assets text DEFAULT '',
  content_themes text[] DEFAULT '{}',
  social_media_platforms jsonb DEFAULT '{}',
  social_media_content_strategy text DEFAULT '',
  social_media_engagement text DEFAULT '',
  paid_marketing_countries text[] DEFAULT '{}',
  paid_marketing_focus text DEFAULT '',
  seo_performance text DEFAULT '',
  ranking_performance text DEFAULT '',
  
  -- Events
  flagship_events text[] DEFAULT '{}',
  event_types_themes text DEFAULT '',
  
  -- Technology
  cloud_vs_onpremise text DEFAULT '',
  hosting text DEFAULT '',
  tech_stack text DEFAULT '',
  proprietary_language text DEFAULT '',
  architecture_notes text DEFAULT '',
  ui_ux_notes text DEFAULT '',
  workflow_rule_engine text DEFAULT '',
  extensibility_customization text DEFAULT '',
  ai_ml_capabilities text DEFAULT '',
  data_integration text DEFAULT '',
  governance_security text DEFAULT '',
  development_lifecycle text DEFAULT '',
  who_builds_on_platform text DEFAULT '',
  learning_curve text DEFAULT '',
  implementation_model text DEFAULT '',
  training_community text DEFAULT '',
  
  -- Competitive Analysis
  feature_comparison jsonb DEFAULT '{}',
  pricing_model text DEFAULT '',
  pricing_tiers jsonb DEFAULT '{}',
  licensing_complexity text DEFAULT '',
  what_customers_love text DEFAULT '',
  what_customers_complain_about text DEFAULT '',
  summary_of_reviews text DEFAULT '',
  how_competitors_view_them text DEFAULT '',
  
  -- Win/Loss Analysis
  deals_we_won jsonb DEFAULT '[]',
  deals_we_lost jsonb DEFAULT '[]',
  market_insider_notes text DEFAULT '',
  customers_using_alongside_kissflow text[] DEFAULT '{}',
  customers_who_replaced_them text[] DEFAULT '{}',
  
  -- Strategy
  kissflow_positioning_strategy text DEFAULT '',
  key_talking_points text DEFAULT '',
  conversations_we_can_win text[] DEFAULT '{}',
  coexistence_strategy text DEFAULT '',
  pricing_comparison jsonb DEFAULT '{}',
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_updated date DEFAULT CURRENT_DATE
);

-- Enable RLS
ALTER TABLE battlecards ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous and authenticated users
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

-- Create indexes for better performance
CREATE INDEX idx_battlecards_competitor ON battlecards(competitor);
CREATE INDEX idx_battlecards_updated_at ON battlecards(updated_at);
CREATE INDEX idx_battlecards_last_updated ON battlecards(last_updated);