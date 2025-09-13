'use client';

import { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin-login';
import AdminDashboard from '@/components/admin-dashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin-token');
      if (token) {
        try {
          const decoded = JSON.parse(atob(token));
          const now = Date.now() / 1000;
          if (decoded.exp > now) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('admin-token');
          }
        } catch {
          localStorage.removeItem('admin-token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
