import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const UstadContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-cornsilk) 100%);
  padding: 2rem;
`;

const Header = styled.div`
  background: linear-gradient(135deg, var(--color-saddle-brown) 0%, var(--color-sienna) 100%);
  color: var(--color-pure-white);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(139, 69, 19, 0.3);
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
  color: var(--color-peru);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0 0 0;
  font-family: 'Noto Sans Oriya', sans-serif;
  text-align: center;
`;

const OdiaSubtitle = styled.div`
  color: var(--color-burlywood);
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
  background: var(--color-card-background);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(139, 69, 19, 0.08);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(139, 69, 19, 0.12);
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
  color: var(--color-saddle-brown);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--color-dim-gray);
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
    background: linear-gradient(90deg, var(--color-saddle-brown), var(--color-sea-green));
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
  color: var(--color-saddle-brown);
  margin: 0 0 1rem 0;
`;

const FeatureDescription = styled.p`
  color: var(--color-dim-gray);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, var(--color-saddle-brown), var(--color-sienna));
  color: var(--color-pure-white);
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
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
  }
`;

const ExpertSection = styled.div`
  background: var(--color-card-background);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(139, 69, 19, 0.08);
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-saddle-brown);
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
  background: linear-gradient(135deg, var(--color-beige), var(--color-cornsilk));
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.1);
  }
`;

const ExpertName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-saddle-brown);
  margin: 0 0 0.5rem 0;
`;

const ExpertSpecialty = styled.p`
  color: var(--color-sea-green);
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
  color: var(--color-warm-orange);
`;

const ExpertBio = styled.p`
  color: var(--color-dim-gray);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const ShareKnowledgeSection = styled.div`
  background: linear-gradient(135deg, var(--color-cornsilk), var(--color-antique-white));
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  border: 2px solid var(--color-border);
`;

const ShareTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-saddle-brown);
  margin: 0 0 1rem 0;
`;

const ShareDescription = styled.p`
  color: var(--color-saddle-brown);
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, var(--color-saddle-brown), var(--color-sienna));
  color: var(--color-pure-white);
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
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
  }
`;

const UstadPage: React.FC = () => {
  const pageSlogan = getPageSlogan('ustad');
  const navigate = useNavigate();
  const [ustaads, setUstaads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/jobs/public/ustaads');
        const data = res.data?.data || res.data;
        setUstaads(data?.ustaads || []);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load experts');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

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
      color: 'linear-gradient(135deg, var(--color-sea-green), var(--color-peru))',
      onClick: handleLearnMore
    },
    {
      icon: faShare,
      title: 'Share Your Skills',
      description: 'Contribute your expertise to help others grow and build your reputation in the community.',
      action: 'Share Knowledge',
      color: 'linear-gradient(135deg, var(--color-warm-orange), var(--color-burlywood))',
      onClick: handleShareKnowledge
    },
    {
      icon: faUsers,
      title: 'Connect & Collaborate',
      description: 'Find mentors, connect with peers, and collaborate on projects with like-minded professionals.',
      action: 'Find Experts',
      color: 'linear-gradient(135deg, var(--color-peru), var(--color-tan))',
      onClick: handleConnectExpert
    }
  ];

  const experts = ustaads.map(u => ({
    name: u.name,
    specialty: u.speciality || 'Expert',
    rating: u.rating ?? 0,
    bio: u.bio || '',
  }));

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
          <StatIcon color="linear-gradient(135deg, var(--color-saddle-brown), var(--color-sienna))">
            <FontAwesomeIcon icon={faUsers} />
          </StatIcon>
          <StatNumber>{stats.totalExperts}</StatNumber>
          <StatLabel>Expert Mentors</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon color="linear-gradient(135deg, var(--color-sea-green), var(--color-peru))">
            <FontAwesomeIcon icon={faBookOpen} />
          </StatIcon>
          <StatNumber>{stats.knowledgeArticles}</StatNumber>
          <StatLabel>Knowledge Articles</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon color="linear-gradient(135deg, var(--color-warm-orange), var(--color-burlywood))">
            <FontAwesomeIcon icon={faGraduationCap} />
          </StatIcon>
          <StatNumber>{stats.activeLearners}</StatNumber>
          <StatLabel>Active Learners</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon color="linear-gradient(135deg, var(--color-peru), var(--color-tan))">
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
        {loading && <div>Loading experts...</div>}
        {error && <div style={{ color: 'var(--color-warm-orange)' }}>{error}</div>}
        <ExpertGrid>
          {experts.map((expert, index) => (
            <ExpertCard key={index} onClick={() => navigate(`/ustad/${ustaads[index]?._id}`)} style={{ cursor: 'pointer' }}>
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
          {!loading && experts.length === 0 && (
            <div style={{ gridColumn: '1 / -1', color: 'var(--color-dim-gray)' }}>
              No Ustaads found yet. Please check back later.
            </div>
          )}
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
