import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { X, Mail, Lock, User, ArrowRight, Chrome, Facebook, Eye, EyeOff } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.from(".auth-item", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3
        });
        
        gsap.from(".side-graphic", {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      }, modalRef);
      return () => ctx.revert();
    }
  }, [isOpen]);

  // Re-animate items when switching modes
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(".form-field", 
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    if (btn) {
      const originalContent = btn.innerHTML;
      btn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Processing...</span>
      `;
      btn.disabled = true;
      
      setTimeout(() => {
        onLoginSuccess();
        if (btn) {
          btn.innerHTML = originalContent;
          btn.disabled = false;
        }
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    // Outer container handles scrolling if content is too tall
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        {/* Backdrop click handler */}
        <div className="absolute inset-0" onClick={onClose} aria-label="Close modal"></div>

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[auto] md:min-h-[700px] border border-gray-100 dark:border-slate-800 my-4 md:my-0"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2 md:p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group shadow-sm"
          >
            <X size={20} className="text-slate-500 dark:text-slate-400 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Left Side - Visual Branding (Hidden on Mobile) */}
          <div className="side-graphic relative hidden md:flex flex-col justify-between w-5/12 bg-slate-900 p-8 lg:p-12 overflow-hidden text-white">
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000" 
                 className="w-full h-full object-cover opacity-40 scale-110"
                 alt="Background"
               />
               <div className="absolute inset-0 bg-gradient-to-br from-perks-teal/30 to-slate-950/95 mix-blend-multiply"></div>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10">
              <Logo variant="light" className="scale-90 origin-top-left" />
              
              <div className="mt-16 lg:mt-20 space-y-4 lg:space-y-6">
                 <motion.h2 
                   key={mode}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-3xl lg:text-5xl font-bold leading-tight"
                 >
                   {mode === 'signin' ? <>Unlock <br/>Your Perks</> : <>Join the <br/>Experience</>}
                 </motion.h2>
                 <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-xs font-light">
                   {mode === 'signin' 
                     ? 'Sign in to access your curated deals and rewards portfolio.' 
                     : 'Create an account and start saving with hundreds of premium merchants.'}
                 </p>
              </div>
            </div>

            <div className="relative z-10">
               <div className="flex gap-3 lg:gap-4 mb-6 lg:mb-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                     <Lock size={18} className="text-perks-teal" />
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                     <Mail size={18} className="text-perks-teal" />
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                     <User size={18} className="text-perks-teal" />
                  </div>
               </div>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                 &copy; 2025 PerksMania Corporation
               </p>
            </div>
          </div>

          {/* Right Side - Authentication Form */}
          <div className="flex-1 p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col bg-white dark:bg-slate-950 relative" ref={formRef}>
             {/* Mobile Header Logo */}
             <div className="md:hidden flex justify-center mb-6">
                <Logo variant="color" className="scale-75" />
             </div>

             <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
                
                {/* Modern Tab Switcher */}
                <div className="auth-item flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-8 relative">
                  <button 
                    onClick={() => setMode('signin')}
                    className={`flex-1 py-3 text-sm font-bold rounded-[14px] transition-all relative z-10 ${mode === 'signin' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-3 text-sm font-bold rounded-[14px] transition-all relative z-10 ${mode === 'signup' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                  >
                    Create Account
                  </button>
                  
                  {/* Sliding Pill Background */}
                  <motion.div 
                    className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white dark:bg-slate-800 rounded-[14px] shadow-sm z-0"
                    animate={{ x: mode === 'signin' ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                </div>

                {/* Functional Forms */}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                   <AnimatePresence mode="wait">
                      {mode === 'signup' && (
                         <motion.div 
                           initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                           animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                           exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                           className="form-field overflow-hidden"
                         >
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase tracking-wider mb-2 block">Full Name</label>
                            <div className="relative group">
                               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-perks-teal transition-colors" size={20} />
                               <input 
                                 type="text" 
                                 placeholder="Enter your name" 
                                 className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-perks-teal/20 focus:border-perks-teal outline-none transition-all placeholder:text-slate-400/40 font-medium text-sm md:text-base" 
                                 required={mode === 'signup'} 
                               />
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                   
                   <div className="form-field space-y-2">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
                      <div className="relative group">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-perks-teal transition-colors" size={20} />
                         <input 
                           type="email" 
                           placeholder="name@example.com" 
                           className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-perks-teal/20 focus:border-perks-teal outline-none transition-all placeholder:text-slate-400/40 font-medium text-sm md:text-base" 
                           required 
                         />
                      </div>
                   </div>

                   <div className="form-field space-y-2">
                      <div className="flex justify-between items-center ml-1">
                         <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Password</label>
                      </div>
                      <div className="relative group">
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-perks-teal transition-colors" size={20} />
                         <input 
                           type={showPassword ? "text" : "password"} 
                           placeholder="Enter your password" 
                           className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-perks-teal/20 focus:border-perks-teal outline-none transition-all placeholder:text-slate-400/40 font-medium text-sm md:text-base" 
                           required 
                         />
                         <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                         >
                           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                         </button>
                      </div>
                      {mode === 'signin' && (
                        <div className="flex justify-end pr-1 pt-1">
                           <button type="button" className="text-xs font-bold text-perks-teal hover:underline decoration-2 underline-offset-4">Forgot Password?</button>
                        </div>
                      )}
                   </div>

                   {/* Main Action Buttons */}
                   <div className="auth-item pt-4 md:pt-2">
                      <button 
                        type="submit"
                        className="w-full bg-perks-teal hover:bg-perks-tealDark text-white font-bold text-base md:text-lg py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-perks-teal/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                          <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </form>

                {/* Divider moved below submit button */}
                <div className="auth-item relative flex items-center gap-4 mt-6 md:mt-8 mb-6">
                   <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Or continue with</span>
                   <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
                </div>

                {/* Social Login Buttons moved below divider */}
                <div className="auth-item grid grid-cols-2 gap-3 md:gap-4">
                   <button className="flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:shadow-md group">
                      <Chrome size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-xs md:text-sm text-slate-700 dark:text-slate-300">Google</span>
                   </button>
                   <button className="flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:shadow-md group">
                      <Facebook size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-xs md:text-sm text-slate-700 dark:text-slate-300">Facebook</span>
                   </button>
                </div>

                {/* Secondary Action Link */}
                <div className="auth-item mt-6 md:mt-8 text-center">
                   <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                      <button 
                        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                        className="text-perks-teal font-bold hover:underline decoration-2 underline-offset-4"
                      >
                         {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                      </button>
                   </p>
                </div>
             </div>
             
             {/* Form Footer Privacy Notice */}
             <div className="auth-item mt-6 md:mt-auto pt-6 md:pt-10 text-center">
                <p className="text-[10px] text-slate-400 dark:text-slate-600 max-w-xs mx-auto leading-relaxed">
                   By continuing, you agree to PerksMania's <a href="#" className="underline hover:text-slate-600 transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>.
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};