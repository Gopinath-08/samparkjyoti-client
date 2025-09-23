import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AdvancedIllustration from './AdvancedIllustrations';

const AnimatedContainer = styled(motion.div) <{ size?: string }>`
  display: inline-block;
  width: ${props => props.size || '48px'};
  height: ${props => props.size || '48px'};
  position: relative;
`;

const FloatingContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PulseRing = styled(motion.div) <{ color?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid ${props => props.color || 'var(--color-sea-green)'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const GlowEffect = styled(motion.div) <{ color?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, ${props => props.color || 'var(--color-sea-green)'}20 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

interface AnimatedIllustrationProps {
    type: 'tractor' | 'harvest' | 'farmer' | 'grain' | 'vegetables' | 'farmhouse' | 'truck' | 'market' | 'worker' | 'tools' | 'field' | 'barn' | 'crops' | 'logistics' | 'community' | 'growth' | 'sustainability' | 'technology' | 'success' | 'partnership';
    size?: string;
    color?: string;
    animation?: 'float' | 'pulse' | 'bounce' | 'rotate' | 'glow' | 'wave' | 'none';
    className?: string;
    style?: React.CSSProperties;
}

const AnimatedIllustration: React.FC<AnimatedIllustrationProps> = ({
    type,
    size = '48px',
    color = 'var(--color-saddle-brown)',
    animation = 'float',
    className,
    style
}) => {
    const getAnimationProps = () => {
        switch (animation) {
            case 'float':
                return {
                    animate: {
                        y: [-2, 2, -2],
                        rotate: [-1, 1, -1]
                    },
                    transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }
                };
            case 'pulse':
                return {
                    animate: {
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                    },
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }
                };
            case 'bounce':
                return {
                    animate: {
                        y: [0, -8, 0]
                    },
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }
                };
            case 'rotate':
                return {
                    animate: {
                        rotate: [0, 360]
                    },
                    transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear" as const
                    }
                };
            case 'glow':
                return {
                    animate: {
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            `0 0 0 0 ${color}20`,
                            `0 0 20px 5px ${color}40`,
                            `0 0 0 0 ${color}20`
                        ]
                    },
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }
                };
            case 'wave':
                return {
                    animate: {
                        x: [-2, 2, -2],
                        y: [0, -2, 0]
                    },
                    transition: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }
                };
            default:
                return {};
        }
    };

    const animationProps = getAnimationProps();

    return (
        <AnimatedContainer
            size={size}
            className={className}
            style={style}
            {...animationProps}
        >
            <FloatingContainer>
                <AdvancedIllustration
                    type={type}
                    size={size}
                    color={color}
                    animated={true}
                />
            </FloatingContainer>

            {animation === 'pulse' && (
                <PulseRing
                    color={color}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {animation === 'glow' && (
                <GlowEffect
                    color={color}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}
        </AnimatedContainer>
    );
};

export default AnimatedIllustration;
