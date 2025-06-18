import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { FinancialSection } from './components/Sections/FinancialSection';
import { ProfessionalSection } from './components/Sections/ProfessionalSection';
import { WellnessSection } from './components/Sections/WellnessSection';

function App() {
  const { user, isLoading, login, register, logout } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    if (isRegister) {
      return (
        <RegisterForm
          onRegister={register}
          onSwitchToLogin={() => setIsRegister(false)}
        />
      );
    }

    return (
      <LoginForm
        onLogin={login}
        onSwitchToRegister={() => setIsRegister(true)}
      />
    );
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-goal':
        setActiveSection('dashboard');
        break;
      case 'add-event':
        setActiveSection('dashboard');
        break;
      case 'add-expense':
        setActiveSection('financial');
        break;
      case 'add-meditation':
        setActiveSection('wellness');
        break;
      case 'add-exercise':
        setActiveSection('health');
        break;
      default:
        break;
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onQuickAction={handleQuickAction} />;
      case 'financial':
        return <FinancialSection />;
      case 'professional':
        return <ProfessionalSection />;
      case 'wellness':
        return <WellnessSection />;
      case 'health':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Saúde e Fitness</h2>
            <p className="text-gray-600">Seção em desenvolvimento...</p>
          </div>
        );
      case 'relationships':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relacionamentos</h2>
            <p className="text-gray-600">Seção em desenvolvimento...</p>
          </div>
        );
      case 'projects':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projetos Pessoais</h2>
            <p className="text-gray-600">Seção em desenvolvimento...</p>
          </div>
        );
      default:
        return <Dashboard onQuickAction={handleQuickAction} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Header user={user} onLogout={logout} />
        
        <main className="flex-1 p-6 lg:pl-0">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default App;