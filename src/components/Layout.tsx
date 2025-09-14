import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: transparent;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 0 0 0 20px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
    background: transparent;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  animation: fadeIn 0.5s ease-in;
  padding-bottom: 100px; /* Space for mobile bottom nav */
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: 100px;
  }
`;

const MobileOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Layout: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log('Layout - isAuthenticated:', isAuthenticated);
  console.log('Layout - isLoading:', isLoading);
  console.log('Layout - user:', user);
  console.log('Layout - localStorage token:', !!localStorage.getItem('token'));
  console.log('Layout - localStorage user:', !!localStorage.getItem('user'));

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#1976D2'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Layout - Redirecting to login because not authenticated');
    return <Navigate to="/login" replace />;
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Navbar />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
