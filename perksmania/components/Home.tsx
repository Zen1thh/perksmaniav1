import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { MOCK_PERKS } from '../constants';
import { Perk, CategoryType } from '../types';
import { 
  Search, Heart, Star, ChevronRight, Sparkles, ArrowRight, ChevronLeft, Tag
} from 'lucide-react';

const HERO_CONTENT = [
  {
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=2000",
    badge: "LIMITED TIME OFFER",
    titlePrefix: "Unleash Your",
    titleHighlight: "Ultimate Perks",
    description: "Discover exclusive rewards from over 500+ premium brands. Save more on what you love."
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000",
    badge: "TASTE THE LUXURY",
    titlePrefix: "Feast Like A",
    titleHighlight: "King Today",
    description: "Experience world-class dining without the world-class price tag. Up to 50% off at top restaurants."
  },
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000",
    badge: "WANDERLUST AWAITS",
    titlePrefix: "Your Dream",
    titleHighlight: "Trip Is Here",
    description: "From pristine beaches to mountain peaks, explore the world for less with exclusive travel deals."
  },
  {
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2000",
    badge: "FUTURE READY",
    titlePrefix: "Upgrade Your",
    titleHighlight: "Digital Life",
    description: "Get your hands on the latest tech gadgets with unbeatable member-only savings."
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000",
    badge: "PREMIUM LIFESTYLE",
    titlePrefix: "Experience The",
    titleHighlight: "Extraordinary",
    description: "Turn ordinary days into unforgettable memories with our exclusive lifestyle perks and events."
  }
];

interface HomeProps {
  onPerkSelect: (perk: Perk) => void;
  savedPerkIds: string[];
  onToggleBookmark: (id: string) => void;
}

// Refined Category Data Structure with Images
const categories = [
  { id: 'all', name: 'All' as CategoryType, label: 'All Perks', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=200', gradient: 'from-gray-700 to-gray-900' },
  { id: 'rest', name: 'Restaurant' as CategoryType, label: 'Dining', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=200', gradient: 'from-orange-400 to-red-500' },
  { id: 'cloth', name: 'Clothing & Accessories' as CategoryType, label: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200', gradient: 'from-purple-500 to-indigo-600' },
  { id: 'tech', name: 'Computers & Mobile' as CategoryType, label: 'Tech', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200', gradient: 'from-blue-400 to-cyan-500' },
  { id: 'trav', name: 'Travel & Leisure' as CategoryType, label: 'Travel', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=200', gradient: 'from-sky-400 to-blue-600' },
  { id: 'ent', name: 'Entertainment & Movies' as CategoryType, label: 'Cinema', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=200', gradient: 'from-violet-500 to-fuchsia-600' },
  { id: 'auto', name: 'Automotive & Motorcycles' as CategoryType, label: 'Auto', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=200', gradient: 'from-red-500 to-rose-700' },
  { id: 'groc', name: 'Groceries' as CategoryType, label: 'Fresh', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200', gradient: 'from-green-400 to-emerald-600' },
  { id: 'baby', name: 'Babies & Kids' as CategoryType, label: 'Kids', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=200', gradient: 'from-pink-400 to-rose-400' },
  { id: 'health', name: 'Health & Beauty' as CategoryType, label: 'Wellness', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=200', gradient: 'from-rose-400 to-pink-600' },
  { id: 'serv', name: 'Services' as CategoryType, label: 'Services', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=200', gradient: 'from-slate-500 to-gray-600' },
  { id: 'sport', name: 'Sporting & Outdoor Activities' as CategoryType, label: 'Active', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200', gradient: 'from-teal-400 to-emerald-600' },
  { id: 'game', name: 'Video Games & Gaming' as CategoryType, label: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200', gradient: 'from-purple-500 to-indigo-500' },
  { id: 'elec', name: 'Electronics & Appliances' as CategoryType, label: 'Home', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200', gradient: 'from-yellow-400 to-amber-500' },
];

export const Home: React.FC<HomeProps> = ({ onPerkSelect, savedPerkIds, onToggleBookmark }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  // Refs for dragging logic
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDragging = useRef(false);

  // GSAP Animation for Categories
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".category-item",
        { opacity: 0, y: 30, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.05, 
          ease: "back.out(1.2)",
          delay: 0.2
        }
      );
    }, scrollContainerRef);
    return () => ctx.revert();
  }, []);

  // Horizontal Scroll Wheel Behavior
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        // Only hijack vertical scroll if content overflows horizontally
        if (el.scrollWidth > el.clientWidth && e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
           e.preventDefault();
           el.scrollTo({
             left: el.scrollLeft + e.deltaY,
             behavior: "smooth"
           });
        }
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollContainerRef.current;
    if(!slider) return;
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeftRef.current = slider.scrollLeft;
    
    // UX improvements
    slider.style.cursor = 'grabbing';
    slider.style.scrollBehavior = 'auto'; // Disable smooth scroll for direct 1:1 movement
    slider.style.scrollSnapType = 'none'; // Disable snap while dragging
  };

  const handleMouseLeave = () => {
    const slider = scrollContainerRef.current;
    if(!slider) return;
    isDown.current = false;
    isDragging.current = false;
    slider.style.cursor = 'grab';
    slider.style.removeProperty('scroll-behavior'); // Revert to CSS class
    slider.style.removeProperty('scroll-snap-type'); // Revert to CSS class
  };

  const handleMouseUp = () => {
    const slider = scrollContainerRef.current;
    if(!slider) return;
    isDown.current = false;
    slider.style.cursor = 'grab';
    slider.style.removeProperty('scroll-behavior');
    slider.style.removeProperty('scroll-snap-type');
    
    // Use timeout to allow click event to fire and check the flag before resetting
    setTimeout(() => {
      isDragging.current = false;
    }, 10);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const slider = scrollContainerRef.current;
    if(!slider) return;
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    slider.scrollLeft = scrollLeftRef.current - walk;
    
    // Determine if it was a drag or a click
    if (Math.abs(x - startX.current) > 5) {
      isDragging.current = true;
    }
  };

  const handleCategoryClick = (catName: CategoryType) => {
    // If we were dragging, do not select the category
    if (isDragging.current) return;
    setActiveCategory(catName);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-shuffle hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_CONTENT.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filter and Sort perks: Priority to Featured items
  const filteredPerks = useMemo(() => {
    let perks = activeCategory === 'All' 
      ? [...MOCK_PERKS] 
      : MOCK_PERKS.filter(p => p.category === activeCategory);
    
    // Sort: Featured first, then preserve original order
    return perks.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
        {/* Search Bar Mobile */}
        <div className="md:hidden">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-2xl leading-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-perks-teal/50 transition-all shadow-sm"
              placeholder="Search for perks..."
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-slate-900/50 min-h-[350px] md:min-h-[400px] flex items-center group">
          <div className="absolute inset-0 bg-gray-900">
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={currentHeroIndex}
                src={HERO_CONTENT[currentHeroIndex].image}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Hero Background"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          </div>
          
          <div className="relative z-20 px-6 md:px-16 max-w-2xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-bold mb-4 tracking-wide shadow-lg w-fit">
                  <Sparkles size={14} className="text-perks-teal" />
                  {HERO_CONTENT[currentHeroIndex].badge}
                </span>
                <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight mb-4 md:mb-6 font-sans">
                  {HERO_CONTENT[currentHeroIndex].titlePrefix} <br />
                  <span className="text-perks-teal drop-shadow-lg">{HERO_CONTENT[currentHeroIndex].titleHighlight}</span>
                </h1>
                <p className="text-gray-200 text-sm md:text-xl mb-6 md:mb-8 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {HERO_CONTENT[currentHeroIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Categories Dock */}
        <section className="relative z-10 group/slider">
          <div className="flex justify-between items-end mb-6 px-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="text-perks-teal" size={20} />
                Explore Categories
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-xs md:text-sm mt-1">Curated collections for your lifestyle</p>
            </div>
            
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex gap-2 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
               <button 
                onClick={() => scrollCategories('left')}
                className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 transition-colors"
               >
                 <ChevronLeft size={20} />
               </button>
               <button 
                onClick={() => scrollCategories('right')}
                className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 transition-colors"
               >
                 <ChevronRight size={20} />
               </button>
            </div>
          </div>
          
          <div className="relative">
             <div 
               ref={scrollContainerRef}
               onMouseDown={handleMouseDown}
               onMouseLeave={handleMouseLeave}
               onMouseUp={handleMouseUp}
               onMouseMove={handleMouseMove}
               className="flex overflow-x-auto pb-8 pt-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 space-x-3 md:space-x-6 hide-scrollbar scroll-smooth snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing"
             >
               {categories.map((cat, index) => {
                 const isActive = activeCategory === cat.name;
                 return (
                   <button
                     key={cat.id}
                     onClick={() => handleCategoryClick(cat.name)}
                     className="category-item group relative flex-shrink-0 snap-center select-none"
                   >
                     <div className={`
                       relative w-24 h-28 md:w-28 md:h-32 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-500 border-2 
                       ${isActive 
                         ? 'scale-105 border-perks-teal' 
                         : 'hover:scale-105 border-gray-200 dark:border-slate-700'
                       }
                     `}>
                       {/* Active Background - Static */}
                       {isActive && (
                         <div
                           className="absolute inset-0 bg-white dark:bg-slate-800 rounded-[1.3rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                         />
                       )}
                       
                       {/* Inactive Background (Glass) */}
                       {!isActive && (
                         <div className="absolute inset-0 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-[1.3rem] group-hover:bg-white/60 dark:group-hover:bg-slate-800/60 transition-all"></div>
                       )}
  
                       {/* Image Container */}
                       <div className={`
                         relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 flex items-center justify-center bg-gray-100 dark:bg-slate-800
                         ${isActive ? 'ring-2 ring-perks-teal ring-offset-2 ring-offset-white dark:ring-offset-slate-900' : ''}
                       `}>
                         <img 
                            src={cat.image} 
                            alt={cat.label}
                            onError={(e) => {
                              // Fallback generic image if the specific one fails
                              if (e.currentTarget.src !== 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200') {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200';
                              }
                            }}
                            className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                         />
                       </div>
  
                       {/* Label */}
                       <span className={`
                         relative z-10 text-xs font-medium transition-colors duration-300
                         ${isActive ? 'text-gray-900 dark:text-white font-bold translate-y-0' : 'text-gray-500 dark:text-slate-500 translate-y-0'}
                       `}>
                         {cat.label}
                       </span>
                     </div>
                   </button>
                 );
               })}
             </div>
          </div>
        </section>

        {/* Perks Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
             <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 md:h-8 bg-perks-teal rounded-full"></div>
               <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                 {activeCategory === 'All' ? 'Trending Perks' : activeCategory}
               </h2>
             </div>
             <button className="text-gray-500 dark:text-slate-400 hover:text-perks-teal dark:hover:text-perks-teal font-medium flex items-center gap-1 transition-colors text-sm md:text-base">
               View All <ChevronRight size={16} />
             </button>
          </div>

          <motion.div 
            key={activeCategory} // Force re-mount on category change for clean stagger
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: { transition: { staggerChildren: 0.02 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredPerks.map((perk) => (
              <PerkCard 
                key={perk.id} 
                perk={perk} 
                onClick={() => onPerkSelect(perk)}
                isBookmarked={savedPerkIds.includes(perk.id)}
                onToggleBookmark={onToggleBookmark}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 300, damping: 24 }
                  }
                }}
              />
            ))}
          </motion.div>

          {/* Coming Soon Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-12 py-12 relative rounded-[2rem] border border-dashed border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-perks-teal/5 via-transparent to-transparent opacity-50"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-5">
               <div className="relative">
                  <div className="absolute inset-0 bg-perks-teal blur-xl opacity-20 animate-pulse"></div>
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-center relative z-10">
                    <Sparkles size={32} className="text-perks-teal" strokeWidth={1.5} />
                  </div>
               </div>
               
               <div className="space-y-2 max-w-md px-4">
                 <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white font-sans">
                   More {activeCategory === 'All' ? 'Perks' : activeCategory} Coming Soon!
                 </h3>
                 <p className="text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                   We are constantly negotiating with top merchants to bring you exclusive deals. 
                   Stay tuned for new additions to our collection.
                 </p>
               </div>
            </div>
          </motion.div>
        </section>
    </motion.div>
  );
};

export const PerkCard: React.FC<{ 
  perk: Perk, 
  onClick: () => void,
  isBookmarked: boolean,
  onToggleBookmark: (id: string) => void,
  variants?: any
}> = ({ perk, onClick, isBookmarked, onToggleBookmark, variants }) => {
  const [imgSrc, setImgSrc] = useState(perk.image);
  
  useEffect(() => {
    setImgSrc(perk.image);
  }, [perk.image]);

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800');
  };

  return (
    <motion.div
      variants={variants}
      onClick={onClick}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:border-perks-teal/30 dark:hover:border-perks-teal/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full relative cursor-pointer"
    >
      {perk.isFeatured && (
        <div className="absolute top-0 right-0 z-20 left-0 h-0">
           {/* Reverting to standard featured badge if needed, but using cleaner float */}
           <div className="absolute top-0 left-0 bg-yellow-400 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl shadow-md tracking-wider">
            FEATURED
          </div>
        </div>
      )}

      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img 
          src={imgSrc} 
          alt={perk.title} 
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pt-6">
          {perk.isNew && (
            <span className="bg-perks-teal text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm w-fit">
              New Arrival
            </span>
          )}
          {perk.expiresIn && (
            <span className="bg-orange-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 w-fit">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              {perk.expiresIn} Left
            </span>
          )}
        </div>

        {/* Bookmark Button - Moved to Top Right of Image */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(perk.id);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg z-30 ${
            isBookmarked 
              ? 'bg-red-500/90 text-white' 
              : 'bg-white/30 dark:bg-black/30 text-white hover:bg-white/50'
          }`}
        >
          <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} className={isBookmarked ? "scale-110" : ""} />
        </button>

        {/* New Formal Deal Badge - Bottom Left Overlay */}
        {!perk.price && (
          <div className="absolute bottom-3 left-3 z-20">
             <div className="flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                <Sparkles size={12} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Special Offer</span>
             </div>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
           <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-snug group-hover:text-perks-teal transition-colors line-clamp-2">
             {perk.title}
           </h3>
           {perk.logo && (
             <img src={perk.logo} alt="brand" className="w-8 h-8 rounded-full border border-gray-100 dark:border-slate-700 flex-shrink-0 ml-2" />
           )}
        </div>
        
        <div className="text-sm text-gray-500 dark:text-slate-400 mb-3 font-medium flex items-center gap-1">
          <span>{perk.merchant}</span>
          {perk.rating && (
             <>
               <span className="w-1 h-1 bg-gray-300 dark:bg-slate-600 rounded-full mx-1"></span>
               <div className="flex items-center text-yellow-400">
                 <Star size={12} fill="currentColor" />
                 <span className="ml-1 text-gray-600 dark:text-slate-400">{perk.rating}</span>
               </div>
             </>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between transition-colors">
          <div className="flex flex-col">
             {perk.originalPrice && (
               <span className="text-gray-400 dark:text-slate-600 text-xs line-through decoration-red-400">₱{perk.originalPrice.toLocaleString()}</span>
             )}
             <div className="flex items-center gap-2">
                <span className="text-gray-900 dark:text-white font-bold text-lg">
                  {perk.price ? `₱${perk.price.toLocaleString()}` : perk.discount}
                </span>
             </div>
          </div>
          
          {/* New Footer Redeem Button */}
          <motion.button 
            whileHover="hover"
            className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-perks-teal hover:text-white dark:hover:bg-perks-teal dark:hover:text-white transition-colors shadow-sm"
          >
            <span>Redeem</span>
            <motion.div
              variants={{
                hover: { x: 3 }
              }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};