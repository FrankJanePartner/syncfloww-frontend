import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useSecureAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSecureAuth must be used within an AuthProvider');
  }
  return context;
};

export default useSecureAuth;
