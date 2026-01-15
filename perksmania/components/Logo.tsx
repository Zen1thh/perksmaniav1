import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
  showMania?: boolean;
  variant?: 'light' | 'dark' | 'color';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  animate = false, 
  showMania = true,
  variant = 'color'
}) => {
  // Updated text color from perks-teal to the requested blue (#3C50E0)
  const textColor = variant === 'light' ? 'text-white' : (variant === 'dark' ? 'text-gray-800' : 'text-[#3C50E0]');

  return (
    <div className={`relative flex items-baseline ${className}`}>
      <span 
        className={`font-logo text-5xl md:text-6xl ${textColor} ${animate ? 'animate-fade-up' : ''} drop-shadow-sm`}
        style={{ animationDelay: '0.1s' }}
      >
        Perks
      </span>
      {showMania && (
        <span 
          className={`ml-1 font-sans font-bold uppercase tracking-widest text-sm md:text-base text-gray-400 ${animate ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '0.3s' }}
        >
          Mania
        </span>
      )}
      
      {/* Decorative dot */}
      <div 
        className={`absolute -right-2 top-0 w-2 h-2 rounded-full bg-yellow-400 ${animate ? 'animate-bounce' : ''}`}
        style={{ animationDelay: '0.6s' }}
      />
    </div>
  );
};