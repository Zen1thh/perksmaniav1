import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShoppingBasket } from 'lucide-react';
import { Logo } from './Logo';

export const Wallet: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto space-y-8 py-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Wallet</h2>
        <p className="text-gray-500 dark:text-slate-400">Manage your cards and points</p>
      </div>

      {/* Digital Card */}
      <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 cursor-pointer group">
         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
         {/* Decorative circles */}
         <div className="absolute -top-12 -right-12 w-48 h-48 bg-perks-teal rounded-full opacity-20 blur-2xl"></div>
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
         
         <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <Logo variant="light" className="scale-75 origin-top-left" showMania={false} />
               <QrCode className="text-white opacity-80" size={32} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="w-12 h-8 bg-yellow-500/20 rounded-md border border-yellow-500/50 flex items-center justify-center">
                    <div className="w-6 h-4 bg-yellow-500 rounded-sm"></div>
                 </div>
                 <span className="text-white/60 tracking-[0.2em]">•••• •••• •••• 8829</span>
              </div>
              <div className="flex justify-between items-end text-white">
                 <div>
                    <div className="text-xs text-white/50 uppercase">Card Holder</div>
                    <div className="font-medium tracking-wide">PERRY THE PLATYPUS</div>
                 </div>
                 <div>
                    <div className="text-xs text-white/50 uppercase text-right">Expires</div>
                    <div className="font-medium">12/28</div>
                 </div>
              </div>
            </div>
         </div>
         
         {/* Shine effect */}
         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
           {[1,2,3].map((_, i) => (
             <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
                      <ShoppingBasket size={18} />
                   </div>
                   <div>
                      <div className="font-bold text-gray-800 dark:text-white">Starbucks Coffee</div>
                      <div className="text-xs text-gray-400 dark:text-slate-500">Today, 10:30 AM</div>
                   </div>
                </div>
                <div className="text-right">
                   <div className="font-bold text-gray-900 dark:text-white">-₱250.00</div>
                   <div className="text-xs text-perks-teal font-medium">+25 Pts</div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};