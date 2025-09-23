import React from 'react';
import styled from 'styled-components';
import PatternBackground from './PatternBackground';
import DecorativeElement from './DecorativeElements';

const ShowcaseContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ShowcaseTitle = styled.h2`
  color: var(--color-saddle-brown);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const PatternGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const PatternCard = styled.div`
  background: var(--color-card-background);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);
  position: relative;
  overflow: hidden;
  
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

const PatternName = styled.h3`
  color: var(--color-saddle-brown);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PatternDescription = styled.p`
  color: var(--color-dim-gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PatternPreview = styled.div<{ pattern: string }>`
  height: 100px;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  
  ${props => {
        switch (props.pattern) {
            case 'dots':
                return `
          background: var(--pattern-dots);
          background-size: 20px 20px;
        `;
            case 'grid':
                return `
          background: var(--pattern-grid);
          background-size: 20px 20px;
        `;
            case 'diagonal':
                return `
          background: var(--pattern-diagonal);
          background-size: 40px 40px;
        `;
            case 'waves':
                return `
          background: var(--pattern-waves);
          background-size: 30px 30px;
        `;
            case 'circles':
                return `
          background: var(--pattern-circles);
          background-size: 40px 40px;
        `;
            case 'hexagons':
                return `
          background: var(--pattern-hexagons);
          background-size: 60px 60px;
        `;
            case 'organic':
                return `
          background: var(--pattern-organic);
          background-size: 100% 100%;
        `;
            default:
                return '';
        }
    }}
`;

const DecorativeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const DecorativeCard = styled.div`
  background: var(--color-card-background);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);
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
    background: linear-gradient(90deg, var(--color-sea-green), var(--color-peru));
  }
`;

const DecorativeName = styled.h4`
  color: var(--color-saddle-brown);
  font-size: 1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
`;

const DecorativeDescription = styled.p`
  color: var(--color-dim-gray);
  font-size: 0.8rem;
  margin: 0;
`;

const PatternShowcase: React.FC = () => {
    const patterns = [
        {
            name: 'Dots Pattern',
            pattern: 'dots',
            description: 'Subtle dot pattern for subtle texture'
        },
        {
            name: 'Grid Pattern',
            pattern: 'grid',
            description: 'Clean grid pattern for structure'
        },
        {
            name: 'Diagonal Pattern',
            pattern: 'diagonal',
            description: 'Dynamic diagonal lines for energy'
        },
        {
            name: 'Waves Pattern',
            pattern: 'waves',
            description: 'Flowing waves for movement'
        },
        {
            name: 'Circles Pattern',
            pattern: 'circles',
            description: 'Organic circles for softness'
        },
        {
            name: 'Hexagons Pattern',
            pattern: 'hexagons',
            description: 'Geometric hexagons for modern feel'
        },
        {
            name: 'Organic Pattern',
            pattern: 'organic',
            description: 'Natural organic shapes for warmth'
        }
    ];

    const decorativeElements = [
        { type: 'leaf', name: 'Leaf', description: 'Natural leaf icon' },
        { type: 'grain', name: 'Grain', description: 'Agricultural grain icon' },
        { type: 'worker', name: 'Worker', description: 'Worker profile icon' },
        { type: 'farm', name: 'Farm', description: 'Farm building icon' },
        { type: 'pattern', name: 'Pattern', description: 'Geometric pattern icon' },
        { type: 'wave', name: 'Wave', description: 'Flowing wave icon' }
    ];

    return (
        <ShowcaseContainer>
            <ShowcaseTitle>Pattern & Illustration Showcase</ShowcaseTitle>

            <PatternGrid>
                {patterns.map((pattern) => (
                    <PatternCard key={pattern.pattern}>
                        <PatternName>{pattern.name}</PatternName>
                        <PatternDescription>{pattern.description}</PatternDescription>
                        <PatternPreview pattern={pattern.pattern} />
                    </PatternCard>
                ))}
            </PatternGrid>

            <ShowcaseTitle>Decorative Elements</ShowcaseTitle>
            <DecorativeGrid>
                {decorativeElements.map((element) => (
                    <DecorativeCard key={element.type}>
                        <DecorativeElement
                            type={element.type as any}
                            size="48px"
                            color="var(--color-saddle-brown)"
                        />
                        <DecorativeName>{element.name}</DecorativeName>
                        <DecorativeDescription>{element.description}</DecorativeDescription>
                    </DecorativeCard>
                ))}
            </DecorativeGrid>
        </ShowcaseContainer>
    );
};

export default PatternShowcase;
