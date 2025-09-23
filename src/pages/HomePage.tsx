import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getRolePermissions } from '../utils/roleUtils';
import { getRoleSlogan } from '../utils/slogans';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AnimatedIllustration from '../components/AnimatedIllustrations';
import Icon from '../components/IconSystem';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  background: 
    var(--pattern-diagonal),
    linear-gradient(135deg, var(--color-saddle-brown), var(--color-sienna));
  color: var(--color-pure-white);
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;


const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ActionCard = styled(Link)`
  background: 
    var(--pattern-subtle),
    var(--pattern-dots),
    var(--color-card-background);
  background-size: 4px 4px, 20px 20px, 100% 100%;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid var(--color-border);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15);
    border-color: var(--color-saddle-brown);
    background: 
      var(--pattern-waves),
      var(--pattern-dots),
      var(--color-card-background);
    background-size: 30px 30px, 20px 20px, 100% 100%;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-sea-green), var(--color-peru));
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -20px;
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(139, 69, 19, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
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
  color: var(--color-saddle-brown);
`;

const ActionDescription = styled.p`
  color: var(--color-dim-gray);
  margin: 0;
  line-height: 1.5;
`;

const StatsSection = styled.div`
  background: 
    var(--pattern-grid),
    var(--color-card-background);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 30%, rgba(139, 69, 19, 0.05) 0%, transparent 50%);
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const StatsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--color-saddle-brown);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: 
    var(--pattern-circles),
    var(--color-beige);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-sea-green), var(--color-peru));
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-saddle-brown);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--color-dim-gray);
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
      icon: 'briefcase',
      title: 'Find Jobs',
      description: 'Browse and apply for job opportunities',
      color: 'var(--color-saddle-brown)'
    });

    // Vendor access only for farmers
    if (user && user.primaryRole === 'farmer') {
      actions.push({
        to: '/vendors',
        icon: 'home',
        title: 'Find Vendors',
        description: 'Connect with verified vendors in your area',
        color: 'var(--color-peru)'
      });
    }

    // Market prices for farmers only
    if (user && user.primaryRole === 'farmer') {
      actions.push({
        to: '/market-prices',
        icon: 'chart-bar',
        title: 'Market Prices',
        description: 'View live market prices',
        color: 'var(--color-sea-green)'
      });
    }

    // Role-specific actions
    if (permissions.canPostJobs) {
      actions.push({
        to: '/post-job',
        icon: 'plus',
        title: 'Post Job',
        description: 'Create and post new job opportunities',
        color: 'var(--color-warm-orange)'
      });
    }

    // Logistics action for employers
    if (userRole === 'employer') {
      actions.push({
        to: '/logistics',
        icon: 'truck',
        title: 'Logistics',
        description: 'Manage transportation and logistics',
        color: 'var(--color-sienna)'
      });
    }


    if (permissions.canCreateWorkers) {
      actions.push({
        to: '/create-worker',
        icon: 'user-group',
        title: 'Create Worker',
        description: 'Register new workers in the system',
        color: 'var(--color-burlywood)'
      });
    }

    if (permissions.canViewAnalytics) {
      actions.push({
        to: '/agent-dashboard',
        icon: 'chart-bar',
        title: 'Dashboard',
        description: 'View analytics and manage the platform',
        color: 'var(--color-tan)'
      });
    }

    return actions;
  };

  const quickActions = getQuickActions();

  return (
    <Container>
      <WelcomeSection>
        <AnimatedIllustration type="tractor" size="64px" color="rgba(255, 255, 255, 0.4)" animation="float" style={{ position: 'absolute', top: '20px', left: '20px' }} />
        <AnimatedIllustration type="harvest" size="48px" color="rgba(255, 255, 255, 0.3)" animation="pulse" style={{ position: 'absolute', top: '40px', right: '40px' }} />
        <AnimatedIllustration type="farmer" size="56px" color="rgba(255, 255, 255, 0.35)" animation="wave" style={{ position: 'absolute', bottom: '20px', left: '50px' }} />
        <AnimatedIllustration type="growth" size="40px" color="rgba(255, 255, 255, 0.25)" animation="glow" style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)' }} />
        <WelcomeTitle>
          {roleSlogan.odia}
        </WelcomeTitle>
      </WelcomeSection>

      <QuickActionsGrid>
        {quickActions.map((action, index) => (
          <ActionCard key={index} to={action.to}>
            <AnimatedIllustration
              type={action.title === 'Find Jobs' ? 'worker' :
                action.title === 'Find Vendors' ? 'market' :
                  action.title === 'Market Prices' ? 'grain' :
                    action.title === 'Post Job' ? 'tools' :
                      action.title === 'Logistics' ? 'truck' :
                        action.title === 'Create Worker' ? 'community' :
                          action.title === 'Dashboard' ? 'growth' : 'tools'}
              size="24px"
              color="rgba(139, 69, 19, 0.1)"
              animation="float"
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            />
            <ActionIcon color={action.color}>
              <Icon
                name={action.title === 'Find Jobs' ? 'user-group' :
                  action.title === 'Find Vendors' ? 'home' :
                    action.title === 'Market Prices' ? 'chart-bar' :
                      action.title === 'Post Job' ? 'plus' :
                        action.title === 'Logistics' ? 'truck' :
                          action.title === 'Create Worker' ? 'user-group' :
                            action.title === 'Dashboard' ? 'chart-bar' : 'cog'}
                size="24px"
                variant="solid"
                animated={true}
              />
            </ActionIcon>
            <ActionTitle>{action.title}</ActionTitle>
            <ActionDescription>{action.description}</ActionDescription>
          </ActionCard>
        ))}
      </QuickActionsGrid>

      <StatsSection>
        <AnimatedIllustration type="farmhouse" size="48px" color="rgba(139, 69, 19, 0.1)" animation="float" style={{ position: 'absolute', top: '20px', right: '20px' }} />
        <StatsTitle>Platform Statistics</StatsTitle>
        <StatsGrid>
          <StatItem>
            <AnimatedIllustration type="worker" size="20px" color="var(--color-sea-green)" animation="pulse" style={{ position: 'absolute', top: '8px', right: '8px' }} />
            <StatNumber>1,234</StatNumber>
            <StatLabel>Active Jobs</StatLabel>
          </StatItem>
          <StatItem>
            <AnimatedIllustration type="market" size="20px" color="var(--color-peru)" animation="bounce" style={{ position: 'absolute', top: '8px', right: '8px' }} />
            <StatNumber>567</StatNumber>
            <StatLabel>Verified Vendors</StatLabel>
          </StatItem>
          <StatItem>
            <AnimatedIllustration type="community" size="20px" color="var(--color-saddle-brown)" animation="wave" style={{ position: 'absolute', top: '8px', right: '8px' }} />
            <StatNumber>890</StatNumber>
            <StatLabel>Active Users</StatLabel>
          </StatItem>
          <StatItem>
            <AnimatedIllustration type="success" size="20px" color="var(--color-warm-orange)" animation="glow" style={{ position: 'absolute', top: '8px', right: '8px' }} />
            <StatNumber>456</StatNumber>
            <StatLabel>Successful Matches</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>
    </Container>
  );
};

export default HomePage;
