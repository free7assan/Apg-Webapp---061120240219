import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  user: AuthUser | null;
  error: string | null;
  handleAuth: (email: string, password: string, isAdminLogin: boolean) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_EMAILS = ['free7assan@gmail.com'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = useCallback(async (email: string, password: string, isAdminLogin: boolean) => {
    try {
      setError(null);
      const isAdminEmail = ADMIN_EMAILS.includes(email.toLowerCase());

      if (isAdminLogin) {
        if (!isAdminEmail) {
          throw new Error('Invalid administrator credentials');
        }
      } else {
        if (isAdminEmail) {
          throw new Error('Please use the Admin Login for administrator access');
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({ 
        id: '1', 
        email,
        role: isAdminEmail ? 'admin' : 'user'
      });
      setIsAuthenticated(true);
      setShowAuthModal(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setShowAuthModal(false);
  }, []);

  const value = {
    isAuthenticated,
    showAuthModal,
    setShowAuthModal,
    user,
    error,
    handleAuth,
    logout,
    isAdmin: user?.role === 'admin' ?? false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}