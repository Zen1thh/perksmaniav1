import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Logo } from './Logo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
             // Slight delay before triggering unmount to ensure visual completion
             gsap.delayedCall(0.2, onComplete);
        }
      });

      // Initial state
      gsap.set(progressRef.current, { width: "0%" });

      // Loading Sequence
      tl.to(progressRef.current, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      })
      .to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.in",
      }, ">-0.4")
      .to(progressRef.current, {
        height: 0,
        opacity: 0,
        margin: 0,
        duration: 0.4,
        ease: "power2.in"
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05, 
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-20 -left-20 w-96 h-96 bg-perks-teal/10 rounded-full blur-3xl"
          />
          <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl"
          />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-10 scale-110">
          <Logo animate={true} variant="color" />
        </div>

        <div className="w-64 h-1 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-perks-teal shadow-[0_0_15px_rgba(80,227,194,0.6)]"
          />
        </div>

        <p ref={textRef} className="mt-4 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-[0.2em]">
          Loading Experience...
        </p>
      </div>
    </motion.div>
  );
};