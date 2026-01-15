import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Logo } from './Logo';
import { 
  Facebook, Twitter, Instagram, Youtube,
  MapPin, Phone, Mail
} from 'lucide-react';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12 footer-reveal">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="color" className="scale-90 origin-left" />
            <div className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              Perks Mania Marketing Corporation
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-500 dark:text-slate-400 text-sm">
                <MapPin size={18} className="text-perks-teal shrink-0 mt-1" />
                <span className="leading-relaxed">Level 5 Gateway Tower Araneta Center Cubao, Brgy. Socorro Quezon City</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-slate-400 text-sm">
                <Phone size={18} className="text-perks-teal shrink-0" />
                <span>+63 961 540 0912</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-slate-400 text-sm">
                <Mail size={18} className="text-perks-teal shrink-0" />
                <span>admin@perksmania.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-slate-400">
              {['About Us', 'Contact Us', 'Support Center', 'Privacy Policy', 'Cookie Policy', 'Terms of Use'].map(item => (
                <li key={item}><button className="hover:text-perks-teal transition-colors text-left">{item}</button></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Account Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Account</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-slate-400">
              {['Sign In', 'Perks', 'Likes'].map(item => (
                <li key={item}><button className="hover:text-perks-teal transition-colors text-left">{item}</button></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Partner Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Partners</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-slate-400">
              {['Become a Merchant', 'Business Franchise', 'Our Merchants', 'Program Partners'].map(item => (
                <li key={item}><button className="hover:text-perks-teal transition-colors text-left">{item}</button></li>
              ))}
            </ul>
          </div>

          {/* Column 5: Install App */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Install App</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400">From App Store or Google Play</p>
            <div className="space-y-3">
              <button className="w-full bg-black hover:bg-gray-800 text-white p-2.5 rounded-xl flex items-center gap-3 border border-gray-800 transition-all shadow-md group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider opacity-80">Download on the</div>
                  <div className="text-xs font-bold">App Store</div>
                </div>
              </button>
              <button className="w-full bg-black hover:bg-gray-800 text-white p-2.5 rounded-xl flex items-center gap-3 border border-gray-800 transition-all shadow-md group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Google Play" className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider opacity-80">Get it on</div>
                  <div className="text-xs font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 dark:text-slate-400 text-center md:text-left">
            &copy; 2025, <span className="font-bold text-perks-teal">Perks Mania</span>. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
              <button key={idx} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-perks-teal hover:text-white dark:hover:bg-perks-teal dark:hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};