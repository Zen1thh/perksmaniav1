import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeProps {
  onComplete: () => void;
  isDarkMode: boolean;
  onToggleTheme: (val: boolean) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onComplete, isDarkMode, onToggleTheme }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text reveal
      gsap.from(".welcome-text-line", {
        y: 100,
        opacity: 0,
        rotateX: -20,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });

      // Background elements float
      gsap.to(".floating-orb", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
      
      {/* Theme Toggle Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={() => onToggleTheme(!isDarkMode)}
          className="p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200 dark:border-slate-700 hover:scale-105 transition-all shadow-lg"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
        </button>
      </div>

      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="floating-orb absolute top-[10%] left-[10%] w-64 h-64 bg-perks-teal/20 rounded-full blur-[80px]"></div>
         <div className="floating-orb absolute bottom-[20%] right-[10%] w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px]"></div>
         <div className="floating-orb absolute top-[40%] left-[50%] -translate-x-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" ref={textRef}>
        
        <div className="overflow-visible mb-6 flex flex-col items-center">
          <h1 className="welcome-text-line text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Welcome to
          </h1>
          <div className="welcome-text-line py-2">
            <Logo className="scale-[1.2] md:scale-[1.6] origin-center" variant="color" animate={true} />
          </div>
        </div>
        
        <div className="overflow-hidden mb-8">
           <p className="welcome-text-line text-lg md:text-2xl text-gray-500 dark:text-slate-400 font-light max-w-xl mx-auto leading-relaxed mt-4">
             The House of Rewards. Discover exclusive deals, dining experiences, and premium services tailored just for you.
           </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <button 
            onClick={onComplete}
            className="group relative px-8 py-4 bg-perks-teal hover:bg-perks-tealDark text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Start Exploring</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Button Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
          </button>
          
        </motion.div>

      </div>
      
      {/* Decorative Floor Reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 dark:from-slate-900 to-transparent opacity-50 pointer-events-none"></div>
    </div>
  );
};