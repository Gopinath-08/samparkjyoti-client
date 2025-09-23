import React from 'react';
import styled from 'styled-components';
import {
    UserGroupIcon,
    TruckIcon,
    HomeIcon,
    ChartBarIcon,
    CogIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    ClockIcon,
    PhoneIcon,
    EnvelopeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
    HeartIcon,
    ShareIcon,
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
    UserIcon,
    BellIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import {
    UserGroupIcon as UserGroupSolid,
    TruckIcon as TruckSolid,
    HomeIcon as HomeSolid,
    ChartBarIcon as ChartBarSolid,
    CogIcon as CogSolid,
    PlusIcon as PlusSolid,
    MagnifyingGlassIcon as MagnifyingGlassSolid,
    MapPinIcon as MapPinSolid,
    ClockIcon as ClockSolid,
    PhoneIcon as PhoneSolid,
    EnvelopeIcon as EnvelopeSolid,
    CheckCircleIcon as CheckCircleSolid,
    ExclamationTriangleIcon as ExclamationTriangleSolid,
    InformationCircleIcon as InformationCircleSolid,
    StarIcon as StarSolid,
    HeartIcon as HeartSolid,
    ShareIcon as ShareSolid,
    EyeIcon as EyeSolid,
    EyeSlashIcon as EyeSlashSolid,
    LockClosedIcon as LockClosedSolid,
    UserIcon as UserSolid,
    BellIcon as BellSolid
} from '@heroicons/react/24/solid';

const IconContainer = styled.div<{
    size?: string;
    color?: string;
    animated?: boolean;
    variant?: 'outline' | 'solid';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  color: ${props => props.color || 'var(--color-saddle-brown)'};
  cursor: ${props => props.animated ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  flex-shrink: 0;
  overflow: visible;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: currentColor;
    fill: ${props => props.variant === 'solid' ? 'currentColor' : 'none'};
    stroke-width: ${props => props.variant === 'solid' ? '0' : '1.5'};
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
    overflow: visible;
  }
  
  &:hover {
    transform: ${props => props.animated ? 'scale(1.05)' : 'none'};
    color: ${props => props.animated ? 'var(--color-sea-green)' : 'currentColor'};
  }
`;

interface IconProps {
    name: string;
    size?: string;
    color?: string;
    animated?: boolean;
    variant?: 'outline' | 'solid';
    className?: string;
}

const Icon: React.FC<IconProps> = ({
    name,
    size = '24px',
    color = 'var(--color-saddle-brown)',
    animated = false,
    variant = 'outline',
    className
}) => {
    const getIcon = () => {
        const iconMap = {
            // Outline icons
            'user-group': UserGroupIcon,
            'truck': TruckIcon,
            'home': HomeIcon,
            'chart-bar': ChartBarIcon,
            'cog': CogIcon,
            'plus': PlusIcon,
            'search': MagnifyingGlassIcon,
            'map-pin': MapPinIcon,
            'clock': ClockIcon,
            'phone': PhoneIcon,
            'envelope': EnvelopeIcon,
            'check-circle': CheckCircleIcon,
            'exclamation-triangle': ExclamationTriangleIcon,
            'information-circle': InformationCircleIcon,
            'x-mark': XMarkIcon,
            'chevron-down': ChevronDownIcon,
            'chevron-up': ChevronUpIcon,
            'chevron-left': ChevronLeftIcon,
            'chevron-right': ChevronRightIcon,
            'star': StarIcon,
            'heart': HeartIcon,
            'share': ShareIcon,
            'eye': EyeIcon,
            'eye-slash': EyeSlashIcon,
            'lock': LockClosedIcon,
            'user': UserIcon,
            'bell': BellIcon,
            'arrow-right': ArrowRightIcon,
            'arrow-left': ArrowLeftIcon,
            'arrow-up': ArrowUpIcon,
            'arrow-down': ArrowDownIcon,
            'logout': ArrowRightOnRectangleIcon,

            // Solid icons
            'user-group-solid': UserGroupSolid,
            'truck-solid': TruckSolid,
            'home-solid': HomeSolid,
            'chart-bar-solid': ChartBarSolid,
            'cog-solid': CogSolid,
            'plus-solid': PlusSolid,
            'search-solid': MagnifyingGlassSolid,
            'map-pin-solid': MapPinSolid,
            'clock-solid': ClockSolid,
            'phone-solid': PhoneSolid,
            'envelope-solid': EnvelopeSolid,
            'check-circle-solid': CheckCircleSolid,
            'exclamation-triangle-solid': ExclamationTriangleSolid,
            'information-circle-solid': InformationCircleSolid,
            'star-solid': StarSolid,
            'heart-solid': HeartSolid,
            'share-solid': ShareSolid,
            'eye-solid': EyeSolid,
            'eye-slash-solid': EyeSlashSolid,
            'lock-solid': LockClosedSolid,
            'user-solid': UserSolid,
            'bell-solid': BellSolid,
        };

        const IconComponent = iconMap[name as keyof typeof iconMap];
        return IconComponent ? <IconComponent /> : null;
    };

    return (
        <IconContainer
            size={size}
            color={color}
            animated={animated}
            variant={variant}
            className={className}
        >
            {getIcon()}
        </IconContainer>
    );
};

export default Icon;
