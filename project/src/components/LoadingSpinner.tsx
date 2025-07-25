import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-2">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        <span className="text-gray-600">{message}</span>
      </div>
    </div>
  );
};