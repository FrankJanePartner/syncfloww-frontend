import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { secureStorage } from '@/lib/security';
import { API_CONFIG, buildApiUrl } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  signup: (userData: { email: string; password1: string; password2: string; first_name: string; last_name: string }) => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    const token = secureStorage.getItem('auth_token');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(secureStorage.getItem('user') || '{}'),
        token,
      });
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.detail || 'Login failed' };
      }

      const data = await response.json();
      const { access, user } = data;

      secureStorage.setItem('auth_token', access);
      secureStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        isAuthenticated: true,
        user,
        token: access,
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    secureStorage.removeItem('auth_token');
    secureStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  const signup = async (userData: { email: string; password1: string; password2: string; first_name: string; last_name: string }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGNUP), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.detail || 'Signup failed' };
      }

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: (error as Error).message || 'Signup failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
