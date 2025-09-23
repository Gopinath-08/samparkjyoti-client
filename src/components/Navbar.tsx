import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon from './IconSystem';
import AnimatedIllustration from './AnimatedIllustrations';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const NavbarContainer = styled.nav`
  background: 
    var(--pattern-subtle),
    var(--pattern-diagonal),
    linear-gradient(135deg, var(--color-saddle-brown) 0%, var(--color-sienna) 100%);
  background-size: 4px 4px, 30px 30px, 100% 100%;
  color: var(--color-pure-white);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(139, 69, 19, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 100;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--pattern-dots);
    background-size: 30px 30px;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-sea-green), var(--color-peru));
    border-radius: 1px;
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 10;
`;

const NavItem = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
  font-weight: 500;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:not([disabled]) {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  /* Subtle pulse animation for logout button */
  animation: ${props => props.disabled ? 'none' : 'subtleGlow 3s ease-in-out infinite'};
  
  @keyframes subtleGlow {
    0%, 100% {
      box-shadow: 0 0 0 rgba(255, 255, 255, 0.1);
    }
    50% {
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 10;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const AgentBadge = styled.span`
  background: linear-gradient(135deg, var(--color-sea-green), var(--color-peru));
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(46, 139, 87, 0.3);
  animation: pulse 2s infinite;
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background: var(--color-warm-orange);
    border-radius: 50%;
    border: 2px solid var(--color-pure-white);
  }
`;


const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleDirectLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <NavbarContainer>
      <Logo>
        <AnimatedIllustration type="partnership" size="32px" color="rgba(255, 255, 255, 0.9)" animation="glow" style={{ marginRight: '8px' }} />
        Sampark Jyoti
      </Logo>

      <NavItems>
        <NotificationIcon>
          <Icon name="bell" size="20px" color="var(--color-pure-white)" animated={true} />
        </NotificationIcon>

        <UserInfo>
          <UserName>Welcome, {user?.name}!</UserName>
          {user?.isAgent && <AgentBadge>Agent</AgentBadge>}
          <NavItem onClick={handleDirectLogout} style={{ zIndex: 10 }} disabled={isLoggingOut}>
            <Icon name="logout" size="16px" color="var(--color-pure-white)" animated={true} />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </NavItem>
        </UserInfo>
      </NavItems>

    </NavbarContainer>
  );
};

export default Navbar;
