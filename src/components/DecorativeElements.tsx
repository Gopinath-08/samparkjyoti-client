import React from 'react';
import styled from 'styled-components';

const SvgContainer = styled.div<{ size?: string; color?: string }>`
  display: inline-block;
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  color: ${props => props.color || 'var(--color-saddle-brown)'};
  
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

interface DecorativeElementProps {
    type: 'leaf' | 'grain' | 'worker' | 'farm' | 'pattern' | 'wave';
    size?: string;
    color?: string;
    className?: string;
}

const DecorativeElement: React.FC<DecorativeElementProps> = ({
    type,
    size = '24px',
    color = 'var(--color-saddle-brown)',
    className
}) => {
    const getSvgContent = () => {
        switch (type) {
            case 'leaf':
                return (
                    <svg viewBox="0 0 24 24">
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.91.66.95-2.3c.48.17.98.3 1.32.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75S7 14 17 8z" />
                    </svg>
                );
            case 'grain':
                return (
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <circle cx="8" cy="8" r="2" />
                        <circle cx="16" cy="8" r="2" />
                        <circle cx="8" cy="16" r="2" />
                        <circle cx="16" cy="16" r="2" />
                    </svg>
                );
            case 'worker':
                return (
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M9 15H15V17H9V15Z" />
                    </svg>
                );
            case 'farm':
                return (
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                        <path d="M2 17L12 22L22 17" />
                        <path d="M2 12L12 17L22 12" />
                        <circle cx="12" cy="7" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="17" r="2" />
                    </svg>
                );
            case 'pattern':
                return (
                    <svg viewBox="0 0 24 24">
                        <rect x="2" y="2" width="4" height="4" rx="1" />
                        <rect x="10" y="2" width="4" height="4" rx="1" />
                        <rect x="18" y="2" width="4" height="4" rx="1" />
                        <rect x="2" y="10" width="4" height="4" rx="1" />
                        <rect x="10" y="10" width="4" height="4" rx="1" />
                        <rect x="18" y="10" width="4" height="4" rx="1" />
                        <rect x="2" y="18" width="4" height="4" rx="1" />
                        <rect x="10" y="18" width="4" height="4" rx="1" />
                        <rect x="18" y="18" width="4" height="4" rx="1" />
                    </svg>
                );
            case 'wave':
                return (
                    <svg viewBox="0 0 24 24">
                        <path d="M3 12C3 12 6 8 12 8S21 12 21 12S18 16 12 16S3 12 3 12Z" />
                        <path d="M3 16C3 16 6 12 12 12S21 16 21 16S18 20 12 20S3 16 3 16Z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <SvgContainer size={size} color={color} className={className}>
            {getSvgContent()}
        </SvgContainer>
    );
};

export default DecorativeElement;
