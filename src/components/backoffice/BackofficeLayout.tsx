import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart2, 
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface BackofficeLayoutProps {
  children: React.ReactNode;
}

export function BackofficeLayout({ children }: BackofficeLayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/backoffice', icon: LayoutDashboard },
    { name: 'Users', href: '/backoffice/users', icon: Users },
    { name: 'Subscriptions', href: '/backoffice/subscriptions', icon: CreditCard },
    { name: 'Analytics', href: '/backoffice/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/backoffice/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || '')}`}
                  alt=""
                />
                <span className="text-sm font-medium text-gray-700">{user?.email}</span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {/* Sidebar Navigation */}
            <div className="w-64 mr-8">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-3 py-2 text-sm font-medium border-l-4`}
                    >
                      <item.icon
                        className={`${
                          isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                        } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}