import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { RootState, AppDispatch } from '../store/store';
import { fetchJobs, fetchJobsForUser, fetchLocationRecommendations } from '../store/slices/jobsSlice';
import { fetchProducts } from '../store/slices/productsSlice';
import { getRolePermissions, getRoleDisplayName } from '../utils/roleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faStore,
  faUsers,
  faPlus,
  faHammer,
  faSearch,
  faMapMarkerAlt,
  faClock,
  faStar,
  faTachometerAlt,
  faShoppingCart,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  padding: 3rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  border-left: 6px solid #1976D2;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.15);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const WelcomeTitle = styled.h1`
  color: #1565C0;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const WelcomeSubtitle = styled.p`
  color: #1976D2;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const AgentBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #1976D2;
  font-weight: 600;
  font-size: 0.9rem;
`;

const QuickActions = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #1565C0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ActionCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    border-color: rgba(25, 118, 210, 0.2);

    &::before {
      left: 100%;
    }
  }
`;

const ActionIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}dd);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  ${ActionCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
`;

const ActionTitle = styled.h3`
  color: #1565C0;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ActionDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  border-left: 4px solid #1976D2;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

const RecentItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const ItemCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
`;

const ItemTitle = styled.h3`
  color: #1565C0;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const ItemDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const LocationIndicator = styled.div`
  background: linear-gradient(135deg, #E8F5E8, #C8E6C9);
  border: 1px solid #4CAF50;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #2E7D32;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);

  svg {
    color: #4CAF50;
    font-size: 1.1rem;
  }

  strong {
    color: #1B5E20;
    font-weight: 600;
  }
`;

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { jobs, stats: jobStats, locationFiltered, userLocation, recommendations, totalMatches } = useSelector((state: RootState) => state.jobs);
  const { products, stats: productStats } = useSelector((state: RootState) => state.products);
  const permissions = getRolePermissions(user);

  useEffect(() => {
    // Fetch location-based recommendations if user has location
    if (user?.location) {
      dispatch(fetchLocationRecommendations({ userLocation: user.location, limit: 10 }));
    } else {
      dispatch(fetchJobs());
    }
    dispatch(fetchProducts());
  }, [dispatch, user?.location]);

  const recentJobs = jobs.slice(0, 3);
  const recentProducts = products.slice(0, 3);

  // Common actions - everyone can access
  const commonActions = [
    {
      to: '/jobs',
      icon: faBriefcase,
      title: 'Find Jobs',
      description: 'Browse available job opportunities',
      color: '#1976D2'
    },
    {
      to: '/market',
      icon: faStore,
      title: 'Market',
      description: 'Buy and sell agricultural products',
      color: '#4CAF50'
    }
  ];

  // Role-based actions
  const getRoleBasedActions = () => {
    const actions = [];

    // Job posting - only employers
    if (permissions.canPostJobs) {
      actions.push({
        to: '/post-job',
        icon: faPlus,
        title: 'Post Job',
        description: 'Create new job opportunities',
        color: '#1976D2'
      });
    }

    // Product posting - only farmers
    if (permissions.canPostProducts) {
      actions.push({
        to: '/sell-product',
        icon: faHammer,
        title: 'Sell Product',
        description: 'List your agricultural products',
        color: '#4CAF50'
      });
    }

    // Worker creation - only agents
    if (permissions.canCreateWorkers) {
      actions.push({
        to: '/create-worker',
        icon: faUsers,
        title: 'Create Worker',
        description: 'Add new worker profiles',
        color: '#1976D2'
      });
    }

    // Agent dashboard - only agents
    if (permissions.canViewAnalytics) {
      actions.push({
        to: '/agent-dashboard',
        icon: faTachometerAlt,
        title: 'Agent Dashboard',
        description: 'Manage workers and view analytics',
        color: '#FF9800'
      });
    }

    return actions;
  };

  const roleBasedActions = getRoleBasedActions();

  return (
    <HomeContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {user?.name}! 👋</WelcomeTitle>
        <WelcomeSubtitle>
          {user?.isAgent 
            ? 'Manage worker profiles and connect them with opportunities'
            : 'What would you like to do today?'
          }
        </WelcomeSubtitle>
        {user?.primaryRole && (
          <AgentBadge>
            <FontAwesomeIcon icon={faUserTie} />
            {getRoleDisplayName(user.primaryRole as any)} Account
          </AgentBadge>
        )}
        {user?.isAgent && (
          <AgentBadge>
            <FontAwesomeIcon icon={faUsers} />
            Agent Account
          </AgentBadge>
        )}
      </WelcomeSection>

      {/* Location-based filtering indicator */}
      {locationFiltered && userLocation && (
        <LocationIndicator>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>
            Showing jobs near <strong>{userLocation}</strong>
            {totalMatches > 0 && ` • ${totalMatches} location matches found`}
          </span>
        </LocationIndicator>
      )}

      <QuickActions>
        <SectionTitle>Quick Actions</SectionTitle>
        <ActionsGrid>
          {commonActions.map((action) => (
            <ActionCard key={action.to} to={action.to}>
              <ActionIcon color={action.color}>
                <FontAwesomeIcon icon={action.icon} />
              </ActionIcon>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionCard>
          ))}
          {roleBasedActions.map((action) => (
            <ActionCard key={action.to} to={action.to}>
              <ActionIcon color={action.color}>
                <FontAwesomeIcon icon={action.icon} />
              </ActionIcon>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionCard>
          ))}
        </ActionsGrid>
      </QuickActions>

      <StatsSection>
        <StatCard>
          <StatNumber>{jobStats.approved}</StatNumber>
          <StatLabel>Available Jobs</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{productStats.approved}</StatNumber>
          <StatLabel>Products Available</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{jobStats.total + productStats.total}</StatNumber>
          <StatLabel>Total Listings</StatLabel>
        </StatCard>
      </StatsSection>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <SectionTitle>Recent Jobs</SectionTitle>
          <RecentItems>
            {recentJobs.map((job) => (
              <ItemCard key={job.id}>
                <ItemTitle>{job.title}</ItemTitle>
                <ItemMeta>
                  <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}</span>
                  <span><FontAwesomeIcon icon={faClock} /> {job.postedAt}</span>
                </ItemMeta>
                <ItemDescription>{job.description}</ItemDescription>
              </ItemCard>
            ))}
          </RecentItems>
        </div>

        <div>
          <SectionTitle>Recent Products</SectionTitle>
          <RecentItems>
            {recentProducts.map((product) => (
              <ItemCard key={product.id}>
                <ItemTitle>{product.name}</ItemTitle>
                <ItemMeta>
                  <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {product.location}</span>
                  <span><FontAwesomeIcon icon={faStar} /> {product.rating}</span>
                </ItemMeta>
                <ItemDescription>{product.description}</ItemDescription>
              </ItemCard>
            ))}
          </RecentItems>
        </div>
      </div>
    </HomeContainer>
  );
};

export default HomePage;
