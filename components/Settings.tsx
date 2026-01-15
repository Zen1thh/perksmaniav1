import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, BellRing, Mail, Key, Trash2, HelpCircle, User, FileText, Shield, ChevronRight } from 'lucide-react';

// Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
  <div 
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-perks-teal' : 'bg-gray-300 dark:bg-slate-600'}`}
  >
    <motion.div 
      layout
      className="w-4 h-4 bg-white rounded-full shadow-md"
      animate={{ x: checked ? 24 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </div>
);

interface SettingsProps {
  onBack: () => void;
  isDarkMode: boolean;
  onToggleTheme: (val: boolean) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack, isDarkMode, onToggleTheme }) => {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={24} className="text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {/* Appearance */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-2">Appearance</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center">
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <span className="font-medium text-gray-800 dark:text-white">Dark Theme</span>
              </div>
              <Toggle checked={isDarkMode} onChange={onToggleTheme} />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-2">Notifications</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden divide-y divide-gray-50 dark:divide-slate-800 transition-colors">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-500 flex items-center justify-center">
                  <BellRing size={20} />
                </div>
                <span className="font-medium text-gray-800 dark:text-white">Push Notifications</span>
              </div>
              <Toggle checked={pushNotif} onChange={setPushNotif} />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <span className="font-medium text-gray-800 dark:text-white">Email Updates</span>
              </div>
              <Toggle checked={emailUpdates} onChange={setEmailUpdates} />
            </div>
          </div>
        </section>

        {/* Account Security */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-2">Account Security</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden divide-y divide-gray-50 dark:divide-slate-800 transition-colors">
             <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center">
                   <Key size={20} />
                 </div>
                 <span className="font-medium text-gray-800 dark:text-white">Change Password</span>
               </div>
               <ChevronRight size={18} className="text-gray-300 dark:text-slate-600" />
             </button>
             <button className="w-full p-4 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                   <Trash2 size={20} />
                 </div>
                 <span className="font-medium text-red-500">Delete Account</span>
               </div>
               <ChevronRight size={18} className="text-red-300 dark:text-red-900/50" />
             </button>
          </div>
        </section>

        {/* Support & Legal */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-2">Support & Legal</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden divide-y divide-gray-50 dark:divide-slate-800 transition-colors">
             <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-500 flex items-center justify-center">
                   <HelpCircle size={20} />
                 </div>
                 <span className="font-medium text-gray-800 dark:text-white">Help Center</span>
               </div>
               <ChevronRight size={18} className="text-gray-300 dark:text-slate-600" />
             </button>
             <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center">
                   <User size={20} />
                 </div>
                 <span className="font-medium text-gray-800 dark:text-white">Contact Support</span>
               </div>
               <ChevronRight size={18} className="text-gray-300 dark:text-slate-600" />
             </button>
             <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300 flex items-center justify-center">
                   <FileText size={20} />
                 </div>
                 <span className="font-medium text-gray-800 dark:text-white">Terms of Service</span>
               </div>
               <ChevronRight size={18} className="text-gray-300 dark:text-slate-600" />
             </button>
             <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300 flex items-center justify-center">
                   <Shield size={20} />
                 </div>
                 <span className="font-medium text-gray-800 dark:text-white">Privacy Policy</span>
               </div>
               <ChevronRight size={18} className="text-gray-300 dark:text-slate-600" />
             </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};