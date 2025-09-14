import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faCrown, 
  faEdit, 
  faCog, 
  faCheckCircle,
  faClock,
  faBriefcase,
  faChartLine,
  faLanguage,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  border: 4px solid rgba(255,255,255,0.3);
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const UserTitle = styled.p`
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  opacity: 0.9;
  font-weight: 500;
`;

const StatusBadge = styled.div<{ isAgent: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => props.isAgent 
    ? 'linear-gradient(135deg, #4CAF50, #8BC34A)' 
    : 'rgba(255,255,255,0.2)'};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  ${props => props.variant === 'primary' ? `
    background: rgba(255,255,255,0.2);
    color: white;
    border: 1px solid rgba(255,255,255,0.3);
    
    &:hover {
      background: rgba(255,255,255,0.3);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
  ` : `
    background: white;
    color: #667eea;
    
    &:hover {
      background: #f8f9ff;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
  `}
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
`;

const InfoValue = styled.p`
  color: #1e293b;
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const StatValue = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const StatLabel = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
`;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleDisplay = () => {
    if (user?.isAgent) {
      return 'Verified Agent';
    }
    return 'Community Member';
  };

  return (
    <Container>
      <ProfileHeader>
        <AvatarSection>
          <Avatar>
            <FontAwesomeIcon icon={faUser} />
          </Avatar>
          <UserInfo>
            <UserName>{user?.name || 'User'}</UserName>
            <UserTitle>{getRoleDisplay()}</UserTitle>
            <StatusBadge isAgent={user?.isAgent || false}>
              <FontAwesomeIcon icon={user?.isAgent ? faCrown : faUser} />
              {user?.isAgent ? 'Agent' : 'Member'}
            </StatusBadge>
          </UserInfo>
        </AvatarSection>
        <ActionButtons>
          <ActionButton variant="secondary" onClick={() => setIsEditing(!isEditing)}>
            <FontAwesomeIcon icon={faEdit} />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </ActionButton>
          <ActionButton variant="primary">
            <FontAwesomeIcon icon={faCog} />
            Settings
          </ActionButton>
        </ActionButtons>
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={faBriefcase} />
          </StatIcon>
          <StatValue>12</StatValue>
          <StatLabel>Jobs Applied</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={faChartLine} />
          </StatIcon>
          <StatValue>8</StatValue>
          <StatLabel>Jobs Completed</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={faStar} />
          </StatIcon>
          <StatValue>4.8</StatValue>
          <StatLabel>Rating</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={faClock} />
          </StatIcon>
          <StatValue>30</StatValue>
          <StatLabel>Days Active</StatLabel>
        </StatCard>
      </StatsGrid>

      <ContentGrid>
        <Card>
          <CardTitle>
            <FontAwesomeIcon icon={faUser} />
            Personal Information
          </CardTitle>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faUser} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Full Name</InfoLabel>
              <InfoValue>{user?.name || 'Not provided'}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Email Address</InfoLabel>
              <InfoValue>{user?.email || 'Not provided'}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faPhone} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Phone Number</InfoLabel>
              <InfoValue>{user?.phone || 'Not provided'}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>{user?.location || 'Not set'}</InfoValue>
            </InfoContent>
          </InfoItem>
        </Card>

        <Card>
          <CardTitle>
            <FontAwesomeIcon icon={faCrown} />
            Account Details
          </CardTitle>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faUser} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Account Type</InfoLabel>
              <InfoValue>{user?.isAgent ? 'Verified Agent' : 'Community Member'}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faCheckCircle} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Profile Status</InfoLabel>
              <InfoValue>{user?.profileComplete ? 'Complete' : 'Incomplete'}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faLanguage} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Preferred Language</InfoLabel>
              <InfoValue>{user?.preferredLanguage || 'English'}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FontAwesomeIcon icon={faClock} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Member Since</InfoLabel>
              <InfoValue>January 2024</InfoValue>
            </InfoContent>
          </InfoItem>
        </Card>
      </ContentGrid>
    </Container>
  );
};

export default ProfilePage;


