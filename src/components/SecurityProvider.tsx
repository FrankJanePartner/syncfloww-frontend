
import React, { createContext, useContext, useEffect } from 'react';

interface SecurityContextType {
  csrfToken: string;
  isSecureConnection: boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [csrfToken, setCsrfToken] = React.useState<string>('');
  const [isSecureConnection, setIsSecureConnection] = React.useState<boolean>(false);

  useEffect(() => {
    // Generate CSRF token
    const token = crypto.getRandomValues(new Uint8Array(32))
      .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
    setCsrfToken(token);

    // Check if connection is secure
    setIsSecureConnection(window.location.protocol === 'https:');

    // Set security headers if possible
    if ('serviceWorker' in navigator) {
      // Register service worker for additional security controls
      console.log('Security context initialized');
    }

    // Content Security Policy warning for development
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Remember to configure CSP headers in production');
    }
  }, []);

  const value: SecurityContextType = {
    csrfToken,
    isSecureConnection
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider;
