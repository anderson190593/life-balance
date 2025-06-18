import React, { useState } from 'react';
import { Plus, Briefcase, BookOpen, Users, TrendingUp, Award } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ProfessionalRecord } from '../../types';

export const ProfessionalSection: React.FC = () => {
  const [records, setRecords] = useLocalStorage<ProfessionalRecord[]>('professional-records', []);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'course' as 'course' | 'networking' | 'skill',
    title: '',
    description: '',
    category: '',
    progress: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ProfessionalRecord = {
      id: Date.now().toString(),
      type: formData.type,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      progress: formData.progress,
      createdAt: new Date().toISOString(),
    };
    setRecords([newRecord, ...records]);
    setFormData({
      type: 'course',
      title: '',
      description: '',
      category: '',
      progress: 0,
    });
    setShowForm(false);
  };

  const courseCount = records.filter(r => r.type === 'course').length;
  const networkingCount = records.filter(r => r.type === 'networking').length;
  const skillCount = records.filter(r => r.type === 'skill').length;
  const avgProgress = records.length > 0 
    ? Math.round(records.reduce((sum, r) => sum + r.progress, 0) / records.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Desenvolvimento Profissional</h2>
          <p className="text-gray-600">Acompanhe seu crescimento na carreira</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Item</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cursos</p>
              <p className="text-2xl font-bold text-gray-900">{courseCount}</p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-success-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Networking</p>
              <p className="text-2xl font-bold text-gray-900">{networkingCount}</p>
            </div>
            <div className="bg-success-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-success-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Habilidades</p>
              <p className="text-2xl font-bold text-gray-900">{skillCount}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-warning-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progresso Médio</p>
              <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
            </div>
            <div className="bg-warning-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-warning-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Novo Item de Desenvolvimento</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="course">Curso</option>
                <option value="networking">Networking</option>
                <option value="skill">Habilidade</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Curso de React, Evento de UX..."
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Descreva os detalhes..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Tecnologia, Marketing..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Progresso (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0"
                required
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Salvar Item
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Records List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Itens de Desenvolvimento</h3>
        
        {records.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-2">Nenhum item adicionado ainda</p>
            <p className="text-sm text-gray-400">Comece adicionando um curso, evento ou habilidade!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {records.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    record.type === 'course' ? 'bg-primary-50 text-primary-500' :
                    record.type === 'networking' ? 'bg-success-50 text-success-500' :
                    'bg-purple-50 text-purple-500'
                  }`}>
                    {record.type === 'course' ? <BookOpen className="h-4 w-4" /> :
                     record.type === 'networking' ? <Users className="h-4 w-4" /> :
                     <Award className="h-4 w-4" />}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {record.category}
                  </span>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">{record.title}</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{record.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progresso</span>
                    <span className="text-sm font-medium text-gray-900">{record.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        record.type === 'course' ? 'bg-primary-500' :
                        record.type === 'networking' ? 'bg-success-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${record.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Criado em {new Date(record.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};