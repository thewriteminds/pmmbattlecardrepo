import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FilterBar } from './components/FilterBar';
import { BattlecardGrid } from './components/BattlecardGrid';
import { BattlecardDetail } from './components/BattlecardDetail';
import { BattlecardForm } from './components/BattlecardForm';
import { CSVImporter } from './components/CSVImporter';
import { useBattlecards } from './hooks/useBattlecards';
import { Battlecard, BattlecardFilters } from './types/battlecard';
import { Loader2 } from 'lucide-react';

import { CheckCircle } from 'lucide-react';

type ViewMode = 'grid' | 'detail' | 'form' | 'import';

function App() {
  const { 
    battlecards, 
    loading, 
    error, 
    createBattlecard, 
    updateBattlecard, 
    deleteBattlecard,
    refetch
  } = useBattlecards();
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedBattlecard, setSelectedBattlecard] = useState<Battlecard | null>(null);
  const [editingBattlecard, setEditingBattlecard] = useState<Battlecard | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [filters, setFilters] = useState<BattlecardFilters>({
    searchTerm: ''
  });

  const filteredBattlecards = useMemo(() => {
    return battlecards.filter((battlecard) => {
      const matchesSearch = !filters.searchTerm || 
        battlecard.companyName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (battlecard.oneLineSummary && battlecard.oneLineSummary.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        (battlecard.productPortfolioOverview && battlecard.productPortfolioOverview.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      const matchesThreatLevel = !filters.threatLevel || battlecard.threatLevel === filters.threatLevel;
      
      return matchesSearch && matchesThreatLevel;
    });
  }, [battlecards, filters]);

  const handleCreateNew = () => {
    setEditingBattlecard(null);
    setViewMode('form');
  };

  const handleImportCSV = () => {
    setViewMode('import');
  };

  const handleCSVImport = async (newBattlecards: Battlecard[], updatedBattlecards: Battlecard[]) => {
    try {
      console.log('Starting CSV import...', { newBattlecards: newBattlecards.length, updatedBattlecards: updatedBattlecards.length });
      
      // Show initial toast
      setToastMessage('Processing CSV data in database...');
      setToastType('success');
      setShowToast(true);
      
      // Create new battlecards
      let createdCount = 0;
      setToastMessage(`Creating ${newBattlecards.length} new battlecards...`);
      for (const battlecard of newBattlecards) {
        console.log('Creating battlecard:', battlecard.companyName);
        try {
          await createBattlecard(battlecard);
          createdCount++;
          setToastMessage(`Created ${createdCount}/${newBattlecards.length} battlecards...`);
          console.log(`Successfully created: ${battlecard.companyName}`);
        } catch (error) {
          console.error(`Failed to create ${battlecard.companyName}:`, error);
          setToastMessage(`Error creating ${battlecard.companyName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setToastType('error');
          throw new Error(`Failed to create battlecard for ${battlecard.companyName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Update existing battlecards
      let updatedCount = 0;
      if (updatedBattlecards.length > 0) {
        setToastMessage(`Updating ${updatedBattlecards.length} existing battlecards...`);
      }
      for (const battlecard of updatedBattlecards) {
        console.log('Updating battlecard:', battlecard.companyName);
        try {
          await updateBattlecard(battlecard);
          updatedCount++;
          setToastMessage(`Updated ${updatedCount}/${updatedBattlecards.length} battlecards...`);
          console.log(`Successfully updated: ${battlecard.companyName}`);
        } catch (error) {
          console.error(`Failed to update ${battlecard.companyName}:`, error);
          setToastMessage(`Error updating ${battlecard.companyName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setToastType('error');
          throw new Error(`Failed to update battlecard for ${battlecard.companyName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      // Refresh the battlecards list
      console.log('Refreshing battlecards list...');
      setToastMessage('Refreshing battlecard list...');
      await refetch();
      console.log('Battlecards list refreshed');
      
      // Show success toast
      const totalImported = newBattlecards.length + updatedBattlecards.length;
      let successMessage = `🎉 CSV imported successfully! `;
      if (createdCount > 0 && updatedCount > 0) {
        successMessage += `${createdCount} battlecard${createdCount !== 1 ? 's' : ''} created, ${updatedCount} updated`;
      } else if (createdCount > 0) {
        successMessage += `${createdCount} battlecard${createdCount !== 1 ? 's' : ''} created`;
      } else if (updatedCount > 0) {
        successMessage += `${updatedCount} battlecard${updatedCount !== 1 ? 's' : ''} updated`;
      }
      
      setToastMessage(successMessage);
      setToastType('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 8000);
      
      console.log('CSV import completed successfully');
    } catch (error) {
      console.error('Failed to import CSV:', error);
      const errorMessage = `Failed to import CSV: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error('Error details:', errorMessage);
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 10000);
      throw error;
    }
  };

  const handleSelectBattlecard = (battlecard: Battlecard) => {
    setSelectedBattlecard(battlecard);
    setViewMode('detail');
  };

  const handleEditBattlecard = (battlecard: Battlecard) => {
    setEditingBattlecard(battlecard);
    setViewMode('form');
  };

  const handleDeleteBattlecard = (id: string) => {
    if (window.confirm('Are you sure you want to delete this battlecard?')) {
      deleteBattlecard(id);
    }
  };

  const handleSaveBattlecard = async (battlecard: Battlecard) => {
    try {
      if (editingBattlecard) {
        await updateBattlecard(battlecard);
      } else {
        await createBattlecard(battlecard);
      }
      setViewMode('grid');
      setEditingBattlecard(null);
    } catch (err) {
      console.error('Failed to save battlecard:', err);
    }
  };

  const handleBackToGrid = () => {
    setViewMode('grid');
    setSelectedBattlecard(null);
    setEditingBattlecard(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading battlecards...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-2">Error loading battlecards</div>
          <div className="text-gray-600">{error}</div>
          <div className="mt-4 text-sm text-gray-500">
            Make sure you have connected to Supabase and set up the database schema.
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'detail' && selectedBattlecard) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BattlecardDetail
          battlecard={selectedBattlecard}
          onBack={handleBackToGrid}
          onEdit={() => handleEditBattlecard(selectedBattlecard)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateNew={handleCreateNew} onImportCSV={handleImportCSV} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard battlecards={battlecards} />
        
        <div className="space-y-6">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            totalCount={filteredBattlecards.length}
          />
          
          <BattlecardGrid
            battlecards={filteredBattlecards}
            onSelectBattlecard={handleSelectBattlecard}
            onEditBattlecard={handleEditBattlecard}
            onDeleteBattlecard={handleDeleteBattlecard}
          />
        </div>
      </main>

      {viewMode === 'form' && (
        <BattlecardForm
          battlecard={editingBattlecard}
          onSave={handleSaveBattlecard}
          onCancel={handleBackToGrid}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 ${toastType === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 max-w-lg`}>
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
      {viewMode === 'import' && (
        <CSVImporter
          onImport={handleCSVImport}
          battlecards={battlecards}
          onClose={handleBackToGrid}
        />
      )}
    </div>
  );
}

export default App;