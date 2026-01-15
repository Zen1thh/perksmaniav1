import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Star, User, CreditCard, ShieldCheck, HelpCircle, LogOut, ChevronRight, Heart, ArrowLeft, Store, Plus, Key, Lock, Smartphone, Mail, Edit2 } from 'lucide-react';
import { Tab, Perk } from '../types';
import { MOCK_PERKS } from '../constants';
import { PerkCard } from './Home';
import { MerchantCard } from './Merchants';

interface ProfileProps {
  onNavigate: (tab: Tab) => void;
  savedPerkIds: string[];
  onToggleBookmark: (id: string) => void;
  onPerkSelect: (perk: Perk) => void;
  savedMerchantNames: string[];
  onToggleMerchantBookmark: (name: string) => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
  onNavigate, 
  savedPerkIds, 
  onToggleBookmark, 
  onPerkSelect,
  savedMerchantNames,
  onToggleMerchantBookmark,
  onLogout
}) => {
  const [view, setView] = useState<'main' | 'bookmarks' | 'account' | 'payment' | 'security' | 'help'>('main');

  const savedPerks = MOCK_PERKS.filter(p => savedPerkIds.includes(p.id));
  
  // Extract all unique merchants object to find the saved ones
  const allMerchants = Array.from(new Set(MOCK_PERKS.map(p => p.merchant))).map(name => {
    return MOCK_PERKS.find(p => p.merchant === name);
  }).filter((m): m is Perk => !!m);

  const savedMerchants = allMerchants.filter(m => savedMerchantNames.includes(m.merchant));

  const totalSavedItems = savedPerks.length + savedMerchants.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {view === 'main' ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Profile Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-500">
              {/* Background blobs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-perks-teal/10 dark:bg-perks-teal/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h2>
                  <button 
                    onClick={() => onNavigate('settings')}
                    className="p-3 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-600 dark:text-slate-400 hover:text-perks-teal transition-all shadow-sm"
                  >
                    <SettingsIcon size={24} />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-perks-teal to-blue-500 p-1 shadow-lg">
                      <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-4xl font-bold text-gray-800 dark:text-white transition-colors">
                        P
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-yellow-400 text-white p-2 rounded-full border-4 border-white dark:border-slate-900 shadow-sm">
                      <Star size={16} fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Zen1th</h3>
                    <p className="text-gray-500 dark:text-slate-400 font-medium mb-4">Gold Member • Since 2023</p>
                    
                    <div className="flex gap-4 justify-center md:justify-start">
                       <button 
                         onClick={() => setView('bookmarks')}
                         className="bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 px-5 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 transition-all text-left group"
                       >
                          <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1 group-hover:text-perks-teal">Saved</div>
                          <div className="text-xl font-bold text-perks-teal flex items-center gap-1">
                             <Heart size={16} fill="currentColor" /> {totalSavedItems}
                          </div>
                       </button>
                       <div className="bg-gray-50 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">
                          <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">PerksPoints</div>
                          <div className="text-xl font-bold text-yellow-500">24,500</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-500">
              <button 
                onClick={() => setView('bookmarks')}
                className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border-b border-gray-50 dark:border-slate-800 text-left"
              >
                 <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 transition-colors">
                   <Heart size={24} />
                 </div>
                 <div className="flex-1">
                   <div className="font-bold text-gray-900 dark:text-white">My Bookmarks</div>
                   <div className="text-sm text-gray-500 dark:text-slate-400">{totalSavedItems} items saved</div>
                 </div>
                 <ChevronRight size={20} className="text-gray-300 dark:text-slate-600" />
              </button>

              {[
                { icon: User, label: 'Account Information', desc: 'Manage your personal details', id: 'account' },
                { icon: CreditCard, label: 'Payment Methods', desc: 'Add or remove cards', id: 'payment' },
                { icon: ShieldCheck, label: 'Security & Privacy', desc: 'Change password and 2FA', id: 'security' },
                { icon: HelpCircle, label: 'Help & Support', desc: 'Get help with your orders', id: 'help' },
              ].map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => item.id !== 'help' && setView(item.id as any)}
                  className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border-b border-gray-50 dark:border-slate-800 last:border-0 text-left"
                >
                   <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-400 transition-colors">
                     <item.icon size={24} />
                   </div>
                   <div className="flex-1">
                     <div className="font-bold text-gray-900 dark:text-white">{item.label}</div>
                     <div className="text-sm text-gray-500 dark:text-slate-400">{item.desc}</div>
                   </div>
                   <ChevronRight size={20} className="text-gray-300 dark:text-slate-600" />
                </button>
              ))}
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-4 p-6 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left group"
              >
                   <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                     <LogOut size={24} />
                   </div>
                   <div className="flex-1">
                     <div className="font-bold text-red-500">Log Out</div>
                     <div className="text-sm text-red-300 dark:text-red-400">Sign out of your account</div>
                   </div>
                </button>
            </div>
          </motion.div>
        ) : view === 'account' ? (
          <motion.div
            key="account"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
             <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Information</h2>
             </div>

             <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">
                <div className="flex justify-center mb-6 relative">
                   <div className="w-24 h-24 rounded-full bg-gradient-to-br from-perks-teal to-blue-500 p-1">
                      <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">P</div>
                   </div>
                   <button className="absolute bottom-0 right-[calc(50%-2.5rem)] bg-gray-900 dark:bg-white text-white dark:text-slate-900 p-2 rounded-full shadow-lg border border-white dark:border-slate-900">
                     <Edit2 size={14} />
                   </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Full Name</label>
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" defaultValue="Zen1th" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-perks-teal/50 outline-none transition-all" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="email" defaultValue="Zen1th@agency.com" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-perks-teal/50 outline-none transition-all" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Phone Number</label>
                     <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="tel" defaultValue="+1 (555) 0123-4567" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-perks-teal/50 outline-none transition-all" />
                     </div>
                  </div>
                </div>

                <button className="w-full bg-perks-teal hover:bg-perks-tealDark text-white font-bold py-4 rounded-xl shadow-lg shadow-perks-teal/20 transition-all active:scale-95">
                   Save Changes
                </button>
             </div>
          </motion.div>
        ) : view === 'payment' ? (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
             <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
             </div>

             <div className="space-y-4">
                {/* Saved Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group cursor-pointer">
                   <div className="absolute top-0 right-0 p-6 opacity-50">
                      <CreditCard size={48} />
                   </div>
                   <div className="relative z-10">
                      <div className="text-xs uppercase opacity-70 mb-8">Mastercard</div>
                      <div className="text-2xl font-mono tracking-wider mb-8">•••• •••• •••• 8829</div>
                      <div className="flex justify-between items-end">
                         <div>
                            <div className="text-[10px] uppercase opacity-70">Card Holder</div>
                            <div className="font-bold text-sm">Zen1th</div>
                         </div>
                         <div>
                            <div className="text-[10px] uppercase opacity-70">Expires</div>
                            <div className="font-bold text-sm">12/28</div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Add New Card Button */}
                <button className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-gray-500 dark:text-slate-400 font-bold hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:border-perks-teal dark:hover:border-perks-teal hover:text-perks-teal transition-all">
                   <Plus size={20} /> Add New Card
                </button>
             </div>
          </motion.div>
        ) : view === 'security' ? (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
             <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security & Privacy</h2>
             </div>

             <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Change Password</h3>
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Current Password</label>
                      <div className="relative">
                         <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                         <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-perks-teal/50 outline-none transition-all" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-300">New Password</label>
                      <div className="relative">
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                         <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-perks-teal/50 outline-none transition-all" />
                      </div>
                   </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">Two-Factor Authentication</span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">Add an extra layer of security</span>
                   </div>
                   <div className="w-12 h-6 bg-perks-teal rounded-full p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md translate-x-6"></div>
                   </div>
                </div>

                <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 mt-4">
                   Update Security Settings
                </button>
             </div>
          </motion.div>
        ) : (
          <motion.div
            key="bookmarks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
             <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={() => setView('main')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookmarks</h2>
             </div>

             {savedPerks.length === 0 && savedMerchants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                   <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
                      <Heart size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No bookmarks yet</h3>
                   <p className="text-gray-500 dark:text-slate-400 max-w-xs mx-auto">
                      Start exploring perks and merchants. Tap the heart icon to save your favorites here.
                   </p>
                   <button 
                      onClick={() => onNavigate('home')}
                      className="mt-6 text-perks-teal font-bold hover:underline"
                   >
                      Browse Perks
                   </button>
                </div>
             ) : (
               <>
                 {/* Saved Perks Section */}
                 {savedPerks.length > 0 && (
                   <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Star className="text-yellow-500" size={18} /> Saved Perks ({savedPerks.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {savedPerks.map(perk => (
                            <PerkCard 
                              key={perk.id} 
                              perk={perk} 
                              onClick={() => onPerkSelect(perk)}
                              isBookmarked={true}
                              onToggleBookmark={onToggleBookmark}
                            />
                         ))}
                      </div>
                   </div>
                 )}

                 {/* Saved Merchants Section */}
                 {savedMerchants.length > 0 && (
                   <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                         <Store className="text-perks-teal" size={18} /> Saved Merchants ({savedMerchants.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {savedMerchants.map((merchant, idx) => (
                           <MerchantCard 
                             key={`saved-merchant-${idx}`} 
                             merchant={merchant} 
                             variants={{
                               hidden: { opacity: 0, y: 20 },
                               show: { opacity: 1, y: 0 }
                             }} 
                             onClick={() => onPerkSelect(merchant)}
                             isBookmarked={true}
                             onToggleBookmark={onToggleMerchantBookmark}
                           />
                         ))}
                      </div>
                   </div>
                 )}
               </>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};