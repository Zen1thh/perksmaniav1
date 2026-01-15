import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, MapPin, Sparkles, ChevronLeft } from 'lucide-react';
import { Logo } from './Logo';

interface OnboardingProps {
  onComplete: () => void;
  isDarkMode: boolean;
  onToggleTheme: (val: boolean) => void;
}

const INTERESTS = [
  { id: 'dining', label: 'Dining', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
  { id: 'fashion', label: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400' },
  { id: 'tech', label: 'Tech', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400' },
  { id: 'travel', label: 'Travel', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=400' },
  { id: 'gaming', label: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { id: 'shopping', label: 'Shopping', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=400' },
];

const LOCATIONS = [
  'Makati City', 'BGC, Taguig', 'Quezon City', 'Manila', 'Pasig City', 'Mandaluyong'
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isDarkMode, onToggleTheme }) => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const totalSteps = 3;

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isNextDisabled = (step === 0 && selectedInterests.length === 0) || (step === 1 && !selectedLocation);

  const handleNext = () => {
    if (isNextDisabled) return;

    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-slate-950 flex flex-col overflow-hidden text-gray-900 dark:text-white font-sans selection:bg-perks-teal selection:text-white transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-perks-teal/10 dark:bg-perks-teal/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 px-6 py-4 md:py-6 flex justify-between items-center shrink-0">
        <Logo className="scale-75 origin-left" variant="color" />
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 md:px-12 max-w-lg md:max-w-3xl mx-auto w-full mb-2 md:mb-8 shrink-0">
        <div className="h-1 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden flex transition-colors">
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} className="flex-1 px-0.5">
               <motion.div 
                 className={`h-full rounded-full ${i <= step ? 'bg-perks-teal shadow-[0_0_10px_rgba(80,227,194,0.5)]' : 'bg-transparent'}`}
                 initial={false}
                 animate={{ opacity: i <= step ? 1 : 0 }}
                 transition={{ duration: 0.3 }}
               />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col overflow-y-auto px-6 pb-6 hide-scrollbar">
        {/* Changed justify-center to standard flow with padding for better 'underneath' placement */}
        <div className="flex-1 flex flex-col max-w-lg md:max-w-4xl mx-auto w-full py-2 pt-4 md:pt-10 min-h-0">
          <AnimatePresence mode="wait" custom={step}>
            {step === 0 && (
              <motion.div
                key="step1"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-2 md:space-y-2 flex flex-col"
              >
                <div className="space-y-1 md:text-center md:mb-6 shrink-0">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 rounded-full bg-perks-teal/10 border border-perks-teal/20 text-perks-teal text-xs font-bold uppercase tracking-wider mb-1 md:mb-2"
                  >
                    Step 1 of 3
                  </motion.span>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    What are you <br className="md:hidden"/>interested in?
                  </h1>
                  <p className="text-gray-500 dark:text-slate-400 text-sm md:text-lg">Select topics to personalize your feed.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-2 md:mt-8 shrink-0">
                  {INTERESTS.map((item) => {
                    const isSelected = selectedInterests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleInterest(item.id)}
                        className={`
                          relative rounded-xl md:rounded-2xl overflow-hidden text-left transition-all duration-300 flex flex-col items-center justify-center 
                          h-24 md:h-32 group w-full border
                          ${isSelected 
                            ? 'border-perks-teal ring-2 ring-perks-teal shadow-lg scale-[1.02]' 
                            : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-600 hover:scale-[1.02]'
                          }
                        `}
                      >
                        {/* Background Image */}
                        <img 
                          src={item.image} 
                          alt={item.label}
                          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} 
                        />
                        
                        {/* Overlay */}
                        <div className={`absolute inset-0 transition-colors duration-300 ${isSelected ? 'bg-perks-teal/60 mix-blend-multiply' : 'bg-black/40 group-hover:bg-black/30'}`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <span className="font-bold text-base md:text-lg text-white drop-shadow-md tracking-wide">
                            {item.label}
                          </span>
                        </div>

                        {/* Selection Check */}
                        {isSelected && (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 md:top-3 md:right-3 bg-perks-teal text-white rounded-full p-1 shadow-lg z-20"
                          >
                            <Check size={12} strokeWidth={4} className="md:w-3.5 md:h-3.5" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step2"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="space-y-2 md:text-center md:mb-8">
                   <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2"
                  >
                    Step 2 of 3
                  </motion.span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    Where are you <br className="md:hidden"/>located?
                  </h1>
                  <p className="text-gray-500 dark:text-slate-400 text-lg">Find the best deals near you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`
                        w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-200 group shadow-sm
                        ${selectedLocation === loc
                          ? 'bg-perks-teal/10 border-perks-teal ring-1 ring-perks-teal text-gray-900 dark:text-white'
                          : 'bg-white dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:text-gray-900 dark:hover:text-white'
                        }
                      `}
                    >
                      <div className={`
                        p-2.5 rounded-full transition-colors duration-300 shrink-0
                        ${selectedLocation === loc ? 'bg-perks-teal text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 group-hover:bg-gray-200 dark:group-hover:bg-slate-700 group-hover:text-gray-600 dark:group-hover:text-white'}
                      `}>
                        <MapPin size={20} />
                      </div>
                      <span className="font-bold flex-1 text-base">{loc}</span>
                      {selectedLocation === loc && (
                        <div className="bg-perks-teal rounded-full p-1 shrink-0 text-white">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step3"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="text-center space-y-6 md:space-y-8 py-4"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-tr from-perks-teal to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(80,227,194,0.3)] relative"
                >
                  <Sparkles size={48} className="text-white drop-shadow-md md:scale-125" />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 p-2.5 rounded-full shadow-lg border-4 border-gray-50 dark:border-slate-950 animate-bounce">
                    <Check size={20} strokeWidth={4} />
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">You're All Set!</h1>
                  <p className="text-gray-500 dark:text-slate-400 max-w-xs md:max-w-md mx-auto text-lg leading-relaxed">
                    We've customized your experience. Get ready to explore thousands of exclusive perks.
                  </p>
                </div>

                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 max-w-xs md:max-w-sm mx-auto border border-gray-200 dark:border-slate-800 shadow-xl">
                  <div className="text-xs text-gray-400 dark:text-slate-500 mb-4 uppercase font-bold tracking-wider flex items-center justify-center gap-2">
                    <span className="h-px w-4 bg-gray-300 dark:bg-slate-700"></span> Summary <span className="h-px w-4 bg-gray-300 dark:bg-slate-700"></span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {selectedInterests.length > 0 ? (
                      selectedInterests.slice(0, 3).map(i => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 font-medium capitalize shadow-sm">
                          {INTERESTS.find(int => int.id === i)?.label}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-slate-600 italic">No interests selected</span>
                    )}
                    {selectedInterests.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-slate-500 self-center font-medium">+{selectedInterests.length - 3} more</span>
                    )}
                  </div>
                  
                  {selectedLocation && (
                     <div className="pt-4 border-t border-gray-200 dark:border-slate-800 flex items-center justify-center gap-2 text-sm font-bold text-gray-800 dark:text-white">
                        <MapPin size={14} className="text-perks-teal" /> {selectedLocation}
                     </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons - Moved to flow after content */}
          <div className="mt-8 md:mt-12 flex items-center justify-center gap-4 shrink-0 pb-12">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <ChevronLeft size={20} /> Back
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300
                ${isNextDisabled 
                  ? 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed shadow-none' 
                  : 'bg-perks-teal hover:bg-perks-tealDark text-white shadow-[0_0_20px_rgba(80,227,194,0.2)] hover:shadow-[0_0_30px_rgba(80,227,194,0.4)] hover:scale-105 active:scale-95'
                }
              `}
            >
              {step === totalSteps - 1 ? 'Get Started' : 'Next'}
              {step !== totalSteps - 1 && <ArrowRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};