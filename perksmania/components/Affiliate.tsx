import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Copy, Share2, Users, 
  ChevronRight, Award, Download, CheckCircle2,
  QrCode, ArrowUpRight, Coins, Wallet, Sparkles, Zap,
  MousePointerClick, UserPlus, X, HelpCircle, BarChart3,
  Search, Filter, MoreHorizontal, Clock, Lock, ScanLine
} from 'lucide-react';

export const Affiliate: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [showReferralsModal, setShowReferralsModal] = useState(false);
  const [showTierModal, setShowTierModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (showConversionModal || showReferralsModal || showTierModal || showQRModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showConversionModal, showReferralsModal, showTierModal, showQRModal]);
  
  const referralLink = "perksmania.com/r/zen1th";
  const userId = "PM-8829-2025";
  const userName = "Zen1th";

  // Mock Data for Points System
  const pointsBalance = 24500;
  const conversionRate = 4.2; 
  const totalReferrals = 128;
  const totalClicks = 3048; 
  const cashValue = pointsBalance * 0.10; // 10 points = 1 PHP

  // 8-Tier System Configuration
  const TIERS = [
    { name: 'Bronze', min: 0, multiplier: '1.0x', color: 'text-orange-700 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-900' },
    { name: 'Silver', min: 10000, multiplier: '1.2x', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700' },
    { name: 'Gold', min: 30000, multiplier: '1.5x', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-900' },
    { name: 'Platinum', min: 75000, multiplier: '1.8x', color: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-900' },
    { name: 'Diamond', min: 150000, multiplier: '2.0x', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-900' },
    { name: 'Elite', min: 300000, multiplier: '2.5x', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-900' },
    { name: 'Master', min: 600000, multiplier: '3.0x', color: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400', border: 'border-red-200 dark:border-red-900' },
    { name: 'Legend', min: 1000000, multiplier: '4.0x', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-900' },
  ];

  // Determine Current Tier
  const currentTierIndex = TIERS.findIndex((tier, index) => {
    const nextTier = TIERS[index + 1];
    return pointsBalance >= tier.min && (!nextTier || pointsBalance < nextTier.min);
  });
  const currentTier = TIERS[currentTierIndex];
  const nextTier = TIERS[currentTierIndex + 1];

  // Mock Data for Referral List
  const referralList = [
    { id: '1', name: 'Sarah Wilson', date: 'Today, 2:30 PM', status: 'Active', points: 500, avatarColor: 'bg-purple-500' },
    { id: '2', name: 'Mike Ross', date: 'Yesterday', status: 'Pending', points: 0, avatarColor: 'bg-blue-500' },
    { id: '3', name: 'Jessica Pearson', date: 'Mar 12, 2024', status: 'Active', points: 1250, avatarColor: 'bg-emerald-500' },
    { id: '4', name: 'Harvey Specter', date: 'Mar 10, 2024', status: 'Gold Member', points: 3500, avatarColor: 'bg-amber-500' },
    { id: '5', name: 'Louis Litt', date: 'Mar 08, 2024', status: 'Inactive', points: 150, avatarColor: 'bg-orange-500' },
    { id: '6', name: 'Rachel Zane', date: 'Mar 05, 2024', status: 'Active', points: 800, avatarColor: 'bg-pink-500' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'Pending': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'Inactive': return 'text-slate-500 bg-slate-100 dark:bg-slate-800';
      case 'Gold Member': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-8 pb-20 relative"
    >
      {/* Header & Balance Card */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Points Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-slate-800 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl border border-white/5">
           {/* Background Effects */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-perks-teal/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4"></div>
           
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                       <Sparkles className="text-yellow-400" size={24} /> Affiliate Hub
                    </h1>
                    <p className="text-slate-400">Turn your network into rewards.</p>
                 </div>
                 <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                    <Award className="text-yellow-400" size={18} />
                    <span className="font-bold text-sm">{currentTier.name} Tier</span>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                 <div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                       <Coins size={14} className="text-yellow-400" /> Total PerksPoints
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                       {pointsBalance.toLocaleString()}
                    </h2>
                    <div className="flex items-center gap-2 mt-3 text-emerald-400 text-sm font-medium bg-emerald-500/10 px-3 py-1 rounded-lg w-fit">
                       <ArrowUpRight size={16} />
                       <span>+1,250 pts this week</span>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-auto flex flex-col items-end gap-3">
                    <div className="text-right mb-1">
                       <span className="text-slate-400 text-xs uppercase font-bold">Cash Equivalent</span>
                       <div className="text-2xl font-bold text-perks-teal">₱{cashValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    </div>
                    <button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 w-full md:w-auto">
                       <Wallet size={18} /> Convert to Cash
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex flex-col gap-6">
           {/* Stat 1: Active Referrals (Clickable) */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => setShowReferralsModal(true)}
             className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors"
           >
              <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-bl-[4rem] transition-all group-hover:scale-110"></div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
                 <Users size={18} />
              </div>
              
              <div className="flex items-center gap-4 mb-2 relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
                    <Users size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Active Referrals</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalReferrals}</h3>
                 </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-blue-500 w-[70%] rounded-full"></div>
              </div>
           </motion.div>

           {/* Stat 2: Conversion Rate (Clickable) */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => setShowConversionModal(true)}
             className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors"
           >
              <div className="absolute right-0 top-0 w-24 h-24 bg-orange-500/5 rounded-bl-[4rem] transition-all group-hover:scale-110"></div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-400">
                 <HelpCircle size={18} />
              </div>

              <div className="flex items-center gap-4 mb-2 relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center">
                    <TrendingUp size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Conversion Rate</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{conversionRate}%</h3>
                 </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-orange-500 w-[35%] rounded-full"></div>
              </div>
           </motion.div>
        </div>
      </motion.div>

      {/* Earning Rules & Multipliers */}
      <motion.div variants={itemVariants}>
         <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <Zap className="text-perks-teal" size={20} /> How to Earn
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Multiplier: {currentTier.multiplier}</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center shrink-0">
                   <Users size={20} />
                </div>
                <div>
                   <div className="text-sm font-bold text-gray-900 dark:text-white">New Sign Up</div>
                   <div className="text-xs text-slate-500 mb-1">When a friend joins</div>
                   <div className="text-purple-600 dark:text-purple-400 font-bold text-sm">+500 pts</div>
                </div>
             </div>
             
             <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 text-perks-teal flex items-center justify-center shrink-0">
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <div className="text-sm font-bold text-gray-900 dark:text-white">First Purchase</div>
                   <div className="text-xs text-slate-500 mb-1">Commission per referral</div>
                   <div className="text-perks-teal font-bold text-sm">+1,000 pts</div>
                </div>
             </div>

             <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 flex items-center justify-center shrink-0">
                   <Award size={20} />
                </div>
                <div>
                   <div className="text-sm font-bold text-gray-900 dark:text-white">Tier Bonus</div>
                   <div className="text-xs text-slate-500 mb-1">Based on monthly volume</div>
                   <div className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">Up to 4x Points</div>
                </div>
             </div>
         </div>
      </motion.div>

      {/* Tier Progress */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
         <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tier Progress</h3>
                    <button 
                      onClick={() => setShowTierModal(true)}
                      className="text-xs font-bold text-perks-teal bg-perks-teal/10 px-3 py-1 rounded-full hover:bg-perks-teal/20 transition-colors flex items-center gap-1"
                    >
                      View All Benefits <ChevronRight size={12} />
                    </button>
                  </div>
                  {nextTier ? (
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Earn <span className="text-gray-900 dark:text-white font-bold">{(nextTier.min - pointsBalance).toLocaleString()} more points</span> to unlock {nextTier.name} Status and {nextTier.multiplier} multiplier.
                    </p>
                  ) : (
                    <p className="text-emerald-500 font-bold text-sm">You've reached the highest tier! Legendary Status.</p>
                  )}
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Current Status</div>
                  <div className={`text-2xl font-bold ${currentTier.color.split(' ')[0]}`}>{currentTier.name} ({currentTier.multiplier})</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: nextTier ? `${((pointsBalance - currentTier.min) / (nextTier.min - currentTier.min)) * 100}%` : '100%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-perks-teal to-blue-500 rounded-full"
                />
            </div>

            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span>{currentTier.name}</span>
                <span className={`${nextTier ? 'text-gray-400' : 'text-emerald-500'}`}>{nextTier ? nextTier.name : 'Max Level'}</span>
            </div>
         </div>
         {/* Subtle Background Pattern */}
         <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-gray-50 dark:from-slate-800 to-transparent opacity-50 pointer-events-none"></div>
      </motion.div>

      {/* Referral Tools */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <Share2 className="text-perks-teal" size={20} /> Share Your Link
            </h3>
            
            <div className="relative group mb-6">
               <input 
                  type="text" 
                  readOnly 
                  value={referralLink}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-medium py-4 pl-6 pr-32 rounded-2xl outline-none focus:ring-2 focus:ring-perks-teal/20"
               />
               <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                     onClick={handleCopy}
                     className="bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-xl font-bold text-sm shadow-sm border border-gray-200 dark:border-slate-600 transition-all flex items-center gap-2"
                  >
                     {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                     {copied ? 'Copied' : 'Copy'}
                  </button>
               </div>
            </div>

            <div className="flex gap-4">
               <button className="flex-1 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                  Share to Facebook
               </button>
               <button className="flex-1 py-3 rounded-xl bg-sky-50 dark:bg-sky-900/10 text-sky-600 dark:text-sky-400 font-bold text-sm hover:bg-sky-100 dark:hover:bg-sky-900/20 transition-colors">
                  Share to Twitter
               </button>
            </div>
         </div>

         <div className="bg-gradient-to-br from-perks-teal to-teal-600 p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-perks-teal/20 relative overflow-hidden">
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
             
             <div className="relative z-10 flex-1">
                <h3 className="text-xl font-bold mb-2">QR Code Generator</h3>
                <p className="text-teal-100 text-sm mb-6 leading-relaxed">
                   Let people scan to join instantly. Perfect for in-person events or printed materials.
                </p>
                <button 
                  onClick={() => setShowQRModal(true)}
                  className="bg-white text-teal-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-50 transition-colors flex items-center gap-2 shadow-lg"
                >
                   <ScanLine size={16} /> View & Download QR
                </button>
             </div>
             
             <div className="bg-white p-3 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <QrCode size={100} className="text-gray-900" />
             </div>
         </div>
      </motion.div>

      {/* MODALS in Portal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {/* Active Referrals Modal */}
          {showReferralsModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReferralsModal(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
              >
                 {/* Modal Header */}
                 <div className="p-6 pb-4 flex justify-between items-center border-b border-gray-100 dark:border-slate-800">
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                         <Users className="text-blue-500" size={24} />
                         Referral Network
                       </h3>
                       <p className="text-sm text-gray-500 dark:text-slate-400">Track your network's growth and status.</p>
                    </div>
                    <button onClick={() => setShowReferralsModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                       <X size={20} className="text-gray-400" />
                    </button>
                 </div>
                 
                 {/* Controls */}
                 <div className="px-6 py-4 flex gap-3">
                    <div className="flex-1 relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         type="text" 
                         placeholder="Search referrals..." 
                         className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-perks-teal/30"
                       />
                    </div>
                    <button className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400">
                       <Filter size={18} />
                    </button>
                 </div>

                 {/* List */}
                 <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 custom-scrollbar">
                    {referralList.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${user.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                               {user.name.charAt(0)}
                            </div>
                            <div>
                               <div className="font-bold text-gray-900 dark:text-white text-sm">{user.name}</div>
                               <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
                                  <Clock size={12} /> 
                                  {user.date}
                               </div>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-6">
                            <div className="text-right">
                               <div className={`text-xs font-bold px-2 py-1 rounded-md mb-1 inline-block ${getStatusColor(user.status)}`}>
                                  {user.status}
                               </div>
                               {user.points > 0 && (
                                 <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center justify-end gap-1">
                                    +{user.points.toLocaleString()} pts
                                 </div>
                               )}
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300">
                               <MoreHorizontal size={18} />
                            </button>
                         </div>
                      </div>
                    ))}
                    
                    <div className="text-center pt-4">
                       <button className="text-sm font-bold text-perks-teal hover:underline">View All History</button>
                    </div>
                 </div>
              </motion.div>
            </div>
          )}

          {/* Tier Benefits Modal */}
          {showTierModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTierModal(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
              >
                 <div className="p-6 pb-4 flex justify-between items-center border-b border-gray-100 dark:border-slate-800">
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                         <Award className="text-yellow-500" size={24} />
                         Tier Benefits
                       </h3>
                       <p className="text-sm text-gray-500 dark:text-slate-400">Unlock higher multipliers as you grow.</p>
                    </div>
                    <button onClick={() => setShowTierModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                       <X size={20} className="text-gray-400" />
                    </button>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {TIERS.map((tier, index) => {
                      const isUnlocked = pointsBalance >= tier.min;
                      const isCurrent = currentTier.name === tier.name;
                      
                      return (
                        <div 
                          key={tier.name}
                          className={`
                            relative p-4 rounded-2xl border-2 transition-all flex items-center justify-between
                            ${isCurrent 
                              ? `bg-white dark:bg-slate-800 ${tier.border} shadow-lg ring-2 ring-offset-2 ring-perks-teal/50 dark:ring-offset-slate-900` 
                              : isUnlocked 
                                ? `bg-gray-50 dark:bg-slate-800/50 ${tier.border} opacity-80`
                                : 'bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 opacity-50 grayscale'
                            }
                          `}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${tier.color}`}>
                                 {isUnlocked ? <Award size={24} /> : <Lock size={20} />}
                              </div>
                              <div>
                                 <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{tier.name}</h4>
                                    {isCurrent && (
                                      <span className="bg-perks-teal text-white text-[10px] font-bold px-2 py-0.5 rounded-full">CURRENT</span>
                                    )}
                                 </div>
                                 <div className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-1">
                                    Requires <span className="font-bold">{tier.min.toLocaleString()}</span> points
                                 </div>
                              </div>
                           </div>
                           
                           <div className="text-right">
                              <div className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-0.5">Multiplier</div>
                              <div className={`text-2xl font-bold ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                 {tier.multiplier}
                              </div>
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </motion.div>
            </div>
          )}

          {/* QR Code Download Modal */}
          {showQRModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowQRModal(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden text-center"
              >
                 <button onClick={() => setShowQRModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <X size={20} className="text-gray-400" />
                 </button>

                 <div className="mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-perks-teal to-blue-500 p-1 mx-auto shadow-xl mb-4">
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white">
                          {userName.charAt(0)}
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{userName}</h3>
                     <p className="text-sm text-gray-500 dark:text-slate-400 font-mono mt-1">{userId}</p>
                 </div>

                 <div className="bg-white p-4 rounded-3xl shadow-inner border border-gray-100 mx-auto w-fit mb-8">
                    <QrCode size={180} className="text-gray-900" />
                 </div>

                 <p className="text-xs text-gray-400 dark:text-slate-500 mb-6 px-4">
                   Scan this code to instantly refer new users or claim in-store rewards.
                 </p>

                 <button className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                    <Download size={18} /> Save to Gallery
                 </button>
              </motion.div>
            </div>
          )}

          {/* Conversion Rate Insights Modal */}
          {showConversionModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowConversionModal(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden"
              >
                 {/* Header */}
                 <div className="flex justify-between items-center mb-6">
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <BarChart3 className="text-orange-500" size={24} />
                        Conversion Insights
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Campaign Performance Metrics</p>
                   </div>
                   <button onClick={() => setShowConversionModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                      <X size={20} className="text-gray-400" />
                   </button>
                 </div>

                 {/* Funnel Visualization */}
                 <div className="space-y-4 mb-8">
                    {/* Step 1: Clicks */}
                    <div className="relative">
                       <div className="flex justify-between items-end mb-2 px-2">
                          <span className="text-sm font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
                             <MousePointerClick size={16} /> Total Link Clicks
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">{totalClicks.toLocaleString()}</span>
                       </div>
                       <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-full rounded-full"></div>
                       </div>
                    </div>

                    {/* Connector Line */}
                    <div className="pl-6 h-6 border-l-2 border-dashed border-gray-200 dark:border-slate-700 ml-4"></div>

                    {/* Step 2: Referrals */}
                    <div className="relative">
                       <div className="flex justify-between items-end mb-2 px-2">
                          <span className="text-sm font-bold text-gray-600 dark:text-slate-300 flex items-center gap-2">
                             <UserPlus size={16} /> Successful Signups
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">{totalReferrals.toLocaleString()}</span>
                       </div>
                       <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          {/* Width calculation visual: 128/3048 is small, so we use a min-width for visual clarity */}
                          <div className="h-full bg-green-500 w-[15%] rounded-full"></div>
                       </div>
                    </div>
                 </div>

                 {/* Summary Card */}
                 <div className="bg-orange-50 dark:bg-orange-900/10 rounded-2xl p-4 border border-orange-100 dark:border-orange-900/20 mb-6">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Conversion Rate</span>
                       <span className="text-2xl font-bold text-gray-900 dark:text-white">{conversionRate}%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                       Your rate is healthy! Industry average is ~2-3%. <br/>
                       <span className="font-bold">Tip:</span> Share on social media during weekends to boost clicks.
                    </p>
                 </div>

                 <button 
                   onClick={() => setShowConversionModal(false)}
                   className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold shadow-lg transition-transform active:scale-95"
                 >
                   Close Insights
                 </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};