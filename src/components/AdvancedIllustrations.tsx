import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SvgContainer = styled.div<{ size?: string; color?: string; animated?: boolean }>`
  display: inline-block;
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  color: ${props => props.color || 'var(--color-saddle-brown)'};
  cursor: ${props => props.animated ? 'pointer' : 'default'};
  
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    transition: all 0.3s ease;
  }
  
  &:hover svg {
    transform: ${props => props.animated ? 'scale(1.1)' : 'none'};
  }
`;

interface AdvancedIllustrationProps {
    type: 'tractor' | 'harvest' | 'farmer' | 'grain' | 'vegetables' | 'farmhouse' | 'truck' | 'market' | 'worker' | 'tools' | 'field' | 'barn' | 'crops' | 'logistics' | 'community' | 'growth' | 'sustainability' | 'technology' | 'success' | 'partnership';
    size?: string;
    color?: string;
    animated?: boolean;
    className?: string;
}

const AdvancedIllustration: React.FC<AdvancedIllustrationProps> = ({
    type,
    size = '24px',
    color = 'var(--color-saddle-brown)',
    animated = false,
    className
}) => {
    const getSvgContent = () => {
        switch (type) {
            case 'tractor':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: 2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M5 16c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm12-8h-3V4H8v4H5c-1.1 0-2 .9-2 2v6h2c0 1.1.9 2 2 2s2-.9 2-2h6c0 1.1.9 2 2 2s2-.9 2-2h2V10c0-1.1-.9-2-2-2zM8 6h4v2H8V6z" />
                        <circle cx="5" cy="16" r="1" />
                        <circle cx="19" cy="16" r="1" />
                        <path d="M9 12h6v2H9v-2z" />
                    </motion.svg>
                );
            case 'harvest':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M8 4h2v2H8V4zm6 0h2v2h-2V4zM8 18h2v2H8v-2zm6 0h2v2h-2v-2z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M9 9h6v6H9V9z" />
                    </motion.svg>
                );
            case 'farmer':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: -2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" />
                        <path d="M12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8ZM12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z" />
                        <path d="M8 16H16V18H8V16Z" />
                    </motion.svg>
                );
            case 'grain':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: 5 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <circle cx="8" cy="8" r="2" />
                        <circle cx="16" cy="8" r="2" />
                        <circle cx="8" cy="16" r="2" />
                        <circle cx="16" cy="16" r="2" />
                        <path d="M12 4C8.69 4 6 6.69 6 10s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                    </motion.svg>
                );
            case 'vegetables':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -1 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M8 4h2v2H8V4zm6 0h2v2h-2V4zM8 18h2v2H8v-2zm6 0h2v2h-2v-2z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M9 9h6v6H9V9z" />
                        <path d="M6 6h2v2H6V6zm10 0h2v2h-2V6zM6 16h2v2H6v-2zm10 0h2v2h-2v-2z" />
                    </motion.svg>
                );
            case 'farmhouse':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        <path d="M8 12h8v2H8v-2z" />
                        <path d="M10 14h4v4h-4v-4z" />
                        <circle cx="12" cy="8" r="1" />
                    </motion.svg>
                );
            case 'truck':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, x: 2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.1.9 2 2 2s2-.9 2-2h6c0 1.1.9 2 2 2s2-.9 2-2h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm10 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        <path d="M15 8h2l3 4h-5V8z" />
                    </motion.svg>
                );
            case 'market':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: 2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                        <path d="M9 8H11V16H9V8ZM13 8H15V16H13V8Z" />
                        <circle cx="12" cy="12" r="2" />
                    </motion.svg>
                );
            case 'worker':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: -1 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" />
                        <path d="M12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8ZM12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z" />
                        <path d="M8 16H16V18H8V16Z" />
                        <path d="M10 12H14V14H10V12Z" />
                    </motion.svg>
                );
            case 'tools':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: 10 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                        <path d="M8 12h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                    </motion.svg>
                );
            case 'field':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -1 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M4 12h16v2H4v-2zm0 4h16v2H4v-2zm0-8h16v2H4V8z" />
                        <circle cx="8" cy="8" r="1" />
                        <circle cx="16" cy="8" r="1" />
                        <circle cx="8" cy="16" r="1" />
                        <circle cx="16" cy="16" r="1" />
                    </motion.svg>
                );
            case 'barn':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                        <path d="M2 17L12 22L22 17" />
                        <path d="M2 12L12 17L22 12" />
                        <path d="M8 8h8v8H8V8z" />
                        <circle cx="12" cy="12" r="2" />
                    </motion.svg>
                );
            case 'crops':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: 3 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M8 4h2v2H8V4zm6 0h2v2h-2V4zM8 18h2v2H8v-2zm6 0h2v2h-2v-2z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M9 9h6v6H9V9z" />
                        <path d="M6 6h2v2H6V6zm10 0h2v2h-2V6zM6 16h2v2H6v-2zm10 0h2v2h-2v-2z" />
                        <path d="M4 8h16v2H4V8zm0 4h16v2H4v-2z" />
                    </motion.svg>
                );
            case 'logistics':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, x: 1 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.1.9 2 2 2s2-.9 2-2h6c0 1.1.9 2 2 2s2-.9 2-2h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm10 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        <path d="M15 8h2l3 4h-5V8z" />
                        <path d="M8 12h8v2H8v-2z" />
                        <circle cx="12" cy="6" r="1" />
                    </motion.svg>
                );
            case 'community':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -1 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.5-1.84 1.25L12 15h2v7h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9l-1.34-4.68A1.5 1.5 0 0 0 6.2 8H3.5c-.8 0-1.54.5-1.84 1.25L0 15h2v7h5.5z" />
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                    </motion.svg>
                );
            case 'growth':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                        <path d="M2 4h4v4H2V4zm6 0h4v4H8V4zm6 0h4v4h-4V4z" />
                        <circle cx="4" cy="6" r="1" />
                        <circle cx="10" cy="6" r="1" />
                        <circle cx="16" cy="6" r="1" />
                    </motion.svg>
                );
            case 'sustainability':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: 5 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M12 4C8.69 4 6 6.69 6 10s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        <path d="M8 4h2v2H8V4zm6 0h2v2h-2V4zM8 18h2v2H8v-2zm6 0h2v2h-2v-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </motion.svg>
                );
            case 'technology':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, rotate: -2 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M8 4h2v2H8V4zm6 0h2v2h-2V4zM8 18h2v2H8v-2zm6 0h2v2h-2v-2z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M9 9h6v6H9V9z" />
                        <path d="M6 6h2v2H6V6zm10 0h2v2h-2V6zM6 16h2v2H6v-2zm10 0h2v2h-2v-2z" />
                        <path d="M4 8h16v2H4V8zm0 4h16v2H4v-2z" />
                        <circle cx="12" cy="6" r="1" />
                        <circle cx="12" cy="18" r="1" />
                    </motion.svg>
                );
            case 'success':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </motion.svg>
                );
            case 'partnership':
                return (
                    <motion.svg
                        viewBox="0 0 24 24"
                        initial={{ scale: 1 }}
                        whileHover={animated ? { scale: 1.05, y: -1 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.5-1.84 1.25L12 15h2v7h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9l-1.34-4.68A1.5 1.5 0 0 0 6.2 8H3.5c-.8 0-1.54.5-1.84 1.25L0 15h2v7h5.5z" />
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                        <path d="M8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
                    </motion.svg>
                );
            default:
                return null;
        }
    };

    return (
        <SvgContainer size={size} color={color} animated={animated} className={className}>
            {getSvgContent()}
        </SvgContainer>
    );
};

export default AdvancedIllustration;
