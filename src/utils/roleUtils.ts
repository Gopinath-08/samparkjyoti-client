// Define User interface locally to avoid circular dependencies
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  isAgent?: boolean;
  profileComplete?: boolean;
  roles?: string[];
  primaryRole?: string;
  languages?: string[];
  preferredLanguage?: string;
}

export type UserRole = 'labour' | 'farmer' | 'employer' | 'agent';

export interface RolePermissions {
  canPostJobs: boolean;
  canCreateWorkers: boolean;
  canApplyJobs: boolean;
  canViewJobs: boolean;
  canViewWorkers: boolean;
  canManageWorkers: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
}

export const getRolePermissions = (user: User | null): RolePermissions => {
  if (!user) {
    return {
      canPostJobs: false,
      canCreateWorkers: false,
      canApplyJobs: false,
      canViewJobs: false,
      canViewWorkers: false,
      canManageWorkers: false,
      canViewAnalytics: false,
      canManageUsers: false,
    };
  }

  const roles = user.roles || [];
  const primaryRole = user.primaryRole;
  const isAgent = user.isAgent ?? false;

  return {
    // Job posting - Only employers can post jobs
    canPostJobs: roles.includes('employer') || primaryRole === 'employer',
    
    // Worker creation - Only agents can create workers
    canCreateWorkers: isAgent,
    
    // Job application - Labour and farmers can apply for jobs
    canApplyJobs: roles.includes('labour') || roles.includes('farmer') || 
                  primaryRole === 'labour' || primaryRole === 'farmer',
    
    // Viewing permissions - Everyone can view jobs
    canViewJobs: true,
    
    // Worker viewing - Labour, farmers, and agents can view workers
    canViewWorkers: roles.includes('labour') || roles.includes('farmer') || 
                   primaryRole === 'labour' || primaryRole === 'farmer' || isAgent,
    
    // Worker management - Only agents can manage workers
    canManageWorkers: isAgent,
    
    // Analytics - Only agents can view analytics
    canViewAnalytics: isAgent,
    
    // User management - Only agents can manage users
    canManageUsers: isAgent,
  };
};

export const hasRole = (user: User | null, role: UserRole): boolean => {
  if (!user) return false;
  return user.roles?.includes(role) || user.primaryRole === role;
};

export const hasAnyRole = (user: User | null, roles: UserRole[]): boolean => {
  if (!user) return false;
  return roles.some(role => hasRole(user, role));
};

export const isAgent = (user: User | null): boolean => {
  return user?.isAgent ?? false;
};

export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    labour: 'Labour',
    farmer: 'Farmer',
    employer: 'Employer',
    agent: 'Agent',
  };
  return roleNames[role] || role;
};

export const getRoleDescription = (role: UserRole): string => {
  const descriptions: Record<UserRole, string> = {
    labour: 'Find and apply for job opportunities',
    farmer: 'View market prices and find job opportunities',
    employer: 'Post job opportunities and hire workers',
    agent: 'Manage workers and facilitate connections',
  };
  return descriptions[role] || '';
};

