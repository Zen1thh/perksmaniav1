import React from 'react';
import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';

const PARTNERS = [
  { 
    name: 'MetroBank', 
    category: 'Banking', 
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=200', 
    desc: 'Exclusive credit card rewards and 0% installment plans.' 
  },
  { 
    name: 'Globe Telecom', 
    category: 'Telecommunications', 
    logo: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=200', 
    desc: 'Redeem points for data promos and lifestyle perks.' 
  },
  { 
    name: 'Shell Philippines', 
    category: 'Automotive', 
    logo: 'https://images.unsplash.com/photo-1532588213355-52317771cce6?auto=format&fit=crop&q=80&w=200', 
    desc: 'Fuel discounts and convenience store treats.' 
  },
  { 
    name: 'Philippine Airlines', 
    category: 'Travel', 
    logo: 'https://images.unsplash.com/photo-1542296332-2e44a996aaad?auto=format&fit=crop&q=80&w=200', 
    desc: 'Mabuhay Miles conversion and exclusive lounge access.' 
  },
  { 
    name: 'Ayala Malls', 
    category: 'Lifestyle', 
    logo: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200', 
    desc: 'VIP parking and cinema privileges.' 
  },
  { 
    name: 'Grab', 
    category: 'Technology', 
    logo: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=200', 
    desc: 'Ride discounts and free delivery vouchers.' 
  },
];

export const ProgramPartners: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to a generic business handshake image if the specific one fails
    e.currentTarget.src = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-20"
    >
      {/* Header - Updated to match Merchants.tsx style */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-500">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-perks-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-xs font-bold mb-4">
            <Handshake size={14} /> Strategic Alliances
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Program Partners</h1>
          <p className="text-gray-500 dark:text-slate-400 max-w-xl text-lg leading-relaxed">
            We collaborate with industry leaders to bring you an ecosystem of boundless rewards. Connect your accounts to unlock more.
          </p>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARTNERS.map((partner, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-gray-100 dark:border-slate-800 hover:border-purple-500/30 dark:hover:border-purple-500/30 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full"
          >
             <div className="mb-6">
               <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-slate-800 p-2 border border-gray-100 dark:border-slate-700">
                 <img 
                   src={partner.logo} 
                   alt={partner.name} 
                   className="w-full h-full object-cover rounded-xl" 
                   onError={handleImageError}
                 />
               </div>
             </div>
             
             <div className="mb-4">
               <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">{partner.category}</span>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-purple-500 transition-colors">{partner.name}</h3>
             </div>
             
             <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-2">
               {partner.desc}
             </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};