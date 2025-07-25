import React from 'react';
import { Shield, Plus, Upload } from 'lucide-react';

interface HeaderProps {
  onCreateNew: () => void;
  onImportCSV: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateNew, onImportCSV }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">PMM Battlecard Repository</h1>
              <p className="text-sm text-gray-500">Competitive Intelligence Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onImportCSV}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </button>
            <button
              onClick={onCreateNew}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Battlecard
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};