import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
  ArrowLeft, MapPin, Star, Share2, Heart, ShieldCheck, 
  Clock, Info, ChevronRight, CheckCircle2, Calendar,
  AlertCircle, X
} from 'lucide-react';
import { Perk, Review } from '../types';
import { MOCK_REVIEWS, DEFAULT_TERMS, DEFAULT_DESCRIPTION } from '../constants';

interface PerkDetailsProps {
  perk: Perk;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isLoggedIn: boolean;
  onShowAuth: () => void;
}

const TabButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all duration-300 relative
      ${active 
        ? 'text-gray-900 dark:text-white bg-white dark:bg-slate-800 shadow-sm' 
        : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
      }
    `}
  >
    {label}
    {active && (
      <motion.div 
        layoutId="activeTabDetails"
        className="absolute inset-0 rounded-xl ring-1 ring-black/5 dark:ring-white/10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </button>
);

export const PerkDetails: React.FC<PerkDetailsProps> = ({ perk, onBack, isBookmarked, onToggleBookmark, isLoggedIn, onShowAuth }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'terms'>('details');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(perk.image);
  
  // Memoize data to prevent changing on re-renders if undefined
  const reviews = React.useMemo(() => perk.reviews || MOCK_REVIEWS, [perk.reviews]);
  const description = perk.description || DEFAULT_DESCRIPTION;
  const terms = perk.terms || DEFAULT_TERMS;

  useEffect(() => {
    // GSAP Stagger Animation for content
    const ctx = gsap.context(() => {
      gsap.from(".gsap-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]); // Re-run when tab changes to animate new content

  // Watch for login success if we were waiting for auth
  useEffect(() => {
    if (isLoggedIn && waitingForAuth) {
        setWaitingForAuth(false);
        setShowConfirm(true);
    }
  }, [isLoggedIn, waitingForAuth]);

  const handleRedeemClick = () => {
    if (!isLoggedIn) {
        setWaitingForAuth(true);
        onShowAuth();
        return;
    }
    setShowConfirm(true);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%', transition: { ease: 'easeInOut', duration: 0.3 } }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-gray-50 dark:bg-slate-950 overflow-y-auto overflow-x-hidden hide-scrollbar"
      ref={containerRef}
    >
      {/* Hero Section */}
      <div className="relative h-72 md:h-96 w-full">
        <img 
          src={imgSrc} 
          alt={perk.title}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-gray-50 dark:to-slate-950"></div>
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-10">
          <button 
            onClick={onBack}
            className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-all border border-white/20 shadow-lg"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-3">
             <button 
               onClick={() => onToggleBookmark(perk.id)}
               className={`p-3 backdrop-blur-md rounded-full transition-all border border-white/20 shadow-lg ${isBookmarked ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/20 text-white hover:bg-white/40'}`}
             >
               <Heart size={24} fill={isBookmarked ? "currentColor" : "none"} />
             </button>
             <button className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-all border border-white/20 shadow-lg">
               <Share2 size={24} />
             </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative -mt-10 px-4 md:px-8 pb-32 max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 dark:border-slate-800 mb-8 gsap-reveal">
           {/* Header Info */}
           <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-3">
                    {perk.logo ? (
                      <img src={perk.logo} alt="merchant" className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-perks-teal/20 flex items-center justify-center">
                        <ShieldCheck size={20} className="text-perks-teal" />
                      </div>
                    )}
                    <span className="font-bold text-gray-700 dark:text-slate-200">{perk.merchant}</span>
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full"></span>
                    <div className="flex items-center text-yellow-500 text-sm font-bold gap-1">
                       <Star size={14} fill="currentColor" /> {perk.rating || 4.5}
                    </div>
                 </div>
                 <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                    {perk.title}
                 </h1>
                 {perk.location && (
                   <div className="flex items-center text-gray-500 dark:text-slate-400 gap-1.5 text-sm">
                      <MapPin size={16} /> {perk.location}
                   </div>
                 )}
              </div>

              {/* Price Block */}
              <div className="flex flex-col items-start md:items-end p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 min-w-[140px]">
                 {perk.originalPrice && (
                    <span className="text-gray-400 dark:text-slate-500 line-through text-sm">₱{perk.originalPrice.toLocaleString()}</span>
                 )}
                 <span className="text-3xl font-bold text-perks-teal">
                    {perk.price ? `₱${perk.price.toLocaleString()}` : perk.discount}
                 </span>
                 <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded mt-1">
                    Verified Deal
                 </span>
              </div>
           </div>

           {/* Tabs */}
           <div className="flex bg-gray-100 dark:bg-slate-950/50 p-1.5 rounded-2xl mb-8">
              <TabButton active={activeTab === 'details'} onClick={() => setActiveTab('details')} label="Details" />
              <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} label="Reviews" />
              <TabButton active={activeTab === 'terms'} onClick={() => setActiveTab('terms')} label="Terms" />
           </div>

           {/* Tab Content */}
           <div className="min-h-[200px]">
             <AnimatePresence mode="wait">
               {activeTab === 'details' && (
                 <motion.div 
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                 >
                    <div className="gsap-reveal text-gray-600 dark:text-slate-300 leading-relaxed text-lg">
                       {description}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                       <div className="gsap-reveal p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20">
                          <Calendar className="text-orange-500 mb-2" size={24} />
                          <div className="text-xs text-orange-600/70 dark:text-orange-400/70 font-bold uppercase">Expires In</div>
                          <div className="font-bold text-gray-900 dark:text-white">{perk.expiresIn || '30 Days'}</div>
                       </div>
                       
                       <div className="gsap-reveal p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                          <Info className="text-blue-500 mb-2" size={24} />
                          <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-bold uppercase">Usage</div>
                          <div className="font-bold text-gray-900 dark:text-white">One-time Use</div>
                       </div>

                       <div className="gsap-reveal p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 col-span-2 md:col-span-1">
                          <Clock className="text-purple-500 mb-2" size={24} />
                          <div className="text-xs text-purple-600/70 dark:text-purple-400/70 font-bold uppercase">Operating Hours</div>
                          <div className="font-bold text-gray-900 dark:text-white">{perk.operatingHours || '10:00 AM - 9:00 PM'}</div>
                       </div>
                    </div>
                 </motion.div>
               )}

               {activeTab === 'reviews' && (
                 <motion.div 
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                 >
                    {reviews.map((review, i) => (
                       <div key={review.id} className="gsap-reveal p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-perks-teal to-blue-500 text-white flex items-center justify-center text-xs font-bold">
                                   {review.userName.charAt(0)}
                                </div>
                                <div>
                                   <div className="font-bold text-sm text-gray-900 dark:text-white">{review.userName}</div>
                                   <div className="text-xs text-gray-400">{review.date}</div>
                                </div>
                             </div>
                             <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, stars) => (
                                   <Star key={stars} size={12} fill={stars < review.rating ? "currentColor" : "none"} className={stars < review.rating ? "" : "text-gray-300 dark:text-slate-700"} />
                                ))}
                             </div>
                          </div>
                          <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">"{review.comment}"</p>
                       </div>
                    ))}
                 </motion.div>
               )}

               {activeTab === 'terms' && (
                 <motion.div 
                    key="terms"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                 >
                    <ul className="space-y-3">
                       {terms.map((term, i) => (
                          <li key={i} className="gsap-reveal flex items-start gap-3 text-gray-600 dark:text-slate-300 text-sm">
                             <CheckCircle2 size={18} className="text-perks-teal shrink-0 mt-0.5" />
                             <span>{term}</span>
                          </li>
                       ))}
                    </ul>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-1 shadow-lg border border-gray-100 dark:border-slate-800 gsap-reveal overflow-hidden h-48 relative group cursor-pointer">
           <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover rounded-[1.8rem] opacity-70 group-hover:opacity-100 transition-opacity duration-500" alt="Map" />
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-bold py-2 px-6 rounded-full shadow-lg flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                 <MapPin size={18} className="text-perks-teal" /> View on Map
              </button>
           </div>
        </div>

      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-slate-800 z-50">
         <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden md:flex flex-col">
               <span className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Total Price</span>
               <span className="text-2xl font-bold text-gray-900 dark:text-white">
                 {perk.price ? `₱${perk.price.toLocaleString()}` : 'Free'}
               </span>
            </div>
            <button 
              onClick={handleRedeemClick}
              className="flex-1 bg-perks-teal hover:bg-perks-tealDark text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-perks-teal/25 transform transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
            >
               Redeem Now <ChevronRight size={20} />
            </button>
         </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden"
            >
               {/* Close Button */}
               <div className="absolute top-0 right-0 p-4">
                  <button onClick={() => setShowConfirm(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-400">
                    <X size={20} />
                  </button>
               </div>

               <div className="flex flex-col items-center text-center gap-4 pt-2">
                  <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 mb-2">
                     <AlertCircle size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Redemption?</h3>
                  
                  <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                    You are about to redeem <span className="font-bold text-gray-900 dark:text-white">{perk.title}</span>.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl p-4 w-full">
                     <div className="flex items-start gap-3 text-left">
                        <Clock className="text-blue-500 shrink-0 mt-0.5" size={18} />
                        <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">
                           This action will generate a unique QR code that expires in <span className="font-bold">10 minutes</span>. Please ensure you are at the counter.
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full mt-2">
                     <button 
                       onClick={() => setShowConfirm(false)}
                       className="py-3 px-4 rounded-xl font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                     >
                       Cancel
                     </button>
                     <button 
                       onClick={() => {
                         setShowConfirm(false);
                         setShowQrModal(true);
                       }}
                       className="py-3 px-4 rounded-xl font-bold bg-perks-teal hover:bg-perks-tealDark text-white transition-colors shadow-lg shadow-perks-teal/20"
                     >
                       Confirm
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR Code Success Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden text-center"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Close Button */}
               <div className="absolute top-4 right-4 z-10">
                  <button onClick={() => setShowQrModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-400">
                    <X size={20} />
                  </button>
               </div>

               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 mt-2 px-4 leading-tight">
                  Scan this QR Code to redeem this perk
               </h3>

               <div className="relative w-56 h-56 mx-auto mb-6">
                   {/* QR Code Container */}
                   <div className="w-full h-full bg-white p-2 rounded-xl border-2 border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Redeem-${perk.id}-${Date.now()}&color=000000&bgcolor=ffffff`} alt="QR Code" className="w-full h-full object-contain" />
                   </div>
                   {/* Center Logo Overlay */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-lg p-1 shadow-md border border-gray-100 flex items-center justify-center">
                        <div className="w-full h-full bg-[#3C50E0] rounded-md flex items-center justify-center">
                            <span className="font-logo text-white font-bold text-lg leading-none pt-1">P</span>
                        </div>
                   </div>
               </div>

               <p className="text-gray-500 dark:text-slate-400 font-medium mb-6">
                  Expires in <span className="font-bold text-gray-900 dark:text-white">19:57</span>
               </p>

               <div className="w-full h-px bg-gray-100 dark:bg-slate-800 mb-6"></div>

               <div className="text-xs text-gray-400 dark:text-slate-500">
                  <p>Having trouble with the QR code?</p>
                  <button className="text-gray-600 dark:text-slate-300 font-bold hover:underline mt-1">Use this option to redeem.</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};