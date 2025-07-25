import React from 'react';
import { Battlecard } from '../types/battlecard';
import { Edit, Trash2, Eye, TrendingUp, Users, Calendar, Building, Globe } from 'lucide-react';

interface BattlecardCardProps {
  battlecard: Battlecard;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const getThreatLevelColor = (threatLevel?: string) => {
  if (!threatLevel) return 'bg-white border-gray-200';
  
  switch (threatLevel.toLowerCase()) {
    case 'high':
      return 'bg-green-50 border-green-200';
    case 'medium':
      return 'bg-yellow-50 border-yellow-200';
    case 'low':
      return 'bg-amber-50 border-amber-200';
    case 'very low':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-white border-gray-200';
  }
};
export const BattlecardCard: React.FC<BattlecardCardProps> = ({
  battlecard,
  onSelect,
  onEdit,
  onDelete
}) => {
  const cardColorClass = getThreatLevelColor(battlecard.threatLevel);

  return (
    <div className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border ${cardColorClass}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {battlecard.companyName}
            </h3>
            {battlecard.threatLevel && (
              <div className="flex items-center mb-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                  battlecard.threatLevel === 'High' || battlecard.threatLevel === 'Critical' 
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : battlecard.threatLevel === 'Medium' 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : battlecard.threatLevel === 'Low' || battlecard.threatLevel === 'Minimal'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {battlecard.threatLevel}
                </span>
              </div>
            )}
            {battlecard.oneLineSummary && (
              <p className="text-sm text-gray-600 mb-2">{battlecard.oneLineSummary}</p>
            )}
            {battlecard.overallMarketPosition && (
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                {battlecard.overallMarketPosition}
              </div>
            )}
          </div>
        </div>

        {battlecard.productPortfolioOverview && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {battlecard.productPortfolioOverview}
          </p>
        )}

        <div className="space-y-2 mb-4">
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
              <a href={battlecard.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">{battlecard.website}</a>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={onSelect}
            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};