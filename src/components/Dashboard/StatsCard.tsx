import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
  blue: {
    bg: 'bg-primary-50',
    icon: 'text-primary-500',
    accent: 'border-l-primary-500',
  },
  green: {
    bg: 'bg-success-50',
    icon: 'text-success-500',
    accent: 'border-l-success-500',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-500',
    accent: 'border-l-purple-500',
  },
  orange: {
    bg: 'bg-warning-50',
    icon: 'text-warning-500',
    accent: 'border-l-warning-500',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-500',
    accent: 'border-l-red-500',
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color,
}) => {
  const colors = colorClasses[color];

  return (
    <div className={`
      bg-white rounded-xl shadow-sm border-l-4 ${colors.accent} p-6 
      hover:shadow-md transition-shadow duration-200 animate-slide-up
    `}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${
              changeType === 'positive' ? 'text-success-600' :
              changeType === 'negative' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`${colors.bg} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
};