import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import RoleGuard from './components/RoleGuard';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobPostingPage from './pages/JobPostingPage';
import AgentDashboard from './pages/AgentDashboard';
import CreateWorkerPage from './pages/CreateWorkerPage';
import UstadPage from './pages/UstadPage';
import UstaadDetailPage from './pages/UstaadDetailPage';
import LogisticsPage from './pages/LogisticsPage';
import MarketPricesPage from './pages/MarketPricesPage';
import VendorsPage from './pages/VendorsPage';
import VendorDetailsPage from './pages/VendorDetailsPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<HomePage />} />

                {/* Public viewing routes - everyone can access */}
                <Route path="jobs" element={<JobsPage />} />
                <Route path="ustad" element={<UstadPage />} />
                <Route path="ustad/:id" element={<UstaadDetailPage />} />
                <Route path="profile" element={<ProfilePage />} />

                {/* Farmer-only routes - only accessible if user is farmer */}
                <Route
                  path="vendors"
                  element={
                    <RoleGuard requiredRoles={['farmer']}>
                      <VendorsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="vendors/:id"
                  element={
                    <RoleGuard requiredRoles={['farmer']}>
                      <VendorDetailsPage />
                    </RoleGuard>
                  }
                />

                <Route
                  path="market-prices"
                  element={
                    <RoleGuard requiredRoles={['farmer']}>
                      <MarketPricesPage />
                    </RoleGuard>
                  }
                />

                {/* Role-restricted routes */}
                <Route
                  path="post-job"
                  element={
                    <RoleGuard requiredPermissions={['canPostJobs']}>
                      <JobPostingPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="agent-dashboard"
                  element={
                    <RoleGuard requiredRoles={['agent']}>
                      <AgentDashboard />
                    </RoleGuard>
                  }
                />
                <Route
                  path="create-worker"
                  element={
                    <RoleGuard requiredPermissions={['canCreateWorkers']}>
                      <CreateWorkerPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="logistics"
                  element={
                    <RoleGuard requiredRoles={['employer', 'farmer', 'buyer']}>
                      <LogisticsPage />
                    </RoleGuard>
                  }
                />
              </Route>
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--color-saddle-brown)',
                  color: 'var(--color-pure-white)',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: 'var(--color-sea-green)',
                    secondary: 'var(--color-pure-white)',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: 'var(--color-warm-orange)',
                    secondary: 'var(--color-pure-white)',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;