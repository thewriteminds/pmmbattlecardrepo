import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Battlecard } from '../types/battlecard';

export const useBattlecards = () => {
  const [battlecards, setBattlecards] = useState<Battlecard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBattlecards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('battlecards')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formattedData: Battlecard[] = data.map(item => ({
        id: item.id,
        companyName: item.company_name,
        threatLevel: item.threat_level || undefined,
        website: item.website || undefined,
        oneLineSummary: item.one_line_summary || undefined,
        overallMarketPosition: item.overall_market_position || undefined,
        parentCompany: item.parent_company || undefined,
        headquarters: item.headquarters || undefined,
        yearFounded: item.year_founded || undefined,
        yearsInMarket: item.years_in_market || undefined,
        publiclyListed: item.publicly_listed === 'true',
        employeeCount: item.employee_count || undefined,
        annualRevenue: item.annual_revenue || undefined,
        mergersAcquisitions: item.mergers_acquisitions || undefined,
        strategicAlliances: item.strategic_alliances || undefined,
        majorNewsLitigation: item.major_news_litigation || undefined,
        analystRecognition: item.analyst_recognition || undefined,
        productPortfolioOverview: item.product_portfolio_overview || undefined,
        coreOfferings: item.core_offerings || undefined,
        augmentingTools: item.augmenting_tools || undefined,
        marqueeCustomers: item.marquee_customers ? item.marquee_customers.split('|').filter(Boolean) : [],
        strongestVerticals: item.strongest_verticals ? item.strongest_verticals.split('|').filter(Boolean) : [],
        strongestRegions: item.strongest_regions ? item.strongest_regions.split('|').filter(Boolean) : [],
        idealCustomerProfile: item.ideal_customer_profile || undefined,
        salesModel: item.sales_model || undefined,
        salesTeamFocus: item.sales_team_focus || undefined,
        partnerEcosystem: item.partner_ecosystem || undefined,
        primaryValueProposition: item.primary_value_proposition || undefined,
        positioningStatement: item.positioning_statement || undefined,
        positioningWithAI: item.positioning_with_ai || undefined,
        keyMessagingThemes: item.key_messaging_themes ? item.key_messaging_themes.split('|').filter(Boolean) : [],
        guaranteesBoldClaims: item.guarantees_bold_claims || undefined,
        primaryTargetAudience: item.primary_target_audience || undefined,
        targetAudienceRelevance: item.target_audience_relevance || undefined,
        promotedAssets: item.promoted_assets || undefined,
        contentThemes: item.content_themes ? item.content_themes.split('|').filter(Boolean) : [],
        socialMediaPlatforms: item.social_media_platforms ? (() => {
          try {
            return JSON.parse(item.social_media_platforms);
          } catch {
            return {};
          }
        })() : {},
        socialMediaContentStrategy: item.social_media_content_strategy || undefined,
        socialMediaEngagement: item.social_media_engagement || undefined,
        paidMarketingCountries: item.paid_marketing_countries ? item.paid_marketing_countries.split('|').filter(Boolean) : [],
        paidMarketingFocus: item.paid_marketing_focus || undefined,
        seoPerformance: item.seo_performance || undefined,
        rankingPerformance: item.ranking_performance || undefined,
        flagshipEvents: item.flagship_events ? item.flagship_events.split('|').filter(Boolean) : [],
        eventTypesThemes: item.event_types_themes || undefined,
        cloudVsOnPremise: item.cloud_vs_onpremise || undefined,
        hosting: item.hosting || undefined,
        techStack: item.tech_stack || undefined,
        proprietaryLanguage: item.proprietary_language || undefined,
        architectureNotes: item.architecture_notes || undefined,
        uiUxNotes: item.ui_ux_notes || undefined,
        workflowRuleEngine: item.workflow_rule_engine || undefined,
        extensibilityCustomization: item.extensibility_customization || undefined,
        aiMlCapabilities: item.ai_ml_capabilities || undefined,
        dataIntegration: item.data_integration || undefined,
        governanceSecurity: item.governance_security || undefined,
        developmentLifecycle: item.development_lifecycle || undefined,
        whoBuildsOnPlatform: item.who_builds_on_platform || undefined,
        learningCurve: item.learning_curve || undefined,
        implementationModel: item.implementation_model || undefined,
        trainingCommunity: item.training_community || undefined,
        featureComparison: item.feature_comparison ? (() => {
          try {
            return JSON.parse(item.feature_comparison);
          } catch {
            return {};
          }
        })() : {},
        pricingModel: item.pricing_model || undefined,
        pricingTiers: item.pricing_tiers ? (() => {
          try {
            return JSON.parse(item.pricing_tiers);
          } catch {
            return {};
          }
        })() : {},
        licensingComplexity: item.licensing_complexity || undefined,
        whatCustomersLove: item.what_customers_love || undefined,
        whatCustomersComplainAbout: item.what_customers_complain_about || undefined,
        summaryOfReviews: item.summary_of_reviews || undefined,
        howCompetitorsViewThem: item.how_competitors_view_them || undefined,
        dealsWeWon: item.deals_we_won ? (() => {
          try {
            return JSON.parse(item.deals_we_won);
          } catch {
            return [];
          }
        })() : [],
        dealsWeLost: item.deals_we_lost ? (() => {
          try {
            return JSON.parse(item.deals_we_lost);
          } catch {
            return [];
          }
        })() : [],
        marketInsiderNotes: item.market_insider_notes || undefined,
        customersUsingAlongsideKissflow: item.customers_using_alongside_kissflow ? item.customers_using_alongside_kissflow.split('|').filter(Boolean) : [],
        customersWhoReplacedThem: item.customers_who_replaced_them ? item.customers_who_replaced_them.split('|').filter(Boolean) : [],
        kissflowPositioningStrategy: item.kissflow_positioning_strategy || undefined,
        keyTalkingPoints: item.key_talking_points || undefined,
        conversationsWeCanWin: item.conversations_we_can_win ? item.conversations_we_can_win.split('|').filter(Boolean) : [],
        coexistenceStrategy: item.coexistence_strategy || undefined,
        pricingComparison: item.pricing_comparison ? (() => {
          try {
            return JSON.parse(item.pricing_comparison);
          } catch {
            return {};
          }
        })() : {},
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        lastUpdated: item.last_updated
      }));

      setBattlecards(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createBattlecard = async (battlecard: Battlecard) => {
    try {
      console.log('Creating battlecard in database:', battlecard.companyName);
      console.log('Battlecard data preview:', {
        companyName: battlecard.companyName,
        threatLevel: battlecard.threatLevel,
        website: battlecard.website,
        oneLineSummary: battlecard.oneLineSummary,
        headquarters: battlecard.headquarters,
        employeeCount: battlecard.employeeCount
      });
      
      // Validate required fields
      if (!battlecard.companyName?.trim()) {
        console.error('Company name is missing or empty');
        throw new Error('Company name is required');
      }
      
      console.log(`Inserting ${battlecard.companyName} into database...`);
      const { data, error } = await supabase
        .from('battlecards')
        .insert({
          company_name: battlecard.companyName,
          threat_level: battlecard.threatLevel,
          website: battlecard.website,
          one_line_summary: battlecard.oneLineSummary,
          overall_market_position: battlecard.overallMarketPosition,
          parent_company: battlecard.parentCompany,
          headquarters: battlecard.headquarters,
          year_founded: battlecard.yearFounded,
          years_in_market: battlecard.yearsInMarket,
          publicly_listed: battlecard.publiclyListed ? 'true' : 'false',
          employee_count: battlecard.employeeCount,
          annual_revenue: battlecard.annualRevenue,
          mergers_acquisitions: battlecard.mergersAcquisitions,
          strategic_alliances: battlecard.strategicAlliances,
          major_news_litigation: battlecard.majorNewsLitigation,
          analyst_recognition: battlecard.analystRecognition,
          product_portfolio_overview: battlecard.productPortfolioOverview,
          core_offerings: battlecard.coreOfferings,
          augmenting_tools: battlecard.augmentingTools,
          marquee_customers: battlecard.marqueeCustomers?.join('|') || '',
          strongest_verticals: battlecard.strongestVerticals?.join('|') || '',
          strongest_regions: battlecard.strongestRegions?.join('|') || '',
          ideal_customer_profile: battlecard.idealCustomerProfile,
          sales_model: battlecard.salesModel,
          sales_team_focus: battlecard.salesTeamFocus,
          partner_ecosystem: battlecard.partnerEcosystem,
          primary_value_proposition: battlecard.primaryValueProposition,
          positioning_statement: battlecard.positioningStatement,
          positioning_with_ai: battlecard.positioningWithAI,
          key_messaging_themes: battlecard.keyMessagingThemes?.join('|') || '',
          guarantees_bold_claims: battlecard.guaranteesBoldClaims,
          primary_target_audience: battlecard.primaryTargetAudience,
          target_audience_relevance: battlecard.targetAudienceRelevance,
          promoted_assets: battlecard.promotedAssets,
          content_themes: battlecard.contentThemes?.join('|') || '',
          social_media_platforms: JSON.stringify(battlecard.socialMediaPlatforms || {}),
          social_media_content_strategy: battlecard.socialMediaContentStrategy,
          social_media_engagement: battlecard.socialMediaEngagement,
          paid_marketing_countries: battlecard.paidMarketingCountries?.join('|') || '',
          paid_marketing_focus: battlecard.paidMarketingFocus,
          seo_performance: battlecard.seoPerformance,
          ranking_performance: battlecard.rankingPerformance,
          flagship_events: battlecard.flagshipEvents?.join('|') || '',
          event_types_themes: battlecard.eventTypesThemes,
          cloud_vs_onpremise: battlecard.cloudVsOnPremise,
          hosting: battlecard.hosting,
          tech_stack: battlecard.techStack,
          proprietary_language: battlecard.proprietaryLanguage,
          architecture_notes: battlecard.architectureNotes,
          ui_ux_notes: battlecard.uiUxNotes,
          workflow_rule_engine: battlecard.workflowRuleEngine,
          extensibility_customization: battlecard.extensibilityCustomization,
          ai_ml_capabilities: battlecard.aiMlCapabilities,
          data_integration: battlecard.dataIntegration,
          governance_security: battlecard.governanceSecurity,
          development_lifecycle: battlecard.developmentLifecycle,
          who_builds_on_platform: battlecard.whoBuildsOnPlatform,
          learning_curve: battlecard.learningCurve,
          implementation_model: battlecard.implementationModel,
          training_community: battlecard.trainingCommunity,
          feature_comparison: JSON.stringify(battlecard.featureComparison || {}),
          pricing_model: battlecard.pricingModel,
          pricing_tiers: JSON.stringify(battlecard.pricingTiers || {}),
          licensing_complexity: battlecard.licensingComplexity,
          what_customers_love: battlecard.whatCustomersLove,
          what_customers_complain_about: battlecard.whatCustomersComplainAbout,
          summary_of_reviews: battlecard.summaryOfReviews,
          how_competitors_view_them: battlecard.howCompetitorsViewThem,
          deals_we_won: JSON.stringify(battlecard.dealsWeWon || []),
          deals_we_lost: JSON.stringify(battlecard.dealsWeLost || []),
          market_insider_notes: battlecard.marketInsiderNotes,
          customers_using_alongside_kissflow: battlecard.customersUsingAlongsideKissflow?.join('|') || '',
          customers_who_replaced_them: battlecard.customersWhoReplacedThem?.join('|') || '',
          kissflow_positioning_strategy: battlecard.kissflowPositioningStrategy,
          key_talking_points: battlecard.keyTalkingPoints,
          conversations_we_can_win: battlecard.conversationsWeCanWin?.join('|') || '',
          coexistence_strategy: battlecard.coexistenceStrategy,
          pricing_comparison: JSON.stringify(battlecard.pricingComparison || {})
        })
        .select()
        .single();

      if (error) {
        console.error(`Database error creating battlecard for ${battlecard.companyName}:`, error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          companyName: battlecard.companyName
        });
        throw error;
      }

      console.log(`✅ Successfully created battlecard for ${battlecard.companyName}:`, data.id);
      return data;
    } catch (err) {
      console.error(`❌ Error in createBattlecard for ${battlecard.companyName}:`, err);
      const errorMessage = `Failed to create battlecard for ${battlecard.companyName}: ${err instanceof Error ? err.message : 'Unknown error'}`;
      setError(errorMessage);
      throw err;
    }
  };

  const updateBattlecard = async (battlecard: Battlecard) => {
    try {
      const { data, error } = await supabase
        .from('battlecards')
        .update({
          company_name: battlecard.companyName,
          threat_level: battlecard.threatLevel,
          website: battlecard.website,
          one_line_summary: battlecard.oneLineSummary,
          overall_market_position: battlecard.overallMarketPosition,
          parent_company: battlecard.parentCompany,
          headquarters: battlecard.headquarters,
          year_founded: battlecard.yearFounded,
          years_in_market: battlecard.yearsInMarket,
          publicly_listed: battlecard.publiclyListed ? 'true' : 'false',
          employee_count: battlecard.employeeCount,
          annual_revenue: battlecard.annualRevenue,
          mergers_acquisitions: battlecard.mergersAcquisitions,
          strategic_alliances: battlecard.strategicAlliances,
          major_news_litigation: battlecard.majorNewsLitigation,
          analyst_recognition: battlecard.analystRecognition,
          product_portfolio_overview: battlecard.productPortfolioOverview,
          core_offerings: battlecard.coreOfferings,
          augmenting_tools: battlecard.augmentingTools,
          marquee_customers: battlecard.marqueeCustomers?.join('|') || '',
          strongest_verticals: battlecard.strongestVerticals?.join('|') || '',
          strongest_regions: battlecard.strongestRegions?.join('|') || '',
          ideal_customer_profile: battlecard.idealCustomerProfile,
          sales_model: battlecard.salesModel,
          sales_team_focus: battlecard.salesTeamFocus,
          partner_ecosystem: battlecard.partnerEcosystem,
          primary_value_proposition: battlecard.primaryValueProposition,
          positioning_statement: battlecard.positioningStatement,
          positioning_with_ai: battlecard.positioningWithAI,
          key_messaging_themes: battlecard.keyMessagingThemes?.join('|') || '',
          guarantees_bold_claims: battlecard.guaranteesBoldClaims,
          primary_target_audience: battlecard.primaryTargetAudience,
          target_audience_relevance: battlecard.targetAudienceRelevance,
          promoted_assets: battlecard.promotedAssets,
          content_themes: battlecard.contentThemes?.join('|') || '',
          social_media_platforms: JSON.stringify(battlecard.socialMediaPlatforms || {}),
          social_media_content_strategy: battlecard.socialMediaContentStrategy,
          social_media_engagement: battlecard.socialMediaEngagement,
          paid_marketing_countries: battlecard.paidMarketingCountries?.join('|') || '',
          paid_marketing_focus: battlecard.paidMarketingFocus,
          seo_performance: battlecard.seoPerformance,
          ranking_performance: battlecard.rankingPerformance,
          flagship_events: battlecard.flagshipEvents?.join('|') || '',
          event_types_themes: battlecard.eventTypesThemes,
          cloud_vs_onpremise: battlecard.cloudVsOnPremise,
          hosting: battlecard.hosting,
          tech_stack: battlecard.techStack,
          proprietary_language: battlecard.proprietaryLanguage,
          architecture_notes: battlecard.architectureNotes,
          ui_ux_notes: battlecard.uiUxNotes,
          workflow_rule_engine: battlecard.workflowRuleEngine,
          extensibility_customization: battlecard.extensibilityCustomization,
          ai_ml_capabilities: battlecard.aiMlCapabilities,
          data_integration: battlecard.dataIntegration,
          governance_security: battlecard.governanceSecurity,
          development_lifecycle: battlecard.developmentLifecycle,
          who_builds_on_platform: battlecard.whoBuildsOnPlatform,
          learning_curve: battlecard.learningCurve,
          implementation_model: battlecard.implementationModel,
          training_community: battlecard.trainingCommunity,
          feature_comparison: JSON.stringify(battlecard.featureComparison || {}),
          pricing_model: battlecard.pricingModel,
          pricing_tiers: JSON.stringify(battlecard.pricingTiers || {}),
          licensing_complexity: battlecard.licensingComplexity,
          what_customers_love: battlecard.whatCustomersLove,
          what_customers_complain_about: battlecard.whatCustomersComplainAbout,
          summary_of_reviews: battlecard.summaryOfReviews,
          how_competitors_view_them: battlecard.howCompetitorsViewThem,
          deals_we_won: JSON.stringify(battlecard.dealsWeWon || []),
          deals_we_lost: JSON.stringify(battlecard.dealsWeLost || []),
          market_insider_notes: battlecard.marketInsiderNotes,
          customers_using_alongside_kissflow: battlecard.customersUsingAlongsideKissflow?.join('|') || '',
          customers_who_replaced_them: battlecard.customersWhoReplacedThem?.join('|') || '',
          kissflow_positioning_strategy: battlecard.kissflowPositioningStrategy,
          key_talking_points: battlecard.keyTalkingPoints,
          conversations_we_can_win: battlecard.conversationsWeCanWin?.join('|') || '',
          coexistence_strategy: battlecard.coexistenceStrategy,
          pricing_comparison: JSON.stringify(battlecard.pricingComparison || {})
        })
        .eq('id', battlecard.id)
        .select()
        .single();

      if (error) throw error;

      await fetchBattlecards();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update battlecard');
      throw err;
    }
  };

  const deleteBattlecard = async (id: string) => {
    try {
      const { error } = await supabase
        .from('battlecards')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBattlecards(prev => prev.filter(bc => bc.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete battlecard');
      throw err;
    }
  };

  useEffect(() => {
    fetchBattlecards();
  }, []);

  return {
    battlecards,
    loading,
    error,
    createBattlecard,
    updateBattlecard,
    deleteBattlecard,
    refetch: fetchBattlecards
  };
};