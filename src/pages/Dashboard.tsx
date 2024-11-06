import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout } from 'lucide-react';
import { Header } from '../components/Header';
import { PlaybookForm } from '../components/PlaybookForm';
import { History } from '../components/History';
import { Settings } from '../components/Settings';

interface DashboardProps {
  user: { email: string } | null;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        isAuthenticated={true}
        userEmail={user?.email}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex space-x-4 mb-6">
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/dashboard'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Generator
          </Link>
          <Link
            to="/dashboard/history"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/dashboard/history'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            History
          </Link>
          <Link
            to="/dashboard/settings"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/dashboard/settings'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<PlaybookForm />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}