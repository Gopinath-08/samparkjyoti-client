import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getRolePermissions, getRoleDisplayName } from '../utils/roleUtils';
import { getRoleSlogan } from '../utils/slogans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faStore,
  faUser,
  faPlus,
  faShoppingCart,
  faLeaf,
  faUsers,
  faTachometerAlt,
  faHammer,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #1976D2, #1565C0);
  color: white;
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(25, 118, 210, 0.3);
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
`;

const OdiaSlogan = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  color: #fff;
  font-family: 'Noto Sans Oriya', sans-serif;
`;

const EnglishTranslation = styled.div`
  font-size: 1rem;
  margin: 0.5rem 0;
  opacity: 0.8;
  font-style: italic;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ActionCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #1976D2;
  }
`;

const ActionIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.color}20;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${props => props.color};
  font-size: 1.5rem;
`;

const ActionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1f2937;
`;

const ActionDescription = styled.p`
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;

const StatsSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const StatsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: #1f2937;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
`;

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const permissions = getRolePermissions(user);
  const userRole = user?.primaryRole || 'user';
  const roleSlogan = getRoleSlogan(userRole);

  const getQuickActions = () => {
    const actions = [];

    // Common actions for all users
    actions.push({
      to: '/jobs',
      icon: faBriefcase,
      title: 'Find Jobs',
      description: 'Browse and apply for job opportunities',
      color: '#1976D2'
    });

    // Market access for regular users
    if (user && !permissions.canManageUsers) {
      if (user.primaryRole === 'farmer') {
        // For farmers, show both Market (live prices) and Buy Product (farmer products)
        actions.push({
          to: '/market-prices',
          icon: faStore,
          title: 'Market',
          description: 'View live market prices for agricultural products',
          color: '#4CAF50'
        });
        actions.push({
          to: '/market',
          icon: faShoppingCart,
          title: 'Buy Product',
          description: 'Browse and purchase agricultural products',
          color: '#FF9800'
        });
      } else if (user.primaryRole === 'employer') {
        // For employers, show Buy Product
        actions.push({
          to: '/market',
          icon: faStore,
          title: 'Buy Product',
          description: 'Browse and purchase agricultural products',
          color: '#4CAF50'
        });
      } else {
        // For other roles (labour, buyer), show Marketplace
        actions.push({
          to: '/market',
          icon: faStore,
          title: 'Marketplace',
          description: 'Browse and purchase agricultural products',
          color: '#4CAF50'
        });
      }
    }

    // Role-specific actions
    if (permissions.canPostJobs) {
      actions.push({
        to: '/post-job',
        icon: faPlus,
        title: 'Post Job',
        description: 'Create and post new job opportunities',
        color: '#FF9800'
      });
    }

    // Logistics action for employers
    if (userRole === 'employer') {
      actions.push({
        to: '/logistics',
        icon: faTruck,
        title: 'Logistics',
        description: 'Manage transportation and logistics',
        color: '#795548'
      });
    }

    if (permissions.canPostProducts) {
      actions.push({
        to: '/sell-product',
        icon: faLeaf,
        title: 'Sell Product',
        description: 'List your agricultural products for sale',
        color: '#4CAF50'
      });
    }

    if (permissions.canCreateWorkers) {
      actions.push({
        to: '/create-worker',
        icon: faUsers,
        title: 'Create Worker',
        description: 'Register new workers in the system',
        color: '#9C27B0'
      });
    }

    if (permissions.canViewAnalytics) {
      actions.push({
        to: '/agent-dashboard',
        icon: faTachometerAlt,
        title: 'Dashboard',
        description: 'View analytics and manage the platform',
        color: '#607D8B'
      });
    }

    return actions;
  };

  const quickActions = getQuickActions();

  return (
    <Container>
      <WelcomeSection>
        <WelcomeTitle>
          {roleSlogan.odia}
        </WelcomeTitle>
      </WelcomeSection>

      <QuickActionsGrid>
        {quickActions.map((action, index) => (
          <ActionCard key={index} to={action.to}>
            <ActionIcon color={action.color}>
              <FontAwesomeIcon icon={action.icon} />
            </ActionIcon>
            <ActionTitle>{action.title}</ActionTitle>
            <ActionDescription>{action.description}</ActionDescription>
          </ActionCard>
        ))}
      </QuickActionsGrid>

      <StatsSection>
        <StatsTitle>Platform Statistics</StatsTitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>1,234</StatNumber>
            <StatLabel>Active Jobs</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>567</StatNumber>
            <StatLabel>Products Listed</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>890</StatNumber>
            <StatLabel>Active Users</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>456</StatNumber>
            <StatLabel>Successful Matches</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>
    </Container>
  );
};

export default HomePage;
