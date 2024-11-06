import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Backoffice } from './pages/Backoffice';
import { BackofficeLogin } from './pages/BackofficeLogin';
import { useAuth } from './hooks/useAuth';
import { AuthModal } from './components/AuthModal';
import { PlaybookProvider } from './context/PlaybookContext';

export default function App() {
  const { 
    isAuthenticated, 
    showAuthModal, 
    setShowAuthModal,
    user,
    isAdmin,
    error,
    handleAuth,
    logout
  } = useAuth();

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to={isAdmin ? "/backoffice" : "/dashboard"} replace /> : 
              <LandingPage onSignIn={() => setShowAuthModal(true)} />
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={
            <PlaybookProvider>
              {isAuthenticated && !isAdmin ? 
                <Dashboard user={user} onLogout={logout} /> : 
                <Navigate to="/" replace />}
            </PlaybookProvider>
          } 
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && isAdmin ? 
              <Navigate to="/backoffice" replace /> : 
              <BackofficeLogin />
          }
        />
        <Route
          path="/backoffice/*"
          element={
            isAuthenticated && isAdmin ?
              <Backoffice /> :
              <Navigate to="/admin" replace />
          }
        />
      </Routes>

      <AuthModal 
        show={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        error={error}
      />
    </div>
  );
}