import React from 'react';
import { 
  Home, 
  DollarSign, 
  Briefcase, 
  Heart, 
  Activity, 
  Users, 
  Target,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'financial', label: 'Gestão Financeira', icon: DollarSign },
  { id: 'professional', label: 'Desenvolvimento Profissional', icon: Briefcase },
  { id: 'wellness', label: 'Bem-estar Espiritual', icon: Heart },
  { id: 'health', label: 'Saúde e Fitness', icon: Activity },
  { id: 'relationships', label: 'Relacionamentos', icon: Users },
  { id: 'projects', label: 'Projetos Pessoais', icon: Target },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  isOpen,
  onToggle,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:flex flex-col w-64 bg-white shadow-lg z-50 h-full
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Life Balance</h1>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${activeSection === item.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
};