import React from 'react';
import { Battlecard } from '../types/battlecard';
import { TrendingUp, Users, Target, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  battlecards: Battlecard[];
}

export const Dashboard: React.FC<DashboardProps> = ({ battlecards }) => {
  const highThreatCompanies = battlecards.filter(bc => 
    bc.threatLevel?.toLowerCase() === 'high'
  ).length;
  const mediumThreatCompanies = battlecards.filter(bc => 
    bc.threatLevel?.toLowerCase() === 'medium'
  ).length;
  const lowThreatCompanies = battlecards.filter(bc => 
    bc.threatLevel?.toLowerCase() === 'low'
  ).length;
  const veryLowThreatCompanies = battlecards.filter(bc => 
    bc.threatLevel?.toLowerCase() === 'very low'
  ).length;
  
  const recentlyUpdated = battlecards.filter(bc => {
    if (!bc.lastUpdated) return false;
    const lastUpdate = new Date(bc.lastUpdated);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastUpdate >= thirtyDaysAgo;
  }).length;

  const stats = [
    {
      title: 'High Threat',
      value: highThreatCompanies,
      icon: Target,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Medium Threat',
      value: mediumThreatCompanies,
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Low Threat',
      value: lowThreatCompanies,
      icon: AlertTriangle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Very Low Threat',
      value: veryLowThreatCompanies,
      icon: TrendingUp,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-white rounded-lg border ${stat.borderColor} p-6 hover:shadow-md transition-shadow`}>
          <div className="flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};