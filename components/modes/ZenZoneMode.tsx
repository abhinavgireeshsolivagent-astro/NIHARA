import React, { useState } from 'react';
import { getZenResponse } from '../../services/geminiService';
import ThematicLoader from '../common/ThematicLoader';
import { Leaf, Wand2, Wind, BrainCircuit } from 'lucide-react';

interface ZenZoneModeProps {
    onInteraction: () => void;
    isPro: boolean;
}

const ZenZoneMode: React.FC<ZenZoneModeProps> = ({ onInteraction, isPro }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [contentType, setContentType] = useState<'meditation' | 'soundscape' | 'affirmation' | null>(null);

    const handleGenerate = async (type: 'meditation' | 'soundscape' | 'affirmation') => {
        setIsLoading(true);
        setContent('');
        setContentType(type);
        onInteraction();
        const result = await getZenResponse(type);
        setContent(result);
        setIsLoading(false);
    };

    const proAccent = 'pro-accent';
    const baseAccent = 'base-accent';
    const accentColor = isPro ? proAccent : baseAccent;

    const OptionButton = ({ type, icon, title, description }: { type: 'meditation' | 'soundscape' | 'affirmation', icon: React.ReactNode, title: string, description: string }) => (
        <button
            onClick={() => handleGenerate(type)}
            disabled={isLoading}
            className={`p-6 rounded-xl text-left transition-all duration-300 interactive-glow flex items-start gap-4 disabled:opacity-50
                        bg-white/5 border-2 border-transparent hover:border-${accentColor}/50 hover:bg-white/10`}
        >
            <div className={`mt-1 text-${accentColor}`}>{icon}</div>
            <div>
                <h4 className="font-bold text-lg text-white">{title}</h4>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </button>
    );

    return (
        <div className="flex flex-col h-full w-full p-6 md:p-8 animate-subtle-fade-in-up">
            <div className="flex items-center mb-6">
                <Leaf className={`w-8 h-8 mr-3 text-${accentColor}`} />
                <h2 className="mode-title">Zen Zone</h2>
            </div>
            <p className="text-gray-300 mb-8 max-w-2xl">Find your inner peace. Select an option below to generate a moment of calm and mindfulness. 🍃</p>
            
            <div className="flex-1 grid md:grid-cols-2 gap-8 overflow-hidden">
                <div className="flex flex-col space-y-4">
                    <OptionButton type="meditation" icon={<BrainCircuit size={24}/>} title="Guided Meditation" description="A short, calming script to guide your thoughts and relax your mind." />
                    <OptionButton type="soundscape" icon={<Wind size={24}/>} title="Calming Soundscape" description="A vivid description of a peaceful environment to transport your senses." />
                    <OptionButton type="affirmation" icon={<Wand2 size={24}/>} title="Positive Affirmation" description="A powerful, uplifting statement to boost your confidence and brighten your day." />
                </div>
                <div className="w-full h-full bg-black/30 rounded-xl flex items-center justify-center p-6 border-2 border-dashed border-white/20 overflow-y-auto">
                    {isLoading && (
                        <div className="flex flex-col items-center text-white/50">
                            <ThematicLoader type="zen" accentColor={accentColor} />
                            <p className="mt-4">Cultivating calm...</p>
                        </div>
                    )}
                    {!isLoading && !content && <p className="text-gray-400">Your moment of zen will appear here.</p>}
                    {content && (
                        <div className="text-center animate-subtle-fade-in">
                           <p className="text-lg leading-relaxed whitespace-pre-wrap">{content}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ZenZoneMode;