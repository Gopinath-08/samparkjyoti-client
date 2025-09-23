import React from 'react';
import styled from 'styled-components';
import AdvancedIllustration from './AdvancedIllustrations';
import AnimatedIllustration from './AnimatedIllustrations';
import Icon from './IconSystem';

const ShowcaseContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ShowcaseTitle = styled.h2`
  color: var(--color-saddle-brown);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, var(--color-sea-green), var(--color-peru), var(--color-warm-orange));
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h3`
  color: var(--color-saddle-brown);
  font-size: 1.8rem;
  font-weight: 600;
  margin: 3rem 0 1.5rem 0;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background: var(--color-card-background);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(139, 69, 19, 0.15);
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
`;

const CardTitle = styled.h4`
  color: var(--color-saddle-brown);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
`;

const CardDescription = styled.p`
  color: var(--color-dim-gray);
  font-size: 0.9rem;
  margin: 0;
`;

const AnimationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const AnimationCard = styled.div`
  background: var(--color-beige);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-sea-green);
  }
`;

const AnimationName = styled.h5`
  color: var(--color-saddle-brown);
  font-size: 1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const IconCard = styled.div`
  background: var(--color-cornsilk);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-antique-white);
    transform: scale(1.05);
  }
`;

const IconName = styled.div`
  color: var(--color-saddle-brown);
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const AdvancedShowcase: React.FC = () => {
    const illustrations = [
        { type: 'tractor', name: 'Tractor', description: 'Agricultural machinery' },
        { type: 'harvest', name: 'Harvest', description: 'Crop harvesting' },
        { type: 'farmer', name: 'Farmer', description: 'Agricultural worker' },
        { type: 'grain', name: 'Grain', description: 'Cereal crops' },
        { type: 'vegetables', name: 'Vegetables', description: 'Fresh produce' },
        { type: 'farmhouse', name: 'Farmhouse', description: 'Rural dwelling' },
        { type: 'truck', name: 'Truck', description: 'Transportation' },
        { type: 'market', name: 'Market', description: 'Trading place' },
        { type: 'worker', name: 'Worker', description: 'Labor force' },
        { type: 'tools', name: 'Tools', description: 'Work equipment' },
        { type: 'field', name: 'Field', description: 'Agricultural land' },
        { type: 'barn', name: 'Barn', description: 'Storage building' },
        { type: 'crops', name: 'Crops', description: 'Cultivated plants' },
        { type: 'logistics', name: 'Logistics', description: 'Supply chain' },
        { type: 'community', name: 'Community', description: 'Social network' },
        { type: 'growth', name: 'Growth', description: 'Development' },
        { type: 'sustainability', name: 'Sustainability', description: 'Environmental care' },
        { type: 'technology', name: 'Technology', description: 'Digital innovation' },
        { type: 'success', name: 'Success', description: 'Achievement' },
        { type: 'partnership', name: 'Partnership', description: 'Collaboration' }
    ];

    const animations = [
        { name: 'Float', animation: 'float' },
        { name: 'Pulse', animation: 'pulse' },
        { name: 'Bounce', animation: 'bounce' },
        { name: 'Rotate', animation: 'rotate' },
        { name: 'Glow', animation: 'glow' },
        { name: 'Wave', animation: 'wave' }
    ];

    const icons = [
        'user-group', 'truck', 'home', 'chart-bar', 'cog', 'plus',
        'search', 'map-pin', 'clock', 'phone', 'envelope', 'check-circle',
        'exclamation-triangle', 'information-circle', 'star', 'heart',
        'share', 'eye', 'lock', 'user', 'bell', 'arrow-right'
    ];

    return (
        <ShowcaseContainer>
            <ShowcaseTitle>Next-Level Illustrations & Icons</ShowcaseTitle>

            <SectionTitle>Advanced Agricultural Illustrations</SectionTitle>
            <Grid>
                {illustrations.map((illustration) => (
                    <Card key={illustration.type}>
                        <AdvancedIllustration
                            type={illustration.type as any}
                            size="64px"
                            color="var(--color-saddle-brown)"
                            animated={true}
                        />
                        <CardTitle>{illustration.name}</CardTitle>
                        <CardDescription>{illustration.description}</CardDescription>
                    </Card>
                ))}
            </Grid>

            <SectionTitle>Animated Illustrations</SectionTitle>
            <AnimationGrid>
                {animations.map((anim) => (
                    <AnimationCard key={anim.animation}>
                        <AnimatedIllustration
                            type="tractor"
                            size="48px"
                            color="var(--color-sea-green)"
                            animation={anim.animation as any}
                        />
                        <AnimationName>{anim.name}</AnimationName>
                    </AnimationCard>
                ))}
            </AnimationGrid>

            <SectionTitle>Modern Icon System</SectionTitle>
            <IconGrid>
                {icons.map((iconName) => (
                    <IconCard key={iconName}>
                        <Icon
                            name={iconName}
                            size="32px"
                            color="var(--color-saddle-brown)"
                            animated={true}
                        />
                        <IconName>{iconName.replace('-', ' ')}</IconName>
                    </IconCard>
                ))}
            </IconGrid>

            <SectionTitle>Solid Icons</SectionTitle>
            <IconGrid>
                {icons.slice(0, 12).map((iconName) => (
                    <IconCard key={`solid-${iconName}`}>
                        <Icon
                            name={`${iconName}-solid`}
                            size="32px"
                            color="var(--color-sea-green)"
                            animated={true}
                        />
                        <IconName>{iconName.replace('-', ' ')} (solid)</IconName>
                    </IconCard>
                ))}
            </IconGrid>
        </ShowcaseContainer>
    );
};

export default AdvancedShowcase;
