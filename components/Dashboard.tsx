import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Tab, Perk } from '../types';
import { 
  Bell, User, Home as HomeIcon, Store, Info, Handshake, LogIn,
  ShoppingBag, Star, ShieldCheck, Tag, TrendingUp
} from 'lucide-react';
import { Home } from './Home';
import { Merchants } from './Merchants';
import { ProgramPartners } from './ProgramPartners';
import { Affiliate } from './Affiliate';
import { Profile } from './Profile';
import { Settings } from './Settings';
import { PerkDetails } from './PerkDetails';
import { AboutUs } from './AboutUs';
import { Footer } from './Footer';
import { AuthModal } from './AuthModal';

interface DashboardProps {
  isDarkMode: boolean;
  onToggleTheme: (val: boolean) => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, onToggleTheme, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedPerk, setSelectedPerk] = useState<Perk | null>(null);
  const [savedPerkIds, setSavedPerkIds] = useState<string[]>([]);
  const [savedMerchantNames, setSavedMerchantNames] = useState<string[]>([]);
  
  // Auth State Management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // Store the tab user intended to visit before auth intercept
  const [pendingTab, setPendingTab] = useState<Tab | null>(null);

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Mock Notifications
  const notifications = [
    { id: 1, title: 'Flash Sale Alert!', message: '50% off at Nike for the next 2 hours.', time: 'Just now', unread: true, icon: Tag, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { id: 2, title: 'Points Received', message: 'You earned 500 points from Starbucks.', time: '2h ago', unread: true, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { id: 3, title: 'New Merchant', message: 'Apple is now a partner. Check out the deals.', time: '1d ago', unread: false, icon: Store, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 4, title: 'Security Update', message: 'Password updated successfully.', time: '2d ago', unread: false, icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
  
  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Click outside handler for notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleBookmark = (id: string) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setSavedPerkIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const toggleMerchantBookmark = (name: string) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setSavedMerchantNames(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleTabChange = (tab: Tab) => {
    if ((tab === 'profile' || tab === 'affiliate') && !isLoggedIn) {
      setPendingTab(tab);
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
    setSelectedPerk(null);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    
    // Navigate to the pending tab if one exists
    if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
      setSelectedPerk(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col font-sans pb-24 md:pb-0 transition-colors duration-500"
    >
      
      {/* --- Header --- */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20 gap-4">
            
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => {
                setActiveTab('home');
                setSelectedPerk(null);
              }}
            >
              <Logo className="scale-75 md:scale-90 origin-left" />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
              {[
                { id: 'home', label: 'Home', icon: HomeIcon },
                { id: 'merchants', label: 'Merchants', icon: Store },
                { id: 'partners', label: 'Partners', icon: Handshake },
                { id: 'affiliate', label: 'Affiliate', icon: TrendingUp },
                { id: 'about', label: 'About Us', icon: Info },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id as Tab)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    activeTab === item.id 
                      ? 'bg-perks-teal/10 dark:bg-perks-teal/20 text-perks-teal font-bold' 
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3 md:space-x-6 relative" ref={notificationRef}>
              {/* Notification Bell */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors hidden sm:block outline-none"
              >
                <Bell size={24} className={`text-gray-600 dark:text-slate-400 transition-colors ${showNotifications ? 'text-perks-teal' : 'group-hover:text-perks-teal'}`} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-perks-accent rounded-full border border-white dark:border-slate-900 ring-2 ring-white dark:ring-slate-900"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50 origin-top-right ring-1 ring-black/5"
                  >
                      <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                          {unreadCount > 0 && <span className="bg-perks-teal text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">{unreadCount} New</span>}
                        </div>
                        <button className="text-xs font-bold text-gray-500 hover:text-perks-teal transition-colors">Mark all as read</button>
                      </div>
                      
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div key={n.id} className={`p-4 border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group flex gap-4 ${n.unread ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}`}>
                               <div className={`w-10 h-10 rounded-full ${n.bg} ${n.color} flex items-center justify-center shrink-0`}>
                                  <n.icon size={18} />
                               </div>
                               <div className="flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm ${n.unread ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-slate-300'}`}>{n.title}</h4>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{n.time}</span>
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-snug line-clamp-2">{n.message}</p>
                               </div>
                               {n.unread && <div className="w-2 h-2 rounded-full bg-perks-teal mt-1.5 shrink-0"></div>}
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400">
                            <Bell size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No new notifications</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3 text-center bg-gray-50/50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                         <button className="text-xs font-bold text-gray-600 dark:text-slate-400 hover:text-perks-teal transition-colors flex items-center justify-center gap-1 w-full py-1">
                            View All Activity
                         </button>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Auth / Profile Button */}
              {isLoggedIn ? (
                <motion.div 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabChange('profile')}
                  className={`flex items-center gap-3 cursor-pointer p-1 pr-4 rounded-full transition-all border ${
                    activeTab === 'profile' 
                      ? 'bg-perks-teal/10 dark:bg-perks-teal/20 border-perks-teal/20' 
                      : 'border-transparent hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-perks-teal to-perks-tealDark text-white flex items-center justify-center font-bold shadow-lg shadow-perks-teal/20">
                    P
                  </div>
                  <div className="hidden lg:flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Welcome back,</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">Zen1th</span>
                  </div>
                </motion.div>
              ) : (
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setShowAuthModal(true)}
                   className="bg-perks-teal hover:bg-perks-tealDark text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-perks-teal/20 hover:shadow-xl hover:shadow-perks-teal/30 transition-all flex items-center gap-2 group"
                 >
                   <User size={18} className="group-hover:fill-current" />
                   <span>Sign In</span>
                 </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!selectedPerk && activeTab === 'home' && (
            <Home 
              key="home" 
              onPerkSelect={setSelectedPerk} 
              savedPerkIds={savedPerkIds}
              onToggleBookmark={toggleBookmark}
            />
          )}
          {!selectedPerk && activeTab === 'merchants' && (
            <Merchants 
              key="merchants" 
              onPerkSelect={setSelectedPerk} 
              savedMerchantNames={savedMerchantNames}
              onToggleMerchantBookmark={toggleMerchantBookmark}
              savedPerkIds={savedPerkIds}
              onToggleBookmark={toggleBookmark}
            />
          )}
          {!selectedPerk && activeTab === 'partners' && (
            <ProgramPartners key="partners" />
          )}
          {!selectedPerk && activeTab === 'affiliate' && isLoggedIn && (
            <Affiliate key="affiliate" />
          )}
          {!selectedPerk && activeTab === 'about' && (
            <AboutUs key="about" />
          )}
          {!selectedPerk && activeTab === 'profile' && isLoggedIn && (
            <Profile 
              key="profile" 
              onNavigate={setActiveTab} 
              savedPerkIds={savedPerkIds}
              onToggleBookmark={toggleBookmark}
              onPerkSelect={setSelectedPerk}
              savedMerchantNames={savedMerchantNames}
              onToggleMerchantBookmark={toggleMerchantBookmark}
              onLogout={handleLogout}
            />
          )}
          {!selectedPerk && activeTab === 'settings' && (
            <Settings 
              key="settings" 
              onBack={() => setActiveTab('profile')} 
              isDarkMode={isDarkMode}
              onToggleTheme={onToggleTheme}
            />
          )}
        </AnimatePresence>
      </main>

      {/* --- Footer (Visible on all tabs except when detail view is active) --- */}
      {!selectedPerk && <Footer />}

      {/* --- Detail View Overlay --- */}
      <AnimatePresence>
        {selectedPerk && (
          <PerkDetails 
            key="details" 
            perk={selectedPerk} 
            onBack={() => setSelectedPerk(null)} 
            isBookmarked={savedPerkIds.includes(selectedPerk.id)}
            onToggleBookmark={toggleBookmark}
            isLoggedIn={isLoggedIn}
            onShowAuth={() => setShowAuthModal(true)}
          />
        )}
      </AnimatePresence>

      {/* --- Auth Modal --- */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => {
              setShowAuthModal(false);
              setPendingTab(null);
            }} 
            onLoginSuccess={handleAuthSuccess}
          />
        )}
      </AnimatePresence>

      {/* --- Mobile Floating Navigation Dock --- */}
      {!selectedPerk && (
        <div className={`md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-sm transition-transform duration-300 ${activeTab === 'settings' ? 'translate-y-[150%]' : ''}`}>
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200 dark:border-slate-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-full p-2 flex justify-between items-center px-2 transition-colors duration-500">
            {[
              { id: 'home', icon: HomeIcon, label: 'Home' },
              { id: 'merchants', icon: Store, label: 'Shops' },
              { id: 'partners', icon: Handshake, label: 'Partners' },
              { id: 'affiliate', icon: TrendingUp, label: 'Affiliate' },
              { id: 'about', icon: Info, label: 'About' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id as Tab)}
                className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full"
              >
                <div className={`transition-all duration-300 ${activeTab === item.id ? '-translate-y-1' : ''}`}>
                  <item.icon 
                    size={20} 
                    className={`transition-colors duration-300 ${activeTab === item.id ? 'text-perks-teal' : 'text-gray-400 dark:text-slate-500'}`}
                    strokeWidth={activeTab === item.id ? 2.5 : 2}
                  />
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-perks-teal rounded-full shadow-[0_0_8px_rgba(80,227,194,0.8)]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`text-[9px] mt-0.5 font-medium transition-all duration-300 ${activeTab === item.id ? 'text-perks-teal opacity-100' : 'text-gray-400 dark:text-slate-500 opacity-80'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
};