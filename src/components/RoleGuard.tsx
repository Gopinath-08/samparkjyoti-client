import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getRolePermissions, hasRole, hasAnyRole, isAgent } from '../utils/roleUtils';
import styled from 'styled-components';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: (keyof ReturnType<typeof getRolePermissions>)[];
  fallbackPath?: string;
  showAccessDenied?: boolean;
}

const AccessDeniedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const AccessDeniedIcon = styled.div`
  font-size: 4rem;
  color: #f44336;
  margin-bottom: 1rem;
`;

const AccessDeniedTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const AccessDeniedMessage = styled.p`
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.6;
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  fallbackPath = '/home',
  showAccessDenied = true,
}) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check role requirements
  if (requiredRoles.length > 0) {
    const hasRequiredRole = hasAnyRole(user, requiredRoles as any);
    if (!hasRequiredRole) {
      if (showAccessDenied) {
        return (
          <AccessDeniedContainer>
            <AccessDeniedIcon>🚫</AccessDeniedIcon>
            <AccessDeniedTitle>Access Denied</AccessDeniedTitle>
            <AccessDeniedMessage>
              You don't have permission to access this feature. 
              This feature is only available to: {requiredRoles.join(', ')}.
            </AccessDeniedMessage>
            <BackButton onClick={() => window.history.back()}>
              Go Back
            </BackButton>
          </AccessDeniedContainer>
        );
      }
      return <Navigate to={fallbackPath} replace />;
    }
  }

  // Check permission requirements
  if (requiredPermissions.length > 0) {
    const permissions = getRolePermissions(user);
    const hasRequiredPermissions = requiredPermissions.every(
      permission => permissions[permission]
    );
    
    if (!hasRequiredPermissions) {
      if (showAccessDenied) {
        return (
          <AccessDeniedContainer>
            <AccessDeniedIcon>🚫</AccessDeniedIcon>
            <AccessDeniedTitle>Access Denied</AccessDeniedTitle>
            <AccessDeniedMessage>
              You don't have permission to access this feature. 
              Please contact an administrator if you believe this is an error.
            </AccessDeniedMessage>
            <BackButton onClick={() => window.history.back()}>
              Go Back
            </BackButton>
          </AccessDeniedContainer>
        );
      }
      return <Navigate to={fallbackPath} replace />;
    }
  }

  return <>{children}</>;
};

export default RoleGuard;






