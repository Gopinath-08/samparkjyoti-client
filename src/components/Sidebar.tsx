import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faStore,
  faUser,
  faPlus,
  faUsers,
  faTachometerAlt,
  faHammer
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgba(25, 118, 210, 0.2), transparent);
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: #64748b;
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
    background: linear-gradient(135deg, #1976D2, #1565C0);
    transition: width 0.3s ease;
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.05), rgba(21, 101, 192, 0.05));
    color: #1976D2;
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);

    &::before {
      width: 4px;
    }
  }

  &.active {
    background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
    color: #1976D2;
    border-left-color: #1976D2;
    font-weight: 700;
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.2);

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
  background: rgba(25, 118, 210, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;

  ${NavItem}:hover & {
    background: rgba(25, 118, 210, 0.2);
    transform: scale(1.1);
  }

  ${NavItem}.active & {
    background: rgba(25, 118, 210, 0.2);
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
  color: #64748b;
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
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  }
`;

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const commonNavItems = [
    { to: '/home', icon: faHome, label: 'Home' },
    { to: '/jobs', icon: faBriefcase, label: 'Find Jobs' },
    { to: '/market', icon: faStore, label: 'Market' },
    { to: '/profile', icon: faUser, label: 'Profile' },
  ];

  const userNavItems = user?.isAgent ? [
    { to: '/agent-dashboard', icon: faTachometerAlt, label: 'Dashboard' },
    { to: '/create-worker', icon: faUsers, label: 'Create Worker' },
  ] : [
    { to: '/post-job', icon: faPlus, label: 'Post Job' },
    { to: '/sell-product', icon: faHammer, label: 'Sell Product' },
  ];

  return (
    <SidebarContainer>
      <SectionTitle>Main</SectionTitle>
      {commonNavItems.map((item) => (
        <NavItem key={item.to} to={item.to}>
          <NavIcon>
            <FontAwesomeIcon icon={item.icon} />
          </NavIcon>
          <NavLabel>{item.label}</NavLabel>
        </NavItem>
      ))}
      
      <SectionTitle>{user?.isAgent ? 'Agent Tools' : 'Post & Sell'}</SectionTitle>
      {userNavItems.map((item) => (
        <NavItem key={item.to} to={item.to}>
          <NavIcon>
            <FontAwesomeIcon icon={item.icon} />
          </NavIcon>
          <NavLabel>{item.label}</NavLabel>
        </NavItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
