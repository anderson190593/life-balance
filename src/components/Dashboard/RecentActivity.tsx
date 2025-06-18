import React from 'react';
import { Clock, TrendingUp, Target, Calendar, Heart } from 'lucide-react';

interface Activity {
  id: string;
  type: 'goal' | 'expense' | 'event' | 'meditation' | 'exercise';
  title: string;
  description: string;
  time: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'goal',
    title: 'Meta Atualizada',
    description: 'Aprender React - 75% concluído',
    time: '2 horas atrás',
  },
  {
    id: '2',
    type: 'expense',
    title: 'Gasto Registrado',
    description: 'Almoço - R$ 25,00',
    time: '4 horas atrás',
  },
  {
    id: '3',
    type: 'meditation',
    title: 'Meditação Concluída',
    description: '15 minutos de mindfulness',
    time: '1 dia atrás',
  },
  {
    id: '4',
    type: 'event',
    title: 'Evento Agendado',
    description: 'Reunião com cliente',
    time: '2 dias atrás',
  },
];

const activityIcons = {
  goal: Target,
  expense: TrendingUp,
  event: Calendar,
  meditation: Heart,
  exercise: Target,
};

const activityColors = {
  goal: 'text-primary-500 bg-primary-50',
  expense: 'text-warning-500 bg-warning-50',
  event: 'text-success-500 bg-success-50',
  meditation: 'text-purple-500 bg-purple-50',
  exercise: 'text-red-500 bg-red-50',
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Atividade Recente</h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 animate-slide-up">
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 text-sm text-primary-500 hover:text-primary-600 font-medium">
        Ver todas as atividades
      </button>
    </div>
  );
};