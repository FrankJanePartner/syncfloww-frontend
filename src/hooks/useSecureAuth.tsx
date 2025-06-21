
import { useState, useEffect } from 'react';
import { secureStorage } from '@/lib/security';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  useEffect(() => {
    // Check for existing auth on mount
    const token = secureStorage.getItem('auth_token');
    if (token) {
      // In a real app, verify token with backend
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(secureStorage.getItem('user') || '{}'),
        token
      });
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      // In a real app, make API call to backend
      console.log('Login attempt with secure practices:', credentials.email);
      
      // Simulate successful login
      const mockUser = { id: '1', email: credentials.email, name: 'User' };
      const mockToken = 'secure_jwt_token';
      
      // Store auth data securely (in production, use httpOnly cookies)
      secureStorage.setItem('auth_token', mockToken);
      secureStorage.setItem('user', JSON.stringify(mockUser));
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        token: mockToken
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
      token: null
    });
  };

  const signup = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      console.log('Signup attempt with secure practices:', userData.email);
      
      // In a real app, make API call to backend
      const mockUser = { 
        id: '1', 
        email: userData.email, 
        name: `${userData.firstName} ${userData.lastName}` 
      };
      const mockToken = 'secure_jwt_token';
      
      secureStorage.setItem('auth_token', mockToken);
      secureStorage.setItem('user', JSON.stringify(mockUser));
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        token: mockToken
      });
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Signup failed' };
    }
  };

  return {
    ...authState,
    login,
    logout,
    signup
  };
};
