import React, { useState } from 'react';
import { Plus, Heart, Clock, Smile, BookOpen } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { WellnessRecord } from '../../types';

export const WellnessSection: React.FC = () => {
  const [records, setRecords] = useLocalStorage<WellnessRecord[]>('wellness-records', []);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = setState({
    type: 'meditation' as 'meditation' | 'gratitude' | 'reflection',
    content: '',
    duration: 0,
    mood: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: WellnessRecord = {
      id: Date.now().toString(),
      type: formData.type,
      content: formData.content,
      duration: formData.duration,
      mood: formData.mood,
      date: new Date().toISOString(),
    };
    setRecords([newRecord, ...records]);
    setFormData({
      type: 'meditation',
      content: '',
      duration: 0,
      mood: 5,
    });
    setShowForm(false);
  };

  const meditationCount = records.filter(r => r.type === 'meditation').length;
  const gratitudeCount = records.filter(r => r.type === 'gratitude').length;
  const reflectionCount = records.filter(r => r.type === 'reflection').length;
  const avgMood = records.length > 0 
    ? Math.round(records.reduce((sum, r) => sum + r.mood, 0) / records.length * 10) / 10
    : 0;

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😕';
    if (mood <= 6) return '😐';
    if (mood <= 8) return '😊';
    return '😄';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bem-estar Espiritual</h2>
          <p className="text-gray-600">Cuide da sua mente e espírito</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Entrada</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meditações</p>
              <p className="text-2xl font-bold text-gray-900">{meditationCount}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-success-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gratidões</p>
              <p className="text-2xl font-bold text-gray-900">{gratitudeCount}</p>
            </div>
            <div className="bg-success-50 p-3 rounded-lg">
              <Smile className="h-6 w-6 text-success-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reflexões</p>
              <p className="text-2xl font-bold text-gray-900">{reflectionCount}</p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-warning-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Humor Médio</p>
              <p className="text-2xl font-bold text-gray-900">{avgMood}/10</p>
            </div>
            <div className="bg-warning-50 p-3 rounded-lg text-2xl">
              {getMoodEmoji(avgMood)}
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Entrada de Bem-estar</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="meditation">Meditação</option>
                  <option value="gratitude">Gratidão</option>
                  <option value="reflection">Reflexão</option>
                </select>
              </div>

              {formData.type === 'meditation' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="15"
                    required
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'meditation' ? 'Observações' :
                 formData.type === 'gratitude' ? 'Pelo que você é grato hoje?' :
                 'Suas reflexões'}
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={
                  formData.type === 'meditation' ? 'Como foi sua meditação hoje?' :
                  formData.type === 'gratitude' ? 'Escreva sobre as coisas pelas quais você é grato...' :
                  'Compartilhe suas reflexões e pensamentos...'
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Como você se sente? (1-10) {getMoodEmoji(formData.mood)}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 - Muito mal</span>
                <span>10 - Excelente</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Salvar Entrada
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Entradas Recentes</h3>
        
        {records.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-2">Nenhuma entrada ainda</p>
            <p className="text-sm text-gray-400">Comece registrando uma meditação, gratidão ou reflexão!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.slice(0, 10).map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      record.type === 'meditation' ? 'bg-purple-50 text-purple-500' :
                      record.type === 'gratitude' ? 'bg-success-50 text-success-500' :
                      'bg-primary-50 text-primary-500'
                    }`}>
                      {record.type === 'meditation' ? <Heart className="h-4 w-4" /> :
                       record.type === 'gratitude' ? <Smile className="h-4 w-4" /> :
                       <BookOpen className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {record.type === 'meditation' ? 'Meditação' :
                         record.type === 'gratitude' ? 'Gratidão' :
                         'Reflexão'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(record.date).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(record.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {record.type === 'meditation' && record.duration && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{record.duration}min</span>
                      </div>
                    )}
                    <div className="text-lg">{getMoodEmoji(record.mood)}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 line-clamp-3">{record.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};