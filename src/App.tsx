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
                <Route path="profile" element={<ProfilePage />} />
                
                {/* Farmer-only routes - only accessible if user is farmer */}
                <Route 
                  path="vendors" 
                  element={<VendorsPage />} 
                />
                <Route 
                  path="vendors/:id" 
                  element={<VendorDetailsPage />} 
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
                    <RoleGuard requiredRoles={['employer']}>
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
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4CAF50',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#f44336',
                    secondary: '#fff',
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