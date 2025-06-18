export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  targetDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface FinancialRecord {
  id: string;
  type: 'income' | 'expense' | 'investment';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface HealthRecord {
  id: string;
  type: 'exercise' | 'nutrition' | 'sleep';
  value: number;
  unit: string;
  notes?: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  category: string;
  completed: boolean;
}

export interface ProfessionalRecord {
  id: string;
  type: 'course' | 'networking' | 'skill';
  title: string;
  description: string;
  progress: number;
  category: string;
  createdAt: string;
}

export interface WellnessRecord {
  id: string;
  type: 'meditation' | 'gratitude' | 'reflection';
  content: string;
  duration?: number;
  mood: number;
  date: string;
}

export interface RelationshipRecord {
  id: string;
  name: string;
  type: 'family' | 'friend' | 'work';
  lastContact: string;
  notes: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'hobby' | 'study' | 'dream';
  progress: number;
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
}