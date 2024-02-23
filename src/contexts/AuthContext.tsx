"use client"
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { redirect } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (user: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Verifica se existe um token salvo ao carregar o app
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (user: any, token: string) => {
    Cookies.set('token', token);
    Cookies.set('user', JSON.stringify(user));
    return router.push('/admin');
  };

  const logout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

