import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

const ADMIN_CREDENTIALS = {
  email: 'free7assan@gmail.com',
  password: 'admin123'
};

const USER_CREDENTIALS = {
  email: 'user@gmail.com',
  password: '123456'
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = useCallback(async (email: string, password: string, isAdminLogin: boolean) => {
    try {
      setError(null);
      
      // Validate credentials
      if (isAdminLogin) {
        if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
          throw new Error('Invalid administrator credentials');
        }
      } else {
        if (email === ADMIN_CREDENTIALS.email) {
          throw new Error('Please use the Admin Login for administrator access');
        }
        if (email !== USER_CREDENTIALS.email || password !== USER_CREDENTIALS.password) {
          throw new Error('Invalid email or password');
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isAdmin = email === ADMIN_CREDENTIALS.email;
      
      setUser({ 
        id: isAdmin ? 'admin-1' : 'user-1', 
        email,
        role: isAdmin ? 'admin' : 'user'
      });
      setIsAuthenticated(true);
      setShowAuthModal(false);

      // Redirect based on role
      if (isAdmin) {
        navigate('/backoffice');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      throw err;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setShowAuthModal(false);
    navigate('/');
  }, [navigate]);

  const isAdmin = user?.role === 'admin';

  return {
    isAuthenticated,
    showAuthModal,
    setShowAuthModal,
    user,
    error,
    handleAuth,
    logout,
    isAdmin,
  };
}