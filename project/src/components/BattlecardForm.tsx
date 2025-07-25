import React, { useState } from 'react';
import { Battlecard } from '../types/battlecard';
import { X, Plus, Minus } from 'lucide-react';

interface BattlecardFormProps {
  battlecard?: Battlecard;
  onSave: (battlecard: Battlecard) => void;
  onCancel: () => void;
}

export const BattlecardForm: React.FC<BattlecardFormProps> = ({
  battlecard,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Battlecard>({
    id: battlecard?.id || '',
    companyName: battlecard?.companyName || '',
    threatLevel: battlecard?.threatLevel || '',
    website: battlecard?.website || '',
    oneLineSummary: battlecard?.oneLineSummary || '',
    overallMarketPosition: battlecard?.overallMarketPosition || '',
    parentCompany: battlecard?.parentCompany || '',
    headquarters: battlecard?.headquarters || '',
    yearFounded: battlecard?.yearFounded || '',
    yearsInMarket: battlecard?.yearsInMarket || '',
    publiclyListed: battlecard?.publiclyListed || false,
    employeeCount: battlecard?.employeeCount || '',
    annualRevenue: battlecard?.annualRevenue || '',
    mergersAcquisitions: battlecard?.mergersAcquisitions || '',
    strategicAlliances: battlecard?.strategicAlliances || '',
    majorNewsLitigation: battlecard?.majorNewsLitigation || '',
    analystRecognition: battlecard?.analystRecognition || '',
    productPortfolioOverview: battlecard?.productPortfolioOverview || '',
    coreOfferings: battlecard?.coreOfferings || '',
    augmentingTools: battlecard?.augmentingTools || '',
    marqueeCustomers: battlecard?.marqueeCustomers || [],
    strongestVerticals: battlecard?.strongestVerticals || [],
    strongestRegions: battlecard?.strongestRegions || [],
    idealCustomerProfile: battlecard?.idealCustomerProfile || '',
    salesModel: battlecard?.salesModel || '',
    salesTeamFocus: battlecard?.salesTeamFocus || '',
    partnerEcosystem: battlecard?.partnerEcosystem || '',
    primaryValueProposition: battlecard?.primaryValueProposition || '',
    positioningStatement: battlecard?.positioningStatement || '',
    positioningWithAI: battlecard?.positioningWithAI || '',
    keyMessagingThemes: battlecard?.keyMessagingThemes || [],
    guaranteesBoldClaims: battlecard?.guaranteesBoldClaims || '',
    primaryTargetAudience: battlecard?.primaryTargetAudience || '',
    targetAudienceRelevance: battlecard?.targetAudienceRelevance || '',
    promotedAssets: battlecard?.promotedAssets || '',
    contentThemes: battlecard?.contentThemes || [],
    socialMediaPlatforms: battlecard?.socialMediaPlatforms || {},
    socialMediaContentStrategy: battlecard?.socialMediaContentStrategy || '',
    socialMediaEngagement: battlecard?.socialMediaEngagement || '',
    paidMarketingCountries: battlecard?.paidMarketingCountries || [],
    paidMarketingFocus: battlecard?.paidMarketingFocus || '',
    seoPerformance: battlecard?.seoPerformance || '',
    rankingPerformance: battlecard?.rankingPerformance || '',
    flagshipEvents: battlecard?.flagshipEvents || [],
    eventTypesThemes: battlecard?.eventTypesThemes || '',
    cloudVsOnPremise: battlecard?.cloudVsOnPremise || '',
    hosting: battlecard?.hosting || '',
    techStack: battlecard?.techStack || '',
    proprietaryLanguage: battlecard?.proprietaryLanguage || '',
    architectureNotes: battlecard?.architectureNotes || '',
    uiUxNotes: battlecard?.uiUxNotes || '',
    workflowRuleEngine: battlecard?.workflowRuleEngine || '',
    extensibilityCustomization: battlecard?.extensibilityCustomization || '',
    aiMlCapabilities: battlecard?.aiMlCapabilities || '',
    dataIntegration: battlecard?.dataIntegration || '',
    governanceSecurity: battlecard?.governanceSecurity || '',
    developmentLifecycle: battlecard?.developmentLifecycle || '',
    whoBuildsOnPlatform: battlecard?.whoBuildsOnPlatform || '',
    learningCurve: battlecard?.learningCurve || '',
    implementationModel: battlecard?.implementationModel || '',
    trainingCommunity: battlecard?.trainingCommunity || '',
    featureComparison: battlecard?.featureComparison || {},
    pricingModel: battlecard?.pricingModel || '',
    pricingTiers: battlecard?.pricingTiers || {},
    licensingComplexity: battlecard?.licensingComplexity || '',
    whatCustomersLove: battlecard?.whatCustomersLove || '',
    whatCustomersComplainAbout: battlecard?.whatCustomersComplainAbout || '',
    summaryOfReviews: battlecard?.summaryOfReviews || '',
    howCompetitorsViewThem: battlecard?.howCompetitorsViewThem || '',
    dealsWeWon: battlecard?.dealsWeWon || [],
    dealsWeLost: battlecard?.dealsWeLost || [],
    marketInsiderNotes: battlecard?.marketInsiderNotes || '',
    customersUsingAlongsideKissflow: battlecard?.customersUsingAlongsideKissflow || [],
    customersWhoReplacedThem: battlecard?.customersWhoReplacedThem || [],
    kissflowPositioningStrategy: battlecard?.kissflowPositioningStrategy || '',
    keyTalkingPoints: battlecard?.keyTalkingPoints || '',
    conversationsWeCanWin: battlecard?.conversationsWeCanWin || [],
    coexistenceStrategy: battlecard?.coexistenceStrategy || '',
    pricingComparison: battlecard?.pricingComparison || {}
  });

  const handleArrayChange = (field: keyof Battlecard, index: number, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: keyof Battlecard) => {
    const currentArray = formData[field] as string[];
    setFormData({ ...formData, [field]: [...currentArray, ''] });
  };

  const removeArrayItem = (field: keyof Battlecard, index: number) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderArrayField = (
    label: string,
    field: keyof Battlecard,
    placeholder: string
  ) => {
    const array = formData[field] as string[];
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {array.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="text-red-500 hover:text-red-700"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(field)}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add {label.slice(0, -1)}
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {battlecard ? 'Edit Battlecard' : 'Create New Battlecard'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Threat Level
                </label>
                <select
                  value={formData.threatLevel || ''}
                  onChange={(e) => setFormData({ ...formData, threatLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Threat Level</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Critical">Critical</option>
                  <option value="Minimal">Minimal</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                One-Line Summary
              </label>
              <textarea
                rows={2}
                value={formData.oneLineSummary}
                onChange={(e) => setFormData({ ...formData, oneLineSummary: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </section>

          {/* Company Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Company Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Market Position
                </label>
                <select
                  value={formData.overallMarketPosition}
                  onChange={(e) => setFormData({ ...formData, overallMarketPosition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Position</option>
                  <option value="Leader">Leader</option>
                  <option value="Challenger">Challenger</option>
                  <option value="Visionary">Visionary</option>
                  <option value="Niche Player">Niche Player</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Company
                </label>
                <input
                  type="text"
                  value={formData.parentCompany}
                  onChange={(e) => setFormData({ ...formData, parentCompany: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headquarters
                </label>
                <input
                  type="text"
                  value={formData.headquarters}
                  onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Founded
                </label>
                <input
                  type="text"
                  value={formData.yearFounded}
                  onChange={(e) => setFormData({ ...formData, yearFounded: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years in Market
                </label>
                <input
                  type="text"
                  value={formData.yearsInMarket}
                  onChange={(e) => setFormData({ ...formData, yearsInMarket: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publicly Listed?
                </label>
                <select
                  value={formData.publiclyListed ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, publiclyListed: e.target.value === 'true' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="false">Private</option>
                  <option value="true">Public</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Count
                </label>
                <input
                  type="text"
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue
                </label>
                <input
                  type="text"
                  value={formData.annualRevenue}
                  onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mergers & Acquisitions
                </label>
                <textarea
                  rows={3}
                  value={formData.mergersAcquisitions}
                  onChange={(e) => setFormData({ ...formData, mergersAcquisitions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Strategic Alliances/Partnerships
                </label>
                <textarea
                  rows={3}
                  value={formData.strategicAlliances}
                  onChange={(e) => setFormData({ ...formData, strategicAlliances: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major News & Litigation
                </label>
                <textarea
                  rows={3}
                  value={formData.majorNewsLitigation}
                  onChange={(e) => setFormData({ ...formData, majorNewsLitigation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analyst Recognition
                </label>
                <textarea
                  rows={3}
                  value={formData.analystRecognition}
                  onChange={(e) => setFormData({ ...formData, analystRecognition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Product Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Product Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Portfolio Overview
                </label>
                <textarea
                  rows={4}
                  value={formData.productPortfolioOverview}
                  onChange={(e) => setFormData({ ...formData, productPortfolioOverview: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Core Offerings / Use Cases
                  </label>
                  <textarea
                    rows={4}
                    value={formData.coreOfferings}
                    onChange={(e) => setFormData({ ...formData, coreOfferings: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Augmenting Tools
                  </label>
                  <textarea
                    rows={4}
                    value={formData.augmentingTools}
                    onChange={(e) => setFormData({ ...formData, augmentingTools: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {renderArrayField('Marquee Customers', 'marqueeCustomers', 'Enter customer name')}
                {renderArrayField('Strongest Verticals', 'strongestVerticals', 'Enter vertical')}
                {renderArrayField('Strongest Regions', 'strongestRegions', 'Enter region')}
              </div>
            </div>
          </section>

          {/* Sales & Marketing */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Sales & Marketing
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ideal Customer Profile (ICP)
                </label>
                <textarea
                  rows={3}
                  value={formData.idealCustomerProfile}
                  onChange={(e) => setFormData({ ...formData, idealCustomerProfile: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sales Model
                  </label>
                  <textarea
                    rows={3}
                    value={formData.salesModel}
                    onChange={(e) => setFormData({ ...formData, salesModel: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sales Team Focus
                  </label>
                  <textarea
                    rows={3}
                    value={formData.salesTeamFocus}
                    onChange={(e) => setFormData({ ...formData, salesTeamFocus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Ecosystem
                  </label>
                  <textarea
                    rows={3}
                    value={formData.partnerEcosystem}
                    onChange={(e) => setFormData({ ...formData, partnerEcosystem: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Value Proposition / Slogan
                  </label>
                  <textarea
                    rows={3}
                    value={formData.primaryValueProposition}
                    onChange={(e) => setFormData({ ...formData, primaryValueProposition: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Positioning Statement
                  </label>
                  <textarea
                    rows={3}
                    value={formData.positioningStatement}
                    onChange={(e) => setFormData({ ...formData, positioningStatement: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Positioning with AI
                  </label>
                  <textarea
                    rows={3}
                    value={formData.positioningWithAI}
                    onChange={(e) => setFormData({ ...formData, positioningWithAI: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderArrayField('Key Messaging Themes', 'keyMessagingThemes', 'Enter messaging theme')}
                {renderArrayField('Content Themes', 'contentThemes', 'Enter content theme')}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guarantees / Bold Claims
                  </label>
                  <textarea
                    rows={3}
                    value={formData.guaranteesBoldClaims}
                    onChange={(e) => setFormData({ ...formData, guaranteesBoldClaims: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Target Audience
                  </label>
                  <textarea
                    rows={3}
                    value={formData.primaryTargetAudience}
                    onChange={(e) => setFormData({ ...formData, primaryTargetAudience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience Relevance
                  </label>
                  <textarea
                    rows={3}
                    value={formData.targetAudienceRelevance}
                    onChange={(e) => setFormData({ ...formData, targetAudienceRelevance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promoted Assets
                  </label>
                  <textarea
                    rows={3}
                    value={formData.promotedAssets}
                    onChange={(e) => setFormData({ ...formData, promotedAssets: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Technology
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cloud vs. On-Premise
                </label>
                <textarea
                  rows={3}
                  value={formData.cloudVsOnPremise}
                  onChange={(e) => setFormData({ ...formData, cloudVsOnPremise: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hosting
                </label>
                <textarea
                  rows={3}
                  value={formData.hosting}
                  onChange={(e) => setFormData({ ...formData, hosting: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tech Stack
                </label>
                <textarea
                  rows={3}
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proprietary Language
                </label>
                <textarea
                  rows={3}
                  value={formData.proprietaryLanguage}
                  onChange={(e) => setFormData({ ...formData, proprietaryLanguage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Architecture Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.architectureNotes}
                  onChange={(e) => setFormData({ ...formData, architectureNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UI/UX
                </label>
                <textarea
                  rows={3}
                  value={formData.uiUxNotes}
                  onChange={(e) => setFormData({ ...formData, uiUxNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI/ML Capabilities
                </label>
                <textarea
                  rows={3}
                  value={formData.aiMlCapabilities}
                  onChange={(e) => setFormData({ ...formData, aiMlCapabilities: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data & Integration
                </label>
                <textarea
                  rows={3}
                  value={formData.dataIntegration}
                  onChange={(e) => setFormData({ ...formData, dataIntegration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Competitive Analysis */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Competitive Analysis
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Model
                </label>
                <input
                  type="text"
                  value={formData.pricingModel}
                  onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Licensing Complexity Analysis
                </label>
                <textarea
                  rows={3}
                  value={formData.licensingComplexity}
                  onChange={(e) => setFormData({ ...formData, licensingComplexity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What Customers Love
                </label>
                <textarea
                  rows={4}
                  value={formData.whatCustomersLove}
                  onChange={(e) => setFormData({ ...formData, whatCustomersLove: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What Customers Complain About
                </label>
                <textarea
                  rows={4}
                  value={formData.whatCustomersComplainAbout}
                  onChange={(e) => setFormData({ ...formData, whatCustomersComplainAbout: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary of Reviews
                </label>
                <textarea
                  rows={4}
                  value={formData.summaryOfReviews}
                  onChange={(e) => setFormData({ ...formData, summaryOfReviews: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How Other Competitors View Them
                </label>
                <textarea
                  rows={4}
                  value={formData.howCompetitorsViewThem}
                  onChange={(e) => setFormData({ ...formData, howCompetitorsViewThem: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Kissflow Strategy */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Kissflow Strategy
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kissflow's Positioning Strategy
                </label>
                <textarea
                  rows={4}
                  value={formData.kissflowPositioningStrategy}
                  onChange={(e) => setFormData({ ...formData, kissflowPositioningStrategy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Talking Points / Battlecard
                </label>
                <textarea
                  rows={4}
                  value={formData.keyTalkingPoints}
                  onChange={(e) => setFormData({ ...formData, keyTalkingPoints: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Co-existence Strategy
                  </label>
                  <textarea
                    rows={4}
                    value={formData.coexistenceStrategy}
                    onChange={(e) => setFormData({ ...formData, coexistenceStrategy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Market Insider Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.marketInsiderNotes}
                    onChange={(e) => setFormData({ ...formData, marketInsiderNotes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {renderArrayField('Conversations We Can Win', 'conversationsWeCanWin', 'Enter conversation topic')}
                {renderArrayField('Customers using alongside Kissflow', 'customersUsingAlongsideKissflow', 'Enter customer name')}
                {renderArrayField('Customers who replaced them with Kissflow', 'customersWhoReplacedThem', 'Enter customer name')}
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              {battlecard ? 'Update Battlecard' : 'Create Battlecard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};