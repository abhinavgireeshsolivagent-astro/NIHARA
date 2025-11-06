import React from 'react';
import { Loader2 } from 'lucide-react';

interface ThematicLoaderProps {
    type: 'astro' | 'image' | 'zen' | 'default';
    accentColor?: string;
}

const ThematicLoader: React.FC<ThematicLoaderProps> = ({ type, accentColor = 'base-accent' }) => {
    switch (type) {
        case 'astro':
            return (
                <div className={`loader-astro text-${accentColor}`}>
                    <div className="loader-astro-planet"></div>
                    <div className="loader-astro-orbit"></div>
                </div>
            );
        case 'image':
            return <div className={`loader-image text-${accentColor}`}></div>;
        case 'zen':
            return (
                <div className={`loader-zen text-${accentColor}`}>
                    <div className="loader-zen-ripple"></div>
                    <div className="loader-zen-ripple"></div>
                    <div className="loader-zen-ripple"></div>
                </div>
            );
        case 'default':
        default:
            return <Loader2 className="animate-spin" />;
    }
};

export default ThematicLoader;
