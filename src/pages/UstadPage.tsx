import React from 'react';
import { getPageSlogan } from '../utils/slogans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHammer, 
  faGraduationCap, 
  faUsers, 
  faLightbulb, 
  faBookOpen,
  faStar,
  faShare,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const UstadContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
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

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 300;
`;

const OdiaTitle = styled.div`
  color: #1976D2;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0 0 0;
  font-family: 'Noto Sans Oriya', sans-serif;
  text-align: center;
`;

const OdiaSubtitle = styled.div`
  color: #6b7280;
  font-size: 1rem;
  margin: 0.5rem 0 0 0;
  font-family: 'Noto Sans Oriya', sans-serif;
  text-align: center;
  font-style: italic;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1976D2, #4CAF50);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureIcon = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1976D2;
  margin: 0 0 1rem 0;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #1976D2, #1565C0);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(25, 118, 210, 0.4);
  }
`;

const ExpertSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1976D2;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ExpertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ExpertCard = styled.div`
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ExpertName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1976D2;
  margin: 0 0 0.5rem 0;
`;

const ExpertSpecialty = styled.p`
  color: #4CAF50;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
`;

const ExpertRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StarIcon = styled.div`
  color: #ffd700;
`;

const ExpertBio = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const ShareKnowledgeSection = styled.div`
  background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  border: 2px solid rgba(25, 118, 210, 0.1);
`;

const ShareTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1976D2;
  margin: 0 0 1rem 0;
`;

const ShareDescription = styled.p`
  color: #1976D2;
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #1976D2, #1565C0);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(25, 118, 210, 0.4);
  }
`;

const UstadPage: React.FC = () => {
  const pageSlogan = getPageSlogan('ustad');

  const handleShareKnowledge = () => {
    toast.success('Knowledge sharing feature coming soon!');
    // TODO: Implement knowledge sharing functionality
  };

  const handleLearnMore = () => {
    toast.success('Learning resources will be available soon!');
    // TODO: Implement learning resources
  };

  const handleConnectExpert = () => {
    toast.success('Expert connection feature coming soon!');
    // TODO: Implement expert connection
  };

  // Mock data - in real app, this would come from API
  const stats = {
    totalExperts: 127,
    knowledgeArticles: 89,
    activeLearners: 342,
    sharedSkills: 156
  };

  const features = [
    {
      icon: faGraduationCap,
      title: 'Learn from Experts',
      description: 'Access tutorials, guides, and expert advice from skilled professionals in your field.',
      action: 'Browse Learning',
      color: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
      onClick: handleLearnMore
    },
    {
      icon: faShare,
      title: 'Share Your Skills',
      description: 'Contribute your expertise to help others grow and build your reputation in the community.',
      action: 'Share Knowledge',
      color: 'linear-gradient(135deg, #FF9800, #FFC107)',
      onClick: handleShareKnowledge
    },
    {
      icon: faUsers,
      title: 'Connect & Collaborate',
      description: 'Find mentors, connect with peers, and collaborate on projects with like-minded professionals.',
      action: 'Find Experts',
      color: 'linear-gradient(135deg, #9C27B0, #E91E63)',
      onClick: handleConnectExpert
    }
  ];

  const experts = [
    {
      name: 'Rajesh Kumar',
      specialty: 'Construction Expert',
      rating: 4.9,
      bio: '20+ years in construction with expertise in modern building techniques and safety protocols.'
    },
    {
      name: 'Priya Sharma',
      specialty: 'Agricultural Specialist',
      rating: 4.8,
      bio: 'Agricultural consultant helping farmers optimize crop yields and sustainable farming practices.'
    },
    {
      name: 'Amit Singh',
      specialty: 'Technical Trainer',
      rating: 4.9,
      bio: 'Experienced trainer specializing in technical skills development and workforce training.'
    },
    {
      name: 'Sunita Devi',
      specialty: 'Business Development',
      rating: 4.7,
      bio: 'Business consultant helping small businesses grow and expand their market reach.'
    }
  ];

  return (
    <UstadContainer>
      <Header>
        <HeaderContent>
          <FontAwesomeIcon icon={faHammer} size="3x" style={{ marginBottom: '1rem' }} />
          <Title>{pageSlogan.odia} - Expert Hub</Title>
          <OdiaTitle>{pageSlogan.odia}</OdiaTitle>
          <Subtitle>
            {pageSlogan.odia}
          </Subtitle>
          <OdiaSubtitle>{pageSlogan.odia}</OdiaSubtitle>
        </HeaderContent>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatIcon color="linear-gradient(135deg, #1976D2, #1565C0)">
            <FontAwesomeIcon icon={faUsers} />
          </StatIcon>
          <StatNumber>{stats.totalExperts}</StatNumber>
          <StatLabel>Expert Mentors</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon color="linear-gradient(135deg, #4CAF50, #8BC34A)">
            <FontAwesomeIcon icon={faBookOpen} />
          </StatIcon>
          <StatNumber>{stats.knowledgeArticles}</StatNumber>
          <StatLabel>Knowledge Articles</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon color="linear-gradient(135deg, #FF9800, #FFC107)">
            <FontAwesomeIcon icon={faGraduationCap} />
          </StatIcon>
          <StatNumber>{stats.activeLearners}</StatNumber>
          <StatLabel>Active Learners</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon color="linear-gradient(135deg, #9C27B0, #E91E63)">
            <FontAwesomeIcon icon={faLightbulb} />
          </StatIcon>
          <StatNumber>{stats.sharedSkills}</StatNumber>
          <StatLabel>Shared Skills</StatLabel>
        </StatCard>
      </StatsContainer>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon color={feature.color}>
              <FontAwesomeIcon icon={feature.icon} />
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <ActionButton onClick={feature.onClick}>
              <FontAwesomeIcon icon={faPlus} />
              {feature.action}
            </ActionButton>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <ExpertSection>
        <SectionTitle>
          <FontAwesomeIcon icon={faStar} />
          Featured Experts
        </SectionTitle>
        <ExpertGrid>
          {experts.map((expert, index) => (
            <ExpertCard key={index}>
              <ExpertName>{expert.name}</ExpertName>
              <ExpertSpecialty>{expert.specialty}</ExpertSpecialty>
              <ExpertRating>
                <StarIcon>
                  <FontAwesomeIcon icon={faStar} />
                </StarIcon>
                <span>{expert.rating}</span>
              </ExpertRating>
              <ExpertBio>{expert.bio}</ExpertBio>
            </ExpertCard>
          ))}
        </ExpertGrid>
      </ExpertSection>

      <ShareKnowledgeSection>
        <ShareTitle>Ready to Share Your Knowledge?</ShareTitle>
        <ShareDescription>
          Join our community of experts and help others grow by sharing your skills and experience. 
          Your knowledge can make a real difference in someone's life.
        </ShareDescription>
        <PrimaryButton onClick={handleShareKnowledge}>
          <FontAwesomeIcon icon={faShare} />
          Start Sharing Today
        </PrimaryButton>
      </ShareKnowledgeSection>
    </UstadContainer>
  );
};

export default UstadPage;
