import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Star, MapPin, Tag, ChevronRight, Store, Heart, 
  Filter, X, ArrowDownAZ, ArrowUpAZ, SlidersHorizontal, ArrowLeft, Clock, CheckCircle2, Globe
} from 'lucide-react';
import { MOCK_PERKS } from '../constants';
import { Perk, CategoryType } from '../types';
import { PerkCard } from './Home';

// Placeholder image in case source fails
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800';
// Generic logo fallback
const FALLBACK_LOGO = 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200&h=200';

interface MerchantsProps {
  onPerkSelect: (perk: Perk) => void;
  savedMerchantNames: string[];
  onToggleMerchantBookmark: (name: string) => void;
  savedPerkIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const MerchantCard: React.FC<{ 
  merchant: Perk, 
  variants?: any, 
  onClick: () => void,
  isBookmarked: boolean,
  onToggleBookmark: (name: string) => void
}> = ({ merchant, variants, onClick, isBookmarked, onToggleBookmark }) => {
  const [imgSrc, setImgSrc] = useState(merchant.image);
  const [logoSrc, setLogoSrc] = useState(merchant.logo || FALLBACK_LOGO);

  React.useEffect(() => {
    setImgSrc(merchant.image);
    setLogoSrc(merchant.logo || FALLBACK_LOGO);
  }, [merchant]);

  return (
    <motion.div 
      layout
      variants={variants}
      onClick={onClick}
      className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-perks-teal/5 dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer relative"
    >
      {/* Cover Image Section */}
      <div className="h-40 relative overflow-hidden bg-gray-200 dark:bg-slate-800">
        <img 
          src={imgSrc} 
          alt={merchant.merchant} 
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
           <span className="bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-sm">
             <Tag size={10} /> {merchant.category.split(' ')[0]}
           </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(merchant.merchant);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-sm z-20 ${
            isBookmarked
              ? 'bg-red-500/90 text-white'
              : 'bg-black/30 text-white hover:bg-black/50'
          }`}
        >
          <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Logo and Content */}
      <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col">
         {/* Logo Overlap */}
         <div className="relative -mt-10 mb-3 flex justify-between items-end">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 p-1.5 shadow-lg border border-gray-50 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={logoSrc} 
                alt={`${merchant.merchant} logo`}
                onError={() => setLogoSrc(FALLBACK_LOGO)}
                className="w-full h-full object-cover rounded-full bg-gray-50 dark:bg-slate-900" 
              />
            </div>
            
            {/* Rating Badge */}
            {merchant.rating && (
               <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-yellow-100 dark:border-yellow-900/30 mb-1">
                  <Star size={12} fill="currentColor" /> {merchant.rating}
               </div>
            )}
         </div>

         <div className="mb-4">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-perks-teal transition-colors">
              {merchant.merchant}
            </h3>
            
            {merchant.location && (
              <div className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 text-xs font-medium">
                <MapPin size={12} className="text-perks-teal" />
                <span>{merchant.location}</span>
              </div>
            )}
         </div>

         <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800">
            <button className="w-full py-3 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold text-sm hover:bg-perks-teal hover:text-white dark:hover:bg-perks-teal dark:hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
              Visit Store 
              <ChevronRight size={16} className="text-gray-400 group-hover/btn:text-white transition-colors" />
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export const Merchants: React.FC<MerchantsProps> = ({ 
  onPerkSelect, 
  savedMerchantNames, 
  onToggleMerchantBookmark,
  savedPerkIds,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc' | 'rating_desc'>('name_asc');
  
  // State to track if we are viewing a specific merchant's storefront
  const [viewingMerchantName, setViewingMerchantName] = useState<string | null>(null);

  // Extract unique merchants base list
  const baseMerchants = useMemo(() => {
    return Array.from(new Set(MOCK_PERKS.map(p => p.merchant)))
      .map(name => MOCK_PERKS.find(p => p.merchant === name))
      .filter((m): m is Perk => !!m);
  }, []);

  // Extract available categories dynamically
  const availableCategories = useMemo(() => {
    const cats = new Set<CategoryType>(['All']);
    baseMerchants.forEach(m => cats.add(m.category));
    return Array.from(cats).sort();
  }, [baseMerchants]);

  // Filter and Sort Logic
  const filteredMerchants = useMemo(() => {
    let result = [...baseMerchants];

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.merchant.toLowerCase().includes(query) || 
        m.category.toLowerCase().includes(query)
      );
    }

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(m => m.category === activeCategory);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name_desc':
          return b.merchant.localeCompare(a.merchant);
        case 'rating_desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'name_asc':
        default:
          return a.merchant.localeCompare(b.merchant);
      }
    });

    return result;
  }, [baseMerchants, searchQuery, activeCategory, sortBy]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSortBy('name_asc');
  };

  const activeFilterCount = (activeCategory !== 'All' ? 1 : 0) + (sortBy !== 'name_asc' ? 1 : 0) + (searchQuery ? 1 : 0);

  // --- MERCHANT STOREFRONT VIEW ---
  if (viewingMerchantName) {
    const merchantPerks = MOCK_PERKS.filter(p => p.merchant === viewingMerchantName);
    const merchantInfo = merchantPerks[0]; // Use the first perk as reference for merchant details
    const isBookmarked = savedMerchantNames.includes(viewingMerchantName);

    if (!merchantInfo) return null; // Should not happen

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8 pb-20"
      >
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setViewingMerchantName(null)}
            className="p-3 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full border border-gray-100 dark:border-slate-800 shadow-sm transition-colors text-gray-600 dark:text-slate-300"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Merchant Profile</h2>
        </div>

        {/* Merchant Hero Profile */}
        <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
           {/* Cover Image */}
           <div className="h-64 md:h-80 w-full relative">
              <img 
                src={merchantInfo.image} 
                alt="Cover" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              
              {/* Category Badge on Cover */}
              <div className="absolute top-6 left-6">
                <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {merchantInfo.category}
                </span>
              </div>
           </div>

           {/* Profile Content */}
           <div className="relative px-8 pb-8 -mt-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                 
                 {/* Logo & Name */}
                 <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                    <div className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-900 p-2 shadow-2xl border-4 border-white dark:border-slate-800">
                       <img 
                         src={merchantInfo.logo || FALLBACK_LOGO} 
                         alt="Logo" 
                         className="w-full h-full object-cover rounded-[1.5rem]" 
                         onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
                       />
                    </div>
                    
                    <div className="mb-2">
                       <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 drop-shadow-md">
                         {merchantInfo.merchant}
                       </h1>
                       
                       <div className="flex flex-wrap gap-4 text-sm font-medium text-white/90">
                          {merchantInfo.location && (
                            <div className="flex items-center gap-1.5">
                               <MapPin size={16} className="text-perks-teal" />
                               <span>{merchantInfo.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                             <Star size={16} className="text-yellow-400 fill-yellow-400" />
                             <span>{merchantInfo.rating || '4.5'} Rating</span>
                          </div>
                          {merchantInfo.operatingHours && (
                            <div className="flex items-center gap-1.5">
                               <Clock size={16} className="text-blue-400" />
                               <span>{merchantInfo.operatingHours}</span>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button 
                      onClick={() => onToggleMerchantBookmark(merchantInfo.merchant)}
                      className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                        isBookmarked 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
                      {isBookmarked ? 'Following' : 'Follow'}
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold hover:bg-white/30 transition-all shadow-lg flex items-center justify-center gap-2">
                       <Globe size={18} /> Website
                    </button>
                 </div>
              </div>

              {/* Description / About */}
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About {merchantInfo.merchant}</h3>
                 <p className="text-gray-500 dark:text-slate-400 leading-relaxed max-w-4xl">
                   Experience the best of {merchantInfo.category} with {merchantInfo.merchant}. We are committed to providing exceptional quality and service to our valued customers. Browse our exclusive perks below and enjoy premium rewards.
                 </p>
              </div>
           </div>
        </div>

        {/* Available Perks Grid */}
        <div>
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Tag className="text-perks-teal" /> Available Perks ({merchantPerks.length})
              </h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {merchantPerks.map((perk) => (
                 <PerkCard 
                   key={perk.id} 
                   perk={perk} 
                   onClick={() => onPerkSelect(perk)}
                   isBookmarked={savedPerkIds.includes(perk.id)}
                   onToggleBookmark={onToggleBookmark}
                   variants={{
                     hidden: { opacity: 0, y: 20 },
                     visible: { opacity: 1, y: 0 }
                   }}
                 />
              ))}
           </div>
        </div>
      </motion.div>
    );
  }

  // --- DEFAULT LIST VIEW ---
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, x: -20 }}
      variants={container}
      className="space-y-6 pb-20"
    >
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-500 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-perks-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Merchant Partners</h1>
               <p className="text-gray-500 dark:text-slate-400 max-w-xl">
                 Explore premium brands offering exclusive deals.
               </p>
            </div>
          </div>
          
          <div className="flex gap-3">
             <div className="relative w-full group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-perks-teal">
                   <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                </div>
                <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search specific brands, stores, or services..." 
                 className="w-full pl-14 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-perks-teal/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 transition-all shadow-sm focus:bg-white dark:focus:bg-slate-900" 
                />
                {searchQuery && (
                   <button 
                     onClick={() => setSearchQuery('')}
                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
                   >
                     <X size={16} />
                   </button>
                )}
             </div>

             <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 relative ${
                  isFilterOpen || activeFilterCount > 0
                    ? 'bg-perks-teal text-white border-perks-teal shadow-lg shadow-perks-teal/20' 
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
               }`}
             >
               {isFilterOpen ? <X size={24} /> : <SlidersHorizontal size={24} />}
               {!isFilterOpen && activeFilterCount > 0 && (
                 <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                   {activeFilterCount}
                 </span>
               )}
             </button>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
               <div className="pt-6 mt-6 border-t border-gray-100 dark:border-slate-800">
                   <div className="flex flex-col gap-6">
                      {/* Sort Options */}
                      <div className="space-y-3">
                         <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                           <Filter size={12} /> Sort By
                         </span>
                         <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'name_asc', label: 'Name (A-Z)', icon: ArrowDownAZ },
                              { id: 'name_desc', label: 'Name (Z-A)', icon: ArrowUpAZ },
                              { id: 'rating_desc', label: 'Highest Rated', icon: Star },
                            ].map((opt) => (
                               <button
                                 key={opt.id}
                                 onClick={() => setSortBy(opt.id as any)}
                                 className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${
                                   sortBy === opt.id 
                                     ? 'bg-perks-teal/10 border-perks-teal text-perks-teal' 
                                     : 'bg-gray-50 dark:bg-slate-800 border-transparent hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400'
                                 }`}
                               >
                                  <opt.icon size={16} /> {opt.label}
                               </button>
                            ))}
                         </div>
                      </div>

                      {/* Category Filter */}
                      <div className="space-y-3">
                         <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                           <Tag size={12} /> Categories
                         </span>
                         <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {availableCategories.map(cat => (
                               <button
                                  key={cat}
                                  onClick={() => setActiveCategory(cat)}
                                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                     activeCategory === cat
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                                        : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                                  }`}
                               >
                                  {cat}
                               </button>
                            ))}
                         </div>
                      </div>

                      {/* Filter Actions */}
                      <div className="flex justify-between items-center pt-2">
                          <span className="text-xs text-gray-400">
                            Showing {filteredMerchants.length} results
                          </span>
                          {activeFilterCount > 0 && (
                            <button 
                              onClick={clearFilters}
                              className="text-sm text-red-500 font-bold hover:underline"
                            >
                              Clear All Filters
                            </button>
                          )}
                      </div>
                   </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Grid */}
      {filteredMerchants.length > 0 ? (
        <motion.div 
           layout
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredMerchants.map((merchant) => (
              <MerchantCard 
                key={merchant.id} 
                merchant={merchant} 
                variants={item} 
                onClick={() => setViewingMerchantName(merchant.merchant)} 
                isBookmarked={savedMerchantNames.includes(merchant.merchant)}
                onToggleBookmark={onToggleMerchantBookmark}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-300 dark:text-slate-600 mb-4">
              <Store size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No merchants found</h3>
            <p className="text-gray-500 dark:text-slate-400 max-w-xs mx-auto mb-6">
              We couldn't find any merchants matching your criteria. Try adjusting your filters.
            </p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 bg-perks-teal text-white rounded-xl font-bold shadow-lg shadow-perks-teal/20 hover:bg-perks-tealDark transition-all"
            >
              Clear Filters
            </button>
        </div>
      )}
    </motion.div>
  );
};