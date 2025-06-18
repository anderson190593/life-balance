import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Heart, 
  Activity, 
  Users,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';

interface DashboardProps {
  onQuickAction: (action: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onQuickAction }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Metas Ativas"
          value="8"
          change="+2 esta semana"
          changeType="positive"
          icon={Target}
          color="blue"
        />
        <StatsCard
          title="Gastos do Mês"
          value="R$ 2.340"
          change="-5% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Exercícios"
          value="12"
          change="Esta semana"
          changeType="neutral"
          icon={Activity}
          color="red"
        />
        <StatsCard
          title="Meditações"
          value="6"
          change="+3 vs semana anterior"
          changeType="positive"
          icon={Heart}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions onActionClick={onQuickAction} />

      {/* Recent Activity and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        {/* Current Goals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Metas em Progresso</h3>
          <div className="space-y-4">
            {[
              { title: 'Aprender React', progress: 75, category: 'Profissional' },
              { title: 'Correr 5km', progress: 60, category: 'Saúde' },
              { title: 'Meditar 30 dias', progress: 40, category: 'Bem-estar' },
              { title: 'Economizar R$ 5.000', progress: 85, category: 'Financeiro' },
            ].map((goal, index) => (
              <div key={index} className="space-y-2 animate-slide-up">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                    <p className="text-xs text-gray-500">{goal.category}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Eventos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Reunião com cliente', date: 'Hoje, 14:00', type: 'work' },
            { title: 'Academia', date: 'Amanhã, 07:00', type: 'health' },
            { title: 'Jantar em família', date: 'Sábado, 19:00', type: 'personal' },
          ].map((event, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors animate-slide-up">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};