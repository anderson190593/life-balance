import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('lifeBalanceUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulação de autenticação
        if (email && password) {
          const newUser: User = {
            id: Date.now().toString(),
            name: email.split('@')[0],
            email,
            createdAt: new Date().toISOString(),
          };
          setUser(newUser);
          localStorage.setItem('lifeBalanceUser', JSON.stringify(newUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = (name: string, email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          createdAt: new Date().toISOString(),
        };
        setUser(newUser);
        localStorage.setItem('lifeBalanceUser', JSON.stringify(newUser));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lifeBalanceUser');
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
  };
};