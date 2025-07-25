import React from 'react';
import { Search, Filter } from 'lucide-react';
import { BattlecardFilters } from '../types/battlecard';

interface FilterBarProps {
  filters: BattlecardFilters;
  onFiltersChange: (filters: BattlecardFilters) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  totalCount
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <Filter className="w-4 h-4 mr-2" />
          {totalCount} battlecard{totalCount !== 1 ? 's' : ''} found
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search companies..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>
          
          <div>
            <select
              value={filters.threatLevel || ''}
              onChange={(e) => onFiltersChange({ ...filters, threatLevel: e.target.value || undefined })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Threat Levels</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Very Low">Very Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};