import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Plus, Filter } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FinancialRecord } from '../../types';

const mockExpenseData = [
  { name: 'Alimentação', value: 800, color: '#3B82F6' },
  { name: 'Transporte', value: 400, color: '#10B981' },
  { name: 'Moradia', value: 1200, color: '#8B5CF6' },
  { name: 'Entretenimento', value: 300, color: '#F59E0B' },
  { name: 'Outros', value: 200, color: '#EF4444' },
];

const mockMonthlyData = [
  { month: 'Jan', receita: 4000, despesa: 2800 },
  { month: 'Fev', receita: 4200, despesa: 2900 },
  { month: 'Mar', receita: 4100, despesa: 3100 },
  { month: 'Abr', receita: 4300, despesa: 2700 },
  { month: 'Mai', receita: 4500, despesa: 2900 },
  { month: 'Jun', receita: 4400, despesa: 3200 },
];

export const FinancialSection: React.FC = () => {
  const [records, setRecords] = useLocalStorage<FinancialRecord[]>('financial-records', []);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense' | 'investment'>('all');

  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense' | 'investment',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: FinancialRecord = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date,
    };
    setRecords([newRecord, ...records]);
    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const filteredRecords = records.filter(record => 
    filter === 'all' || record.type === filter
  );

  const totalIncome = records
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = records
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalInvestments = records
    .filter(r => r.type === 'investment')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão Financeira</h2>
          <p className="text-gray-600">Controle suas finanças pessoais</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Transação</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-success-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receitas</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-success-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Despesas</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saldo</p>
              <p className={`text-2xl font-bold ${
                totalIncome - totalExpenses >= 0 ? 'text-success-600' : 'text-red-600'
              }`}>
                R$ {(totalIncome - totalExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Gastos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockExpenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockExpenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {mockExpenseData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Receitas vs Despesas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Bar dataKey="receita" fill="#10B981" name="Receita" />
                <Bar dataKey="despesa" fill="#EF4444" name="Despesa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Transação</h3>
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
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
                <option value="investment">Investimento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0,00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Almoço, Salário, Ações..."
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
                placeholder="Ex: Alimentação, Trabalho..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Salvar Transação
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

      {/* Transaction List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Transações Recentes</h3>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Todas</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
              <option value="investment">Investimentos</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredRecords.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhuma transação encontrada. Adicione sua primeira transação!
            </p>
          ) : (
            filteredRecords.slice(0, 10).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    record.type === 'income' ? 'bg-success-50 text-success-500' :
                    record.type === 'expense' ? 'bg-red-50 text-red-500' :
                    'bg-primary-50 text-primary-500'
                  }`}>
                    {record.type === 'income' ? <TrendingUp className="h-4 w-4" /> :
                     record.type === 'expense' ? <TrendingDown className="h-4 w-4" /> :
                     <DollarSign className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.description}</p>
                    <p className="text-xs text-gray-500">{record.category} • {new Date(record.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    record.type === 'income' ? 'text-success-600' : 'text-red-600'
                  }`}>
                    {record.type === 'income' ? '+' : '-'}R$ {record.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};