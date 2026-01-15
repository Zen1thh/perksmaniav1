import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Logo } from './Logo';
import { 
  ShieldCheck, Users, Handshake, Award, Rocket, Eye, 
  Tag, Layers, ThumbsUp, Crown, Gift, Zap, Building2,
  Youtube, Facebook, Instagram, Twitter, Send
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Existing Newsletter Animation
      gsap.from(".newsletter-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      
      // Floating Animations
      gsap.to(".floating-gift", {
        y: -15,
        rotation: 3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".floating-icon", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Best Prices & Offers",
      desc: "Enjoy exclusive deals and unbeatable perks designed to give you more value for every purchase.",
      icon: Tag,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Wide Assortment",
      desc: "Discover a diverse range of merchants all in one seamless platform.",
      icon: Layers,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "100% Satisfaction",
      desc: "We prioritize customer happiness with tailored rewards and seamless user experiences.",
      icon: ThumbsUp,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      title: "Exclusive Rewards",
      desc: "Enjoy loyalty perks, incentives, and exclusive deals that go beyond simple discounts.",
      icon: Crown,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Loyalty Rewards",
      desc: "Earn points, perks, and incentives that strengthen lasting connections with your favorite brands.",
      icon: Gift,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Great Daily Deal",
      desc: "Unlock fresh, exciting offers every day that make shopping rewarding and fun.",
      icon: Zap,
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-900/20"
    }
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-16 pb-12 px-4"
    >
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
           Welcome to
         </h1>

         <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="flex justify-center mb-6"
         >
           <Logo variant="color" className="scale-150 origin-center" />
         </motion.div>
         
         <div className="text-lg text-gray-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed space-y-4 text-justify">
           <p>
             PERKS MANIA is a marketing technology company in the integration of digital marketing and traditional marketing that caters to small and medium sized businesses across various industries looking to establish a strong Online and Offline presence, connect with their audience, and drive business growth.
           </p>
           <p>
             Perks Mania also, develops a loyalty program system through the provision of rewards, perks, and incentives designed to inspire unwavering customer loyalty.
           </p>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          { label: 'Active Users', value: '50K+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Merchant Partners', value: '500+', icon: ShieldCheck, color: 'text-perks-teal', bg: 'bg-teal-50 dark:bg-teal-900/20' },
          { label: 'Program Partners', value: '50+', icon: Handshake, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Rewards Redeemed', value: '1M+', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
             <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
               <stat.icon size={24} />
             </div>
             <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
             <div className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Identity, Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Who We Are */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Building2 size={100} className="text-gray-900 dark:text-white" />
           </div>
           <div className="relative z-10 space-y-4 flex-grow">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-xl flex items-center justify-center">
                 <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Who We Are</h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm text-justify">
                Perks Mania has been registered as a corporation since June 2023, operating under a conservative structure to ensure efficient and stable business operations. Proudly 100% Filipino-owned and Filipino developers with office based in Quezon City, the company is committed to delivering innovative solutions and exceptional service.
              </p>
           </div>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-perks-teal to-blue-500 p-8 rounded-[2rem] text-white shadow-lg relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 p-8 opacity-20">
              <Rocket size={100} />
           </div>
           <div className="relative z-10 space-y-4 flex-grow">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                 <Rocket size={24} />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="opacity-90 leading-relaxed">
                To become the number ONE marketing technology in the Philippines by the year 2030.
              </p>
           </div>
        </div>

        {/* Vision */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Eye size={100} className="text-gray-900 dark:text-white" />
           </div>
           <div className="relative z-10 space-y-4 flex-grow">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-xl flex items-center justify-center">
                 <Eye size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed">
                To deliver cutting-edge marketing solutions that empower businesses of all sizes to grow, thrive, and reach their full potential in an ever-evolving marketplace.
              </p>
           </div>
        </div>
      </div>

      {/* What We Provide Section */}
      <div className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">What We Provide?</h2>
          <div className="h-1.5 w-24 bg-perks-teal/30 rounded-full mx-auto relative overflow-hidden">
             <div className="absolute inset-0 bg-perks-teal animate-[shimmer_2s_infinite] -translate-x-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {services.map((service, idx) => (
             <div 
               key={idx} 
               className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-perks-teal dark:hover:border-perks-teal hover:shadow-perks-teal/10 transition-all duration-300 flex flex-col items-center text-center group"
             >
                <div className={`w-16 h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                   <service.icon size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm flex-grow">
                  {service.desc}
                </p>
             </div>
           ))}
        </div>
      </div>

      {/* Our Team Section */}
      <div className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
          <div className="h-1.5 w-24 bg-perks-teal/30 rounded-full mx-auto relative overflow-hidden mb-8">
             <div className="absolute inset-0 bg-perks-teal animate-[shimmer_2s_infinite] -translate-x-full"></div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4 text-gray-500 dark:text-slate-400 leading-relaxed text-lg text-justify">
             <p>
               At PERKS MANIA, our success is powered by a passionate team of experts, designers, marketers, and developers who are dedicated to creating an exceptional online shopping experience. With a shared commitment to innovation, quality, and customer satisfaction.
             </p>
             <p>
               Our team works behind the scenes to bring you the best deals, seamless browsing, and a platform you can trust. Get to know the people who make PerksMania more than just a marketplace — a true house of rewards.
             </p>
          </div>
        </div>

        <div className="flex justify-center">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm w-full text-center group relative overflow-hidden hover:border-perks-teal hover:ring-2 hover:ring-perks-teal/10">
               {/* Background Pattern */}
               <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-perks-teal/20 to-blue-500/20"></div>
               
               <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white dark:border-slate-900 shadow-lg group-hover:scale-105 transition-transform duration-300">
                 <img 
                   src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" 
                   alt="CEO" 
                   className="w-full h-full object-cover" 
                 />
               </div>
               
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                 Paul Simon.
               </h3>
               <p className="text-perks-teal font-bold text-sm uppercase tracking-wider mb-4">
                 CEO
               </p>
               
               <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-red-600 hover:text-white transition-colors">
                    <Youtube size={18} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                    <Facebook size={18} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-pink-600 hover:text-white transition-colors">
                    <Instagram size={18} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-sky-500 hover:text-white transition-colors">
                    <Twitter size={18} />
                  </button>
               </div>
           </div>
        </div>
      </div>

      {/* Newsletter Subscription Banner */}
      <div className="newsletter-section relative w-full mx-auto mt-20 mb-20">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-500">
              {/* Background Decorations - Subtle blobs to match theme */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-perks-teal/10 rounded-full blur-[100px] opacity-60 translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[80px] opacity-60 -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  {/* Text Content */}
                  <div className="flex-1 text-center md:text-left space-y-6 max-w-xl">
                      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-[1.2] font-sans">
                          Perks are waiting for you. <br/>
                          <span className="text-perks-teal">Find yours today and start saving.</span>
                      </h2>
                      <p className="text-gray-500 dark:text-slate-400 text-lg">
                        Join our newsletter to get the latest updates, exclusive deals, and member-only rewards delivered straight to your inbox.
                      </p>
                      
                      <div className="bg-gray-50 dark:bg-slate-800 p-2 rounded-full shadow-inner border border-gray-200 dark:border-slate-700 flex items-center max-w-md mx-auto md:mx-0 transform transition-transform focus-within:scale-105 duration-300 relative">
                          <div className="pl-4 text-gray-400">
                             <Send size={20} />
                          </div>
                          <input 
                              type="email" 
                              placeholder="Your email address" 
                              className="flex-1 bg-transparent px-4 py-3 outline-none text-gray-900 dark:text-white placeholder-gray-400 w-full"
                          />
                          <button className="bg-gradient-to-r from-perks-teal to-blue-500 hover:shadow-lg hover:shadow-perks-teal/30 text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
                              Subscribe
                          </button>
                      </div>
                  </div>

                  {/* 3D Illustration Area */}
                  <div className="flex-1 relative h-64 md:h-80 w-full flex items-center justify-center">
                      {/* Main Gift */}
                      <img 
                          src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=600"
                          alt="Gift Box"
                          className="floating-gift w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl z-10 relative"
                      />
                      
                      {/* Floating Elements simulated with CSS/Icons to match 'coins/coupons' vibe */}
                      <div className="floating-icon absolute top-10 right-10 bg-white dark:bg-slate-800 text-yellow-500 border border-gray-100 dark:border-slate-700 p-3 rounded-xl shadow-lg transform rotate-12 z-20">
                          <Tag size={32} strokeWidth={2.5} />
                      </div>
                      <div className="floating-icon absolute bottom-10 left-10 bg-perks-teal text-white p-4 rounded-full shadow-lg transform -rotate-12 z-20">
                          <span className="text-xl font-bold">%</span>
                      </div>
                      {/* Coins */}
                      <div className="floating-icon absolute top-1/2 right-0 w-12 h-12 bg-yellow-400 rounded-full shadow-lg border-4 border-yellow-200 z-0"></div>
                       <div className="floating-icon absolute bottom-0 left-20 w-8 h-8 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-200 z-20"></div>
                  </div>
              </div>
          </div>
      </div>
    </motion.div>
  );
};