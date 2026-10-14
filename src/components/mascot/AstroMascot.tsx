import React from 'react';

interface AstroMascotProps {
  mood?: 'happy' | 'waving' | 'thinking' | 'celebrating' | 'hint' | 'explaining';
  size?: number;
  isFloating?: boolean;
  onClick?: () => void;
}

export const AstroMascot: React.FC<AstroMascotProps> = ({
  mood = 'happy',
  size = 110,
  isFloating = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size * 1.15}px`,
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 12px 25px rgba(0, 0, 0, 0.95))',
        animation: isFloating ? 'floatBob 3.5s ease-in-out infinite' : 'none',
        position: 'relative',
        userSelect: 'none',
      }}
      title="Astro — Sahabat Penjelajah Antariksa"
    >
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Galactic Deep Obsidian Visor Gradient with Gold Reflection */}
          <linearGradient id="visorGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e2230" />
            <stop offset="60%" stopColor="#0b0d14" />
            <stop offset="100%" stopColor="#020305" />
          </linearGradient>

          {/* Helmet Glass Reflection */}
          <linearGradient id="glassReflect" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Suit Gradient */}
          <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Jetpack Glow */}
          <filter id="jetGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Jetpack (Backpack) */}
        <rect x="42" y="75" width="76" height="58" rx="14" fill="#334155" stroke="#1e293b" strokeWidth="3" />
        {/* Jetpack Thruster Pipes */}
        <rect x="48" y="130" width="16" height="12" rx="4" fill="#1e293b" />
        <rect x="96" y="130" width="16" height="12" rx="4" fill="#1e293b" />
        {/* Jet Flames (warm solar amber) */}
        <path d="M50 142 L56 156 L62 142 Z" fill="#f59e0b" opacity="0.9" filter="url(#jetGlow)" />
        <path d="M98 142 L104 156 L110 142 Z" fill="#f59e0b" opacity="0.9" filter="url(#jetGlow)" />

        {/* Astronaut Body (Torso) */}
        <rect x="45" y="74" width="70" height="60" rx="20" fill="url(#suitGrad)" stroke="#94a3b8" strokeWidth="2.5" />

        {/* Suit Charcoal Chest Patch */}
        <rect x="58" y="86" width="44" height="26" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <circle cx="68" cy="99" r="4" fill="#fbbf24" />
        <circle cx="80" cy="99" r="4" fill="#f8fafc" />
        <circle cx="92" cy="99" r="4" fill="#10b981" />
        {/* PlanetKuu Mini Gold Ribbon */}
        <path d="M74 91 Q80 87 86 91" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />

        {/* Left Arm */}
        {mood === 'waving' || mood === 'celebrating' ? (
          // Waving arm raised up!
          <g>
            <path
              d="M48 88 Q30 65 34 46"
              stroke="url(#suitGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Charcoal / Graphite Glove */}
            <circle cx="34" cy="44" r="9" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <circle cx="40" cy="42" r="3" fill="#64748b" />
          </g>
        ) : (
          // Relaxed arm
          <g>
            <path
              d="M48 88 Q32 105 38 122"
              stroke="url(#suitGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <circle cx="38" cy="122" r="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          </g>
        )}

        {/* Right Arm */}
        {mood === 'celebrating' ? (
          // Both arms up for celebration!
          <g>
            <path
              d="M112 88 Q130 65 126 46"
              stroke="url(#suitGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <circle cx="126" cy="44" r="9" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          </g>
        ) : (
          <g>
            <path
              d="M112 88 Q128 105 122 122"
              stroke="url(#suitGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <circle cx="122" cy="122" r="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          </g>
        )}

        {/* Legs & Cute Boots */}
        <rect x="52" y="128" width="18" height="24" rx="7" fill="url(#suitGrad)" stroke="#94a3b8" strokeWidth="2" />
        <rect x="90" y="128" width="18" height="24" rx="7" fill="url(#suitGrad)" stroke="#94a3b8" strokeWidth="2" />
        {/* Boots with dark graphite soles */}
        <path d="M48 148 Q60 146 72 148 L72 156 Q60 158 48 156 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <path d="M88 148 Q100 146 112 148 L112 156 Q100 158 88 156 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />

        {/* Cute Big Astronaut Helmet Outer Shell */}
        <circle cx="80" cy="50" r="42" fill="url(#suitGrad)" stroke="#94a3b8" strokeWidth="3" />
        {/* Helmet Audio / Comms Earpieces */}
        <rect x="34" y="44" width="8" height="16" rx="4" fill="#334155" />
        <rect x="118" y="44" width="8" height="16" rx="4" fill="#334155" />

        {/* Glossy Obsidian Visor Screen with Gold Rim */}
        <ellipse cx="80" cy="52" rx="32" ry="26" fill="url(#visorGrad)" stroke="#f59e0b" strokeWidth="2" />

        {/* Cute Face Inside Visor */}
        <g>
          {/* Cheerful Big Sparkly Eyes */}
          <ellipse cx="70" cy="48" rx="4.5" ry="5.5" fill="#ffffff" />
          <ellipse cx="90" cy="48" rx="4.5" ry="5.5" fill="#ffffff" />
          <circle cx="71.5" cy="46.5" r="2" fill="#0f172a" />
          <circle cx="91.5" cy="46.5" r="2" fill="#0f172a" />

          {/* Cheeks */}
          <circle cx="63" cy="55" r="3.5" fill="#ec4899" opacity="0.6" />
          <circle cx="97" cy="55" r="3.5" fill="#ec4899" opacity="0.6" />

          {/* Happy Mouth */}
          {mood === 'celebrating' || mood === 'happy' ? (
            <path d="M74 56 Q80 63 86 56" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : mood === 'thinking' ? (
            <circle cx="80" cy="58" r="3" fill="#ffffff" />
          ) : (
            <path d="M75 58 Q80 61 85 58" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}
        </g>

        {/* Glass Crescent Highlight Reflection */}
        <path
          d="M58 35 Q80 25 102 35 Q80 30 58 35 Z"
          fill="url(#glassReflect)"
        />
        <circle cx="64" cy="38" r="2.5" fill="#ffffff" opacity="0.8" />
      </svg>
    </div>
  );
};
