import React from 'react';
import { Battlecard } from '../types/battlecard';
import { BattlecardCard } from './BattlecardCard';

interface BattlecardGridProps {
  battlecards: Battlecard[];
  onSelectBattlecard: (battlecard: Battlecard) => void;
  onEditBattlecard: (battlecard: Battlecard) => void;
  onDeleteBattlecard: (id: string) => void;
}

export const BattlecardGrid: React.FC<BattlecardGridProps> = ({
  battlecards,
  onSelectBattlecard,
  onEditBattlecard,
  onDeleteBattlecard
}) => {
  if (battlecards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No battlecards found</div>
        <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {battlecards.map((battlecard) => (
        <BattlecardCard
          key={battlecard.id}
          battlecard={battlecard}
          onSelect={() => onSelectBattlecard(battlecard)}
          onEdit={() => onEditBattlecard(battlecard)}
          onDelete={() => onDeleteBattlecard(battlecard.id)}
        />
      ))}
    </div>
  );
};