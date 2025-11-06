import React from 'react';
import { Personality } from '../types';
import { PERSONALITIES, VOICE_TONES } from '../constants';
import { X, Heart } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    isPro: boolean;
    currentPersonality: Personality;
    onPersonalityChange: (p: Personality) => void;
    currentVoiceTone: string;
    onVoiceToneChange: (v: string) => void;
    commitmentLevel: number;
}

const Sparkles: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${Math.random() * 1 + 0.5}s`,
            };
            return <div key={i} className="sparkle" style={style} />;
        })}
    </div>
);


const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    isPro,
    currentPersonality,
    onPersonalityChange,
    currentVoiceTone,
    onVoiceToneChange,
    commitmentLevel,
}) => {
    if (!isOpen) return null;

    const accentColor = isPro ? 'pro-accent' : 'base-accent';
    const isMaxCommitment = commitmentLevel === 100;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-subtle-fade-in">
            <div className="glassmorphic rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative animate-modal-enter">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
                    <X />
                </button>
                <h2 className="text-3xl font-bold mb-6 text-center">Settings</h2>

                {/* Commitment Level */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <Heart className={`mr-2 text-red-400`} /> Commitment Level
                    </h3>
                    <div className="w-full bg-white/10 rounded-full h-4 sparkle-container">
                         {isMaxCommitment && <Sparkles />}
                        <div
                            className={`h-4 rounded-full transition-all duration-500 ${isMaxCommitment ? 'bg-gradient-to-r from-pink-500 to-yellow-400' : `bg-${accentColor}`}`}
                            style={{ width: `${commitmentLevel}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 text-center">{commitmentLevel}% - {isMaxCommitment ? "Our bond is unbreakable! ✨" : "Our bond grows with every interaction!"}</p>
                </div>

                {/* Personality Selector */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">AI Personality</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.values(PERSONALITIES).map((p) => (
                            <button
                                key={p.id}
                                onClick={() => onPersonalityChange(p)}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                    currentPersonality.id === p.id
                                        ? `border-${accentColor} bg-white/10 scale-105`
                                        : 'border-transparent bg-white/5 hover:border-white/50'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full ${p.avatarColor} mx-auto mb-2 flex items-center justify-center text-xl font-bold`}>{p.name.charAt(0)}</div>
                                <h4 className="font-bold text-lg">{p.name}</h4>
                                <p className="text-sm text-gray-400">{p.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Voice Tone Selector */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Live Mode Voice</h3>
                    <div className="flex flex-wrap gap-3">
                        {VOICE_TONES.map(voice => (
                            <button key={voice.id} onClick={() => onVoiceToneChange(voice.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    currentVoiceTone === voice.id ? `bg-${accentColor} text-white` : 'bg-white/10 hover:bg-white/20'
                                }`}
                            >
                                {voice.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;