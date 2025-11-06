import React from 'react';
import { AppMode } from '../types';
import { MessageSquare, Image, Star, BookLock, Mic, Zap, ArrowUpCircle, Leaf, X } from 'lucide-react';

interface SidebarProps {
    currentMode: AppMode;
    setMode: (mode: AppMode) => void;
    isPro: boolean;
    userName: string;
    personalityName: string;
    isMobile: boolean;
    onClose: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: AppMode; currentMode: AppMode; setMode: (mode: AppMode) => void; isPro: boolean; isMobile: boolean; onClose: () => void; }> = ({ icon, label, currentMode, setMode, isPro, isMobile, onClose }) => {
    const isActive = currentMode === label;
    
    const handleClick = () => {
        setMode(label);
        if (isMobile) {
            onClose();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`nav-item relative overflow-hidden flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-200 ${isActive ? ' text-white' : ''} interactive-glow`}
        >
            {icon}
            <span className="ml-4 font-semibold">{label}</span>
        </button>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode, isPro, userName, personalityName, isMobile, onClose }) => {
    const profileInitial = userName ? userName.charAt(0).toUpperCase() : personalityName.charAt(0).toUpperCase();

    const accentColor = isPro ? 'bg-pro-accent' : 'bg-base-accent';

    return (
        <aside className="w-full h-full p-4 flex flex-col glassmorphic rounded-2xl sidebar-bg">
            <div className="flex items-center justify-between mb-8 z-10">
                <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white ${accentColor}`}>
                        {profileInitial}
                    </div>
                    <div className="ml-3">
                        <h1 className="text-xl font-bold text-white">{personalityName}</h1>
                        {userName && <p className="text-sm text-gray-400">for {userName}</p>}
                    </div>
                </div>
                {isMobile && (
                    <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-white">
                        <X />
                    </button>
                )}
            </div>

            <nav className="flex-1 z-10">
                <NavItem icon={<MessageSquare />} label={AppMode.CHAT} currentMode={currentMode} setMode={setMode} isPro={isPro} isMobile={isMobile} onClose={onClose} />
                <NavItem icon={<Image />} label={AppMode.IMAGE_GEN} currentMode={currentMode} setMode={setMode} isPro={isPro} isMobile={isMobile} onClose={onClose} />
                <NavItem icon={<Star />} label={AppMode.ASTRO_GUIDE} currentMode={currentMode} setMode={setMode} isPro={isPro} isMobile={isMobile} onClose={onClose} />
                <NavItem icon={<BookLock />} label={AppMode.AI_DIARY} currentMode={currentMode} setMode={setMode} isPro={isPro} isMobile={isMobile} onClose={onClose} />
                <NavItem icon={<Mic />} label={AppMode.LIVE} currentMode={currentMode} setMode={setMode} isPro={isPro} isMobile={isMobile} onClose={onClose} />
                <NavItem icon={<Leaf />} label={AppMode.ZEN_ZONE} currentMode={currentMode} setMode={setMode} isPro={isPro} isMobile={isMobile} onClose={onClose} />
            </nav>

            <div className="mt-auto z-10">
                {isPro && (
                     <div className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold shadow-lg shimmer-effect">
                       <ArrowUpCircle className="mr-2 animate-pulse"/>
                        Mega Pro Activated
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;