import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Battlecard } from '../types/battlecard';

interface CSVImporterProps {
  onImport: (newBattlecards: Battlecard[], updatedBattlecards: Battlecard[]) => Promise<void>;
  battlecards: Battlecard[];
  onClose: () => void;
}

export const CSVImporter: React.FC<CSVImporterProps> = ({ onImport, battlecards, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [results, setResults] = useState<{
    success: number;
    created: number;
    updated: number;
    errors: { row: number; error: string }[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const csvHeaders = [
    'company_name',
    'threat_level',
    'website',
    'one_line_summary',
    'overall_market_position',
    'parent_company',
    'headquarters',
    'year_founded',
    'years_in_market',
    'publicly_listed',
    'employee_count',
    'annual_revenue',
    'mergers_acquisitions',
    'strategic_alliances',
    'major_news_litigation',
    'analyst_recognition',
    'product_portfolio_overview',
    'core_offerings',
    'augmenting_tools',
    'marquee_customers',
    'strongest_verticals',
    'strongest_regions',
    'ideal_customer_profile',
    'sales_model',
    'sales_team_focus',
    'partner_ecosystem',
    'primary_value_proposition',
    'positioning_statement',
    'positioning_with_ai',
    'key_messaging_themes',
    'guarantees_bold_claims',
    'primary_target_audience',
    'target_audience_relevance',
    'promoted_assets',
    'content_themes',
    'social_media_platforms',
    'social_media_content_strategy',
    'social_media_engagement',
    'paid_marketing_countries',
    'paid_marketing_focus',
    'seo_performance',
    'ranking_performance',
    'flagship_events',
    'event_types_themes',
    'cloud_vs_onpremise',
    'hosting',
    'tech_stack',
    'proprietary_language',
    'architecture_notes',
    'ui_ux_notes',
    'workflow_rule_engine',
    'extensibility_customization',
    'ai_ml_capabilities',
    'data_integration',
    'governance_security',
    'development_lifecycle',
    'who_builds_on_platform',
    'learning_curve',
    'implementation_model',
    'training_community',
    'pricing_model',
    'licensing_complexity',
    'what_customers_love',
    'what_customers_complain_about',
    'summary_of_reviews',
    'how_competitors_view_them',
    'market_insider_notes',
    'customers_using_alongside_kissflow',
    'customers_who_replaced_them',
    'kissflow_positioning_strategy',
    'key_talking_points',
    'conversations_we_can_win',
    'coexistence_strategy'
  ];

  const downloadSampleCSV = () => {
    const sampleData = [
      csvHeaders,
      [
        'TechCorp Solutions', // company_name
        'High', // threat_level
        'https://techcorp.com',
        'Leading enterprise software provider with strong market presence',
        'Leader',
        'TechCorp Holdings',
        'San Francisco, CA',
        '2010',
        '14',
        'true',
        '5000+',
        '$500M',
        'Acquired DataFlow Inc in 2022 for $100M',
        'Partnership with Microsoft, AWS',
        'Patent litigation with CompetitorX settled in 2023',
        'Gartner Leader in Magic Quadrant 2024',
        'Comprehensive suite of business management tools',
        'Workflow automation, Process management, Analytics',
        'Third-party integrations, Mobile apps',
        'Fortune 500 Company A|Enterprise Corp B|Global Tech C',
        'Manufacturing|Healthcare|Financial Services',
        'North America|Europe|Asia Pacific',
        'Large enterprises (1000+ employees) in regulated industries',
        'Direct sales with channel partners',
        'Enterprise accounts, Strategic partnerships',
        'Microsoft, Salesforce, AWS partnerships',
        'Streamline your business processes with AI-powered automation',
        'The leading platform for enterprise process automation',
        'AI-first approach to business process optimization',
        'Digital Transformation|Process Excellence|AI Innovation',
        '99.9% uptime guarantee, ROI within 6 months',
        'CIOs, IT Directors, Process Owners',
        'Addresses digital transformation initiatives',
        'Whitepapers, Case studies, Webinars',
        'Thought Leadership|Customer Success|Industry Insights',
        '{"linkedin": {"followers": "50000", "strategy": "B2B content"}}',
        'B2B focused content, thought leadership articles',
        'High engagement on LinkedIn, moderate on Twitter',
        'United States|United Kingdom|Germany|Australia',
        'Google Ads, LinkedIn Ads, industry publications',
        'High domain authority, ranks for key industry terms',
        'Top 3 for enterprise workflow automation',
        'TechCorp Summit|Process Excellence Conference',
        'Enterprise conferences, user training events',
        'Cloud-first with on-premise options',
        'AWS, Azure multi-cloud deployment',
        'React, Node.js, PostgreSQL, Kubernetes',
        'TechCorp Workflow Language (TWL)',
        'Microservices architecture, API-first design',
        'Modern, intuitive interface with drag-drop builder',
        'Advanced workflow engine with conditional logic',
        'Custom fields, API integrations, white-labeling',
        'Machine learning for process optimization',
        'REST APIs, webhooks, 500+ pre-built connectors',
        'SOC2, GDPR compliant, enterprise security',
        'Agile development, quarterly releases',
        'IT teams, business analysts, citizen developers',
        'Moderate - requires some technical knowledge',
        'Professional services, self-service options',
        'Comprehensive documentation, active community',
        'Subscription-based, per-user pricing',
        'Complex enterprise licensing with multiple tiers',
        'Powerful features, reliable platform, good support',
        'Steep learning curve, expensive for small teams',
        'Users praise reliability but note complexity',
        'Seen as established but less innovative',
        'Internal insights on competitive positioning',
        'Customer A|Customer B|Customer C',
        'Former TechCorp Customer D|Enterprise E',
        'Position as more user-friendly alternative',
        'Emphasize ease of use and faster implementation',
        'SMB market|User experience|Implementation speed',
        'Partner in enterprise accounts, compete in mid-market'
      ]
    ];

    const csvContent = sampleData.map(row => 
      row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'battlecard_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    // Parse and validate headers
    const headers = parseCSVLine(lines[0]);
    
    // Validate headers match expected format
    const expectedHeaders = csvHeaders;
    const missingHeaders = expectedHeaders.filter(expected => !headers.includes(expected));
    const extraHeaders = headers.filter(header => !expectedHeaders.includes(header));
    
    if (missingHeaders.length > 0 || extraHeaders.length > 0) {
      console.error('Header mismatch detected:');
      console.error('Expected headers:', expectedHeaders);
      console.error('Found headers:', headers);
      console.error('Missing headers:', missingHeaders);
      console.error('Extra headers:', extraHeaders);
      
      let errorMessage = 'CSV header mismatch detected:\n';
      if (missingHeaders.length > 0) {
        errorMessage += `Missing headers: ${missingHeaders.join(', ')}\n`;
      }
      if (extraHeaders.length > 0) {
        errorMessage += `Extra headers: ${extraHeaders.join(', ')}\n`;
      }
      errorMessage += '\nPlease download the sample CSV to see the correct format.';
      
      throw new Error(errorMessage);
    }
    
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);

      if (values.length === headers.length) {
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        rows.push(row);
      }
    }

    return rows;
  };

  // Helper function to properly parse a CSV line
  const parseCSVLine = (line: string): string[] => {
    const values = [];
    let current = '';
    let inQuotes = false;
    let wasQuoted = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes) {
          // Check if this is an escaped quote ("")
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"'; // Add the escaped quote to current value
            i += 2; // Skip both quotes
            continue;
          } else {
            // End of quoted field
            inQuotes = false;
          }
        } else {
          // Start of quoted field
          inQuotes = true;
          wasQuoted = true;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator outside quotes
        // Post-process the value if it was originally quoted
        let processedValue = current.trim();
        if (wasQuoted) {
          // Remove outermost quotes and unescape internal quotes
          processedValue = processedValue.replace(/^"|"$/g, '').replace(/""/g, '"');
        }
        values.push(processedValue);
        current = '';
        wasQuoted = false;
      } else {
        current += char;
      }
      i++;
    }
    
    // Add the last field
    let processedValue = current.trim();
    if (wasQuoted) {
      // Remove outermost quotes and unescape internal quotes
      processedValue = processedValue.replace(/^"|"$/g, '').replace(/""/g, '"');
    }
    values.push(processedValue);
    
    return values;
  };

  const convertRowToBattlecard = (row: any): Battlecard => {
    return {
      id: '', // Will be generated by Supabase
      companyName: row['company_name'] || '',
      threatLevel: row['threat_level'] || '',
      website: row['website'] || '',
      oneLineSummary: row['one_line_summary'] || '',
      overallMarketPosition: row['overall_market_position'] || '',
      parentCompany: row['parent_company'] || '',
      headquarters: row['headquarters'] || '',
      yearFounded: row['year_founded'] || '',
      yearsInMarket: row['years_in_market'] || '',
      publiclyListed: (row['publicly_listed'] || '').toLowerCase() === 'yes' || (row['publicly_listed'] || '').toLowerCase() === 'true',
      employeeCount: row['employee_count'] || '',
      annualRevenue: row['annual_revenue'] || '',
      mergersAcquisitions: row['mergers_acquisitions'] || '',
      strategicAlliances: row['strategic_alliances'] || '',
      majorNewsLitigation: row['major_news_litigation'] || '',
      analystRecognition: row['analyst_recognition'] || '',
      productPortfolioOverview: row['product_portfolio_overview'] || '',
      coreOfferings: row['core_offerings'] || '',
      augmentingTools: row['augmenting_tools'] || '',
      marqueeCustomers: row['marquee_customers'] ? row['marquee_customers'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      strongestVerticals: row['strongest_verticals'] ? row['strongest_verticals'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      strongestRegions: row['strongest_regions'] ? row['strongest_regions'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      idealCustomerProfile: row['ideal_customer_profile'] || '',
      salesModel: row['sales_model'] || '',
      salesTeamFocus: row['sales_team_focus'] || '',
      partnerEcosystem: row['partner_ecosystem'] || '',
      primaryValueProposition: row['primary_value_proposition'] || '',
      positioningStatement: row['positioning_statement'] || '',
      positioningWithAI: row['positioning_with_ai'] || '',
      keyMessagingThemes: row['key_messaging_themes'] ? row['key_messaging_themes'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      guaranteesBoldClaims: row['guarantees_bold_claims'] || '',
      primaryTargetAudience: row['primary_target_audience'] || '',
      targetAudienceRelevance: row['target_audience_relevance'] || '',
      promotedAssets: row['promoted_assets'] || '',
      contentThemes: row['content_themes'] ? row['content_themes'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      socialMediaPlatforms: row['social_media_platforms'] ? (() => {
        try {
          return JSON.parse(row['social_media_platforms']);
        } catch {
          return {};
        }
      })() : {},
      socialMediaContentStrategy: row['social_media_content_strategy'] || '',
      socialMediaEngagement: row['social_media_engagement'] || '',
      paidMarketingCountries: row['paid_marketing_countries'] ? row['paid_marketing_countries'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      paidMarketingFocus: row['paid_marketing_focus'] || '',
      seoPerformance: row['seo_performance'] || '',
      rankingPerformance: row['ranking_performance'] || '',
      flagshipEvents: row['flagship_events'] ? row['flagship_events'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      eventTypesThemes: row['event_types_themes'] || '',
      cloudVsOnPremise: row['cloud_vs_onpremise'] || '',
      hosting: row['hosting'] || '',
      techStack: row['tech_stack'] || '',
      proprietaryLanguage: row['proprietary_language'] || '',
      architectureNotes: row['architecture_notes'] || '',
      uiUxNotes: row['ui_ux_notes'] || '',
      workflowRuleEngine: row['workflow_rule_engine'] || '',
      extensibilityCustomization: row['extensibility_customization'] || '',
      aiMlCapabilities: row['ai_ml_capabilities'] || '',
      dataIntegration: row['data_integration'] || '',
      governanceSecurity: row['governance_security'] || '',
      developmentLifecycle: row['development_lifecycle'] || '',
      whoBuildsOnPlatform: row['who_builds_on_platform'] || '',
      learningCurve: row['learning_curve'] || '',
      implementationModel: row['implementation_model'] || '',
      trainingCommunity: row['training_community'] || '',
      featureComparison: {},
      pricingModel: row['pricing_model'] || '',
      pricingTiers: {},
      licensingComplexity: row['licensing_complexity'] || '',
      whatCustomersLove: row['what_customers_love'] || '',
      whatCustomersComplainAbout: row['what_customers_complain_about'] || '',
      summaryOfReviews: row['summary_of_reviews'] || '',
      howCompetitorsViewThem: row['how_competitors_view_them'] || '',
      dealsWeWon: [],
      dealsWeLost: [],
      marketInsiderNotes: row['market_insider_notes'] || '',
      customersUsingAlongsideKissflow: row['customers_using_alongside_kissflow'] ? row['customers_using_alongside_kissflow'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      customersWhoReplacedThem: row['customers_who_replaced_them'] ? row['customers_who_replaced_them'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      kissflowPositioningStrategy: row['kissflow_positioning_strategy'] || '',
      keyTalkingPoints: row['key_talking_points'] || '',
      conversationsWeCanWin: row['conversations_we_can_win'] ? row['conversations_we_can_win'].split('|').map((item: string) => item.trim()).filter((item: string) => item) : [],
      coexistenceStrategy: row['coexistence_strategy'] || '',
      pricingComparison: {}
    };
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResults(null);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleImport = async () => {
    if (!file) return;

    // Show immediate feedback
    setToastMessage('Starting CSV import...');
    setToastType('success');
    setShowToast(true);

    console.log('Starting CSV import process...');
    setImporting(true);
    setUploadProgress('Reading CSV file...');
    setResults(null);

    try {
      console.log('Reading CSV file...');
      setToastMessage('Reading CSV file...');
      const csvText = await file.text();
      console.log('CSV content length:', csvText.length);
      console.log('First 500 characters:', csvText.substring(0, 500));
      
      setUploadProgress('Parsing CSV data...');
      setToastMessage('Parsing CSV data...');
      const rows = parseCSV(csvText);
      console.log('Parsed rows:', rows.length);
      if (rows.length > 0) {
        console.log('✅ Headers validated successfully');
        console.log('First row sample:', Object.keys(rows[0]).slice(0, 5));
      }
      
      if (rows.length === 0) {
        console.error('No valid data rows found');
        setToastMessage('Error: No valid data rows found in CSV file');
        setToastType('error');
        throw new Error('No valid data rows found in CSV file');
      }

      setToastMessage(`Found ${rows.length} companies to process...`);
      const newBattlecards: Battlecard[] = [];
      const updatedBattlecards: Battlecard[] = [];
      const errors: { row: number; error: string }[] = [];

      setUploadProgress(`Processing ${rows.length} companies...`);
      setToastMessage(`Processing ${rows.length} companies...`);

      rows.forEach((row, index) => {
        try {
          const companyName = row['company_name'] || '';
          console.log(`Row ${index + 2}: Company name found: "${companyName}"`);
          if (!companyName.trim()) {
            console.error(`Row ${index + 2}: Missing company name`);
            errors.push({ row: index + 2, error: 'Company name is required' });
            return;
          }
          
          console.log(`Processing row ${index + 2}: ${companyName}`);
          const battlecard = convertRowToBattlecard(row);
          console.log(`Converted battlecard for ${companyName}:`, {
            companyName: battlecard.companyName,
            threatLevel: battlecard.threatLevel,
            website: battlecard.website
          });
          
          // Check if company already exists (case-insensitive)
          const existingBattlecard = battlecards.find(bc => 
            bc.companyName.toLowerCase() === companyName.toLowerCase()
          );
          
          if (existingBattlecard) {
            // Update existing battlecard with new data
            battlecard.id = existingBattlecard.id;
            updatedBattlecards.push(battlecard);
            console.log(`Will update existing: ${companyName}`);
          } else {
            // Create new battlecard
            newBattlecards.push(battlecard);
            console.log(`Will create new: ${companyName}`);
          }
        } catch (error) {
          console.error(`Error processing row ${index + 2}:`, error);
          errors.push({ 
            row: index + 2, 
            error: error instanceof Error ? error.message : 'Invalid data format' 
          });
        }
      });

      console.log('Import summary:', {
        newBattlecards: newBattlecards.length,
        updatedBattlecards: updatedBattlecards.length,
        errors: errors.length
      });

      if (newBattlecards.length === 0 && updatedBattlecards.length === 0) {
        console.error('No valid companies to import');
        setToastMessage('Error: No valid companies found to import');
        setToastType('error');
        throw new Error('No valid companies found to import');
      }

      if (newBattlecards.length > 0 || updatedBattlecards.length > 0) {
        setUploadProgress('Saving to database...');
        setToastMessage('Saving companies to database...');
        console.log('Calling onImport...');
        console.log('New battlecards to create:', newBattlecards.map(bc => bc.companyName));
        console.log('Existing battlecards to update:', updatedBattlecards.map(bc => bc.companyName));
        await onImport(newBattlecards, updatedBattlecards);
        console.log('onImport completed');
        setToastMessage(`Successfully imported ${newBattlecards.length + updatedBattlecards.length} companies!`);
      }

      setResults({
        success: newBattlecards.length + updatedBattlecards.length,
        created: newBattlecards.length,
        updated: updatedBattlecards.length,
        errors
      });
      
      console.log('CSV import completed successfully');
    } catch (error) {
      console.error('CSV import error:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      let errorMessage = 'Import failed: ';
      if (error instanceof Error) {
        if (error.message.includes('header mismatch')) {
          errorMessage = error.message; // Use the detailed header mismatch message
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += 'Unknown error';
      }
      
      setToastMessage(errorMessage);
      setToastType('error');
      setResults({
        success: 0,
        created: 0,
        updated: 0,
        errors: [{ row: 0, error: errorMessage }]
      });
    } finally {
      setImporting(false);
      setUploadProgress('');
      console.log('CSV import process finished');
    }
  };

  // Add toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Import Battlecards</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Download Sample */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 mb-2">Download Sample CSV</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Download a sample CSV file with all the required fields and example data to get started.
                </p>
                <button
                  onClick={downloadSampleCSV}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample CSV
                </button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select CSV File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">
                {file ? file.name : 'Click to select a CSV file or drag and drop'}
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Choose File
              </button>
            </div>
          </div>

          {/* CSV Format Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">CSV Format Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• First row must contain column headers</li>
              <li>• Use pipe (|) to separate multiple values in array fields</li>
              <li>• Use JSON format for complex objects (social media platforms)</li>
              <li>• Use "true" or "false" for boolean fields</li>
              <li>• Use text values for threat level (High, Medium, Low, Critical, Minimal)</li>
              <li>• Competitor name is required for each row</li>
            </ul>
          </div>

          {/* Import Results */}
          {results && (
            <div className="space-y-4">
              {(results.created > 0 || results.updated > 0) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <div className="font-medium text-green-900">
                      <div>Successfully processed {results.success} battlecard{results.success !== 1 ? 's' : ''}</div>
                      {results.created > 0 && (
                        <div className="text-sm text-green-700 mt-1">
                          • Created {results.created} new battlecard{results.created !== 1 ? 's' : ''}
                        </div>
                      )}
                      {results.updated > 0 && (
                        <div className="text-sm text-green-700 mt-1">
                          • Updated {results.updated} existing battlecard{results.updated !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {results.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900 mb-2">
                        {results.errors.length} error{results.errors.length !== 1 ? 's' : ''} occurred:
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1 max-h-32 overflow-y-auto">
                        {results.errors.map((error, index) => (
                          <li key={index}>
                            Row {error.row}: {error.error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {results ? 'Close' : 'Cancel'}
            </button>
            {!results && (
              <button
                onClick={handleImport}
                disabled={!file || importing}
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center"
              >
                {importing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {uploadProgress || 'Importing...'}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Import Battlecards
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 ${toastType === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 max-w-lg`}>
          <div className="flex items-center">
            {toastType === 'success' ? (
              <div className="w-5 h-5 mr-2">✓</div>
            ) : (
              <div className="w-5 h-5 mr-2">✗</div>
            )}
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};