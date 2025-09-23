import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRolePermissions } from '../utils/roleUtils';
import Icon from './IconSystem';
import AnimatedIllustration from './AnimatedIllustrations';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 280px;
  background: 
    var(--pattern-subtle),
    var(--pattern-grid),
    linear-gradient(180deg, var(--color-pure-white) 0%, var(--color-cornsilk) 100%);
  background-size: 4px 4px, 20px 20px, 100% 100%;
  border-right: 1px solid var(--color-border);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(139, 69, 19, 0.05);
  position: relative;
  z-index: 10;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgba(139, 69, 19, 0.2), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(160, 82, 45, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: var(--color-dim-gray);
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  position: relative;
  margin: 0.25rem 1rem;
  border-radius: 0 12px 12px 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: linear-gradient(135deg, var(--color-saddle-brown), var(--color-sienna));
    transition: width 0.3s ease;
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.05), rgba(160, 82, 45, 0.05));
    color: var(--color-saddle-brown);
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);

    &::before {
      width: 4px;
    }
  }

  &.active {
    background: linear-gradient(135deg, var(--color-cornsilk), var(--color-antique-white));
    color: var(--color-saddle-brown);
    border-left-color: var(--color-saddle-brown);
    font-weight: 700;
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(139, 69, 19, 0.2);

    &::before {
      width: 4px;
    }
  }
`;

const NavIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(139, 69, 19, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;

  ${NavItem}:hover & {
    background: rgba(139, 69, 19, 0.2);
    transform: scale(1.1);
  }

  ${NavItem}.active & {
    background: rgba(139, 69, 19, 0.2);
    transform: scale(1.1);
  }
`;

const NavLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const SectionTitle = styled.div`
  padding: 1.5rem 2rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-sienna);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 2rem;
    right: 2rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-border), transparent);
  }
`;

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const permissions = getRolePermissions(user);

  // Common navigation items - everyone can access
  const commonNavItems = [
    { to: '/home', icon: 'home', label: 'Home', illustration: 'farmhouse' },
    { to: '/jobs', icon: 'user-group', label: 'Find Jobs', illustration: 'worker' },
    { to: '/ustad', icon: 'cog', label: 'Ustaad', illustration: 'tools' },
    { to: '/profile', icon: 'user', label: 'Profile', illustration: 'farmer' },
  ];

  // Regular user navigation items - not for agents
  const getRegularUserNavItems = () => {
    const items = [];

    // Farmer-specific items
    if (user && user.primaryRole === 'farmer') {
      items.push({ to: '/vendors', icon: 'home', label: 'Find Vendors', illustration: 'market' });
      items.push({ to: '/market-prices', icon: 'chart-bar', label: 'Market Prices', illustration: 'grain' });
    }

    return items;
  };

  // Role-based navigation items
  const getRoleBasedNavItems = () => {
    const items = [];

    // Job posting - only employers
    if (permissions.canPostJobs) {
      items.push({ to: '/post-job', icon: 'plus', label: 'Post Job', illustration: 'plus' });
    }


    // Worker creation - only agents
    if (permissions.canCreateWorkers) {
      items.push({ to: '/create-worker', icon: 'user-group', label: 'Create Worker', illustration: 'community' });
    }

    // Agent dashboard - only agents
    if (permissions.canViewAnalytics) {
      items.push({ to: '/agent-dashboard', icon: 'chart-bar', label: 'Dashboard', illustration: 'growth' });
    }

    return items;
  };

  const regularUserNavItems = getRegularUserNavItems();
  const roleBasedNavItems = getRoleBasedNavItems();

  return (
    <SidebarContainer>
      <SectionTitle>Main</SectionTitle>
      {commonNavItems.map((item) => (
        <NavItem key={item.to} to={item.to}>
          <NavIcon>
            <Icon name={item.icon} size="18px" animated={true} />
          </NavIcon>
          <NavLabel>{item.label}</NavLabel>
          <AnimatedIllustration
            type={item.illustration as any}
            size="16px"
            color="rgba(139, 69, 19, 0.1)"
            animation="float"
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </NavItem>
      ))}

      {regularUserNavItems.length > 0 && (
        <>
          <SectionTitle>Marketplace</SectionTitle>
          {regularUserNavItems.map((item) => (
            <NavItem key={item.to} to={item.to}>
              <NavIcon>
                <Icon name={item.icon} size="18px" animated={true} />
              </NavIcon>
              <NavLabel>{item.label}</NavLabel>
              <AnimatedIllustration
                type={item.illustration as any}
                size="16px"
                color="rgba(139, 69, 19, 0.1)"
                animation="pulse"
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </NavItem>
          ))}
        </>
      )}

      {roleBasedNavItems.length > 0 && (
        <>
          <SectionTitle>Your Tools</SectionTitle>
          {roleBasedNavItems.map((item) => (
            <NavItem key={item.to} to={item.to}>
              <NavIcon>
                <Icon name={item.icon} size="18px" animated={true} />
              </NavIcon>
              <NavLabel>{item.label}</NavLabel>
              <AnimatedIllustration
                type={item.illustration as any}
                size="16px"
                color="rgba(139, 69, 19, 0.1)"
                animation="wave"
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </NavItem>
          ))}
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
