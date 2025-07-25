import React from 'react';
import { Battlecard } from '../types/battlecard';
import { ArrowLeft, Calendar, Building, Users, Globe } from 'lucide-react';

interface BattlecardDetailProps {
  battlecard: Battlecard;
  onBack: () => void;
  onEdit: () => void;
}

export const BattlecardDetail: React.FC<BattlecardDetailProps> = ({
  battlecard,
  onBack,
  onEdit
}) => {
  const fieldLabels: { [key: string]: string } = {
    companyName: 'Company Name',
    threatLevel: 'Threat Level',
    website: 'Website',
    oneLineSummary: 'One-Line Summary',
    overallMarketPosition: 'Overall Market Position',
    parentCompany: 'Parent Company',
    headquarters: 'Headquarters',
    yearFounded: 'Year Founded',
    yearsInMarket: 'Years in Market',
    publiclyListed: 'Publicly Listed?',
    employeeCount: 'Employee Count',
    annualRevenue: 'Annual Revenue',
    mergersAcquisitions: 'Mergers & Acquisitions',
    strategicAlliances: 'Strategic Alliances/Partnerships',
    majorNewsLitigation: 'Major News & Litigation',
    analystRecognition: 'Analyst Recognition',
    productPortfolioOverview: 'Product Portfolio Overview',
    coreOfferings: 'Core Offerings / Use Cases',
    augmentingTools: 'Augmenting Tools',
    marqueeCustomers: 'Marquee Customers',
    strongestVerticals: 'Strongest Verticals',
    strongestRegions: 'Strongest Regions',
    idealCustomerProfile: 'Ideal Customer Profile (ICP)',
    salesModel: 'Sales Model',
    salesTeamFocus: 'Sales Team Focus',
    partnerEcosystem: 'Partner Ecosystem',
    primaryValueProposition: 'Primary Value Proposition / Slogan',
    positioningStatement: 'Positioning Statement',
    positioningWithAI: 'Positioning with AI',
    keyMessagingThemes: 'Key Messaging Themes',
    guaranteesBoldClaims: 'Guarantees / Bold Claims',
    primaryTargetAudience: 'Primary Target Audience',
    targetAudienceRelevance: 'Target Audience Relevance',
    promotedAssets: 'Promoted Assets',
    contentThemes: 'Content Themes',
    socialMediaPlatforms: 'Social Media - Platforms & Follower Counts',
    socialMediaContentStrategy: 'Social Media - Content Strategy',
    socialMediaEngagement: 'Social Media - Audience Engagement',
    paidMarketingCountries: 'Paid Marketing - Focus Countries',
    paidMarketingFocus: 'Paid Marketing - Ad Focus & Language',
    seoPerformance: 'SEO Performance Metrics',
    rankingPerformance: 'Ranking Performance',
    flagshipEvents: 'Flagship Events',
    eventTypesThemes: 'Event Types & Themes',
    cloudVsOnPremise: 'Cloud vs. On-Premise',
    hosting: 'Hosting',
    techStack: 'Tech Stack',
    proprietaryLanguage: 'Proprietary Language',
    architectureNotes: 'Architecture Notes',
    uiUxNotes: 'UI/UX',
    workflowRuleEngine: 'Workflow & Rule Engine',
    extensibilityCustomization: 'Extensibility & Customization',
    aiMlCapabilities: 'AI/ML Capabilities',
    dataIntegration: 'Data & Integration',
    governanceSecurity: 'Governance & Security',
    developmentLifecycle: 'Development Lifecycle',
    whoBuildsOnPlatform: 'Who Builds on the Platform?',
    learningCurve: 'Learning Curve',
    implementationModel: 'Implementation Model',
    trainingCommunity: 'Training & Community',
    featureComparison: 'Feature Comparison Table',
    pricingModel: 'Pricing Model',
    pricingTiers: 'Pricing Tiers',
    licensingComplexity: 'Licensing Complexity Analysis',
    whatCustomersLove: 'What Customers Love',
    whatCustomersComplainAbout: 'What Customers Complain About',
    summaryOfReviews: 'Summary of Reviews',
    howCompetitorsViewThem: 'How Other Competitors View Them',
    dealsWeWon: 'Deals We Won (with reason)',
    dealsWeLost: 'Deals We Lost (with reason)',
    marketInsiderNotes: 'Market Insider Notes',
    customersUsingAlongsideKissflow: 'Customers using alongside Kissflow',
    customersWhoReplacedThem: 'Customers who replaced them with Kissflow',
    kissflowPositioningStrategy: "Kissflow's Positioning Strategy",
    keyTalkingPoints: 'Key Talking Points / Battlecard',
    conversationsWeCanWin: 'Conversations We Can Win',
    coexistenceStrategy: 'Co-existence Strategy',
    pricingComparison: 'Pricing Structure Comparison Table'
  };

  const renderFieldValue = (value: any) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400 italic">No data available</span>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-gray-400 italic">No data available</span>;
      }
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              {typeof item === 'object' ? JSON.stringify(item) : item}
            </span>
          ))}
        </div>
      );
    }

    if (typeof value === 'object') {
      return (
        <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    if (typeof value === 'boolean') {
      return <span className={`font-medium ${value ? 'text-green-600' : 'text-red-600'}`}>{value ? 'Yes' : 'No'}</span>;
    }

    return <span className="text-gray-700 whitespace-pre-wrap">{value.toString()}</span>;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Battlecards
          </button>
          <button
            onClick={onEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Battlecard
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {battlecard.threatLevel && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                  battlecard.threatLevel === 'High' || battlecard.threatLevel === 'Critical' 
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : battlecard.threatLevel === 'Medium' 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : battlecard.threatLevel === 'Low' || battlecard.threatLevel === 'Very Low'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {battlecard.threatLevel}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900">{battlecard.companyName}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {battlecard.lastUpdated && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                Updated {new Date(battlecard.lastUpdated).toLocaleDateString()}
              </div>
            )}
            {battlecard.headquarters && (
              <div className="flex items-center text-sm text-gray-500">
                <Building className="w-4 h-4 mr-2" />
                {battlecard.headquarters}
              </div>
            )}
            {battlecard.employeeCount && (
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                {battlecard.employeeCount} employees
              </div>
            )}
            {battlecard.website && (
              <div className="flex items-center text-sm text-gray-500">
                <Globe className="w-4 h-4 mr-2" />
                <a href={battlecard.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">
            Complete Battlecard Information
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(fieldLabels)
              .filter(([fieldKey]) => fieldKey !== 'companyName') // Exclude company name as it's already displayed
              .map(([fieldKey, fieldLabel]) => {
              const value = battlecard[fieldKey as keyof Battlecard];
              
              return (
                <div key={fieldKey} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                    {fieldLabel}
                  </h3>
                  <div className="text-gray-700">
                    {renderFieldValue(value)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};