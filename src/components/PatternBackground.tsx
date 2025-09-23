import React from 'react';
import styled from 'styled-components';

interface PatternBackgroundProps {
    pattern?: 'dots' | 'grid' | 'diagonal' | 'waves' | 'circles' | 'hexagons' | 'organic' | 'custom';
    intensity?: 'light' | 'medium' | 'heavy';
    children: React.ReactNode;
    className?: string;
}

const PatternContainer = styled.div<{ pattern: string; intensity: string }>`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
    opacity: ${props => props.intensity === 'light' ? '0.3' : props.intensity === 'medium' ? '0.6' : '0.8'};
    
    ${props => {
        switch (props.pattern) {
            case 'dots':
                return `
            background-image: var(--pattern-dots);
            background-size: 20px 20px;
          `;
            case 'grid':
                return `
            background-image: var(--pattern-grid);
            background-size: 20px 20px;
          `;
            case 'diagonal':
                return `
            background-image: var(--pattern-diagonal);
            background-size: 40px 40px;
          `;
            case 'waves':
                return `
            background-image: var(--pattern-waves);
            background-size: 30px 30px;
          `;
            case 'circles':
                return `
            background-image: var(--pattern-circles);
            background-size: 40px 40px;
          `;
            case 'hexagons':
                return `
            background-image: var(--pattern-hexagons);
            background-size: 60px 60px;
          `;
            case 'organic':
                return `
            background-image: var(--pattern-organic);
            background-size: 100% 100%;
          `;
            default:
                return '';
        }
    }}
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const PatternBackground: React.FC<PatternBackgroundProps> = ({
    pattern = 'organic',
    intensity = 'light',
    children,
    className
}) => {
    return (
        <PatternContainer pattern={pattern} intensity={intensity} className={className}>
            {children}
        </PatternContainer>
    );
};

export default PatternBackground;
