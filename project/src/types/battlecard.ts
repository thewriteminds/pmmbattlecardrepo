export interface Battlecard {
  id: string;
  
  // Basic Info
  companyName: string;
  threatLevel?: string;
  website?: string;
  oneLineSummary?: string;
  
  // Company Information
  overallMarketPosition?: string;
  parentCompany?: string;
  headquarters?: string;
  yearFounded?: string;
  yearsInMarket?: string;
  publiclyListed?: boolean;
  employeeCount?: string;
  annualRevenue?: string;
  mergersAcquisitions?: string;
  strategicAlliances?: string;
  majorNewsLitigation?: string;
  analystRecognition?: string;
  
  // Product Information
  productPortfolioOverview?: string;
  coreOfferings?: string;
  augmentingTools?: string;
  marqueeCustomers?: string[];
  strongestVerticals?: string[];
  strongestRegions?: string[];
  
  // Sales & Marketing
  idealCustomerProfile?: string;
  salesModel?: string;
  salesTeamFocus?: string;
  partnerEcosystem?: string;
  primaryValueProposition?: string;
  positioningStatement?: string;
  positioningWithAI?: string;
  keyMessagingThemes?: string[];
  guaranteesBoldClaims?: string;
  primaryTargetAudience?: string;
  targetAudienceRelevance?: string;
  
  // Marketing & Content
  promotedAssets?: string;
  contentThemes?: string[];
  socialMediaPlatforms?: { [platform: string]: { followers: string; strategy: string } };
  socialMediaContentStrategy?: string;
  socialMediaEngagement?: string;
  paidMarketingCountries?: string[];
  paidMarketingFocus?: string;
  seoPerformance?: string;
  rankingPerformance?: string;
  
  // Events
  flagshipEvents?: string[];
  eventTypesThemes?: string;
  
  // Technology
  cloudVsOnPremise?: string;
  hosting?: string;
  techStack?: string;
  proprietaryLanguage?: string;
  architectureNotes?: string;
  uiUxNotes?: string;
  workflowRuleEngine?: string;
  extensibilityCustomization?: string;
  aiMlCapabilities?: string;
  dataIntegration?: string;
  governanceSecurity?: string;
  developmentLifecycle?: string;
  whoBuildsOnPlatform?: string;
  learningCurve?: string;
  implementationModel?: string;
  trainingCommunity?: string;
  
  // Competitive Analysis
  featureComparison?: { [feature: string]: { us: string; them: string; advantage: string } };
  pricingModel?: string;
  pricingTiers?: { [tier: string]: { price: string; features: string[] } };
  licensingComplexity?: string;
  whatCustomersLove?: string;
  whatCustomersComplainAbout?: string;
  summaryOfReviews?: string;
  howCompetitorsViewThem?: string;
  
  // Win/Loss Analysis
  dealsWeWon?: { deal: string; reason: string; value?: string }[];
  dealsWeLost?: { deal: string; reason: string; value?: string }[];
  marketInsiderNotes?: string;
  customersUsingAlongsideKissflow?: string[];
  customersWhoReplacedThem?: string[];
  
  // Strategy
  kissflowPositioningStrategy?: string;
  keyTalkingPoints?: string;
  conversationsWeCanWin?: string[];
  coexistenceStrategy?: string;
  pricingComparison?: { [aspect: string]: { kissflow: string; competitor: string; advantage: string } };
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
  lastUpdated?: string;
}

export interface BattlecardFilters {
  searchTerm: string;
  threatLevel?: string;
  strongestVertical?: string;
  strongestRegion?: string;
}