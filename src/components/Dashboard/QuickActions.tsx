import React from 'react';
import { Plus, Target, Calendar, DollarSign, Heart, Activity } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const actions = [
  { id: 'add-goal', label: 'Nova Meta', icon: Target, color: 'bg-primary-500 hover:bg-primary-600' },
  { id: 'add-event', label: 'Agendar', icon: Calendar, color: 'bg-success-500 hover:bg-success-600' },
  { id: 'add-expense', label: 'Registrar Gasto', icon: DollarSign, color: 'bg-warning-500 hover:bg-warning-600' },
  { id: 'add-meditation', label: 'Meditação', icon: Heart, color: 'bg-purple-500 hover:bg-purple-600' },
  { id: 'add-exercise', label: 'Exercício', icon: Activity, color: 'bg-red-500 hover:bg-red-600' },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className={`
                ${action.color} text-white p-3 rounded-lg
                flex flex-col items-center space-y-2 transition-colors
                hover:shadow-md transform hover:scale-105 duration-200
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};