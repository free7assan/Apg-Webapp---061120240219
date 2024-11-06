import React from 'react';
import { Terminal, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSignIn: () => void;
  isAuthenticated: boolean;
  userEmail?: string;
  onLogout?: () => void;
}

export function Header({ onSignIn, isAuthenticated, userEmail, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Terminal className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Ansible Generator</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#features" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Features
              </a>
              <a href="#pricing" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </a>
              {isAuthenticated && userEmail?.includes('admin') && (
                <Link to="/backoffice" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  Admin Portal
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{userEmail}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                >
                  Sign in
                </button>
                <Link
                  to="/backoffice/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}