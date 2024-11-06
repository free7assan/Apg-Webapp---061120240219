import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BackofficeLayout } from '../components/backoffice/BackofficeLayout';
import { Dashboard } from '../components/backoffice/Dashboard';
import { Users } from '../components/backoffice/Users';
import { Subscriptions } from '../components/backoffice/Subscriptions';
import { Analytics } from '../components/backoffice/Analytics';
import { Settings } from '../components/backoffice/Settings';
import { useAuth } from '../hooks/useAuth';

export function Backoffice() {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <BackofficeLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BackofficeLayout>
  );
}