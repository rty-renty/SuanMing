import React from 'react';
import { motion } from 'framer-motion';

const BaguaLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 relative">
      {/* Glow Effect behind */}
      <motion.div 
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 bg-amber-100 rounded-full blur-3xl -z-10"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 relative rounded-full border-[6px] border-stone-800 flex items-center justify-center overflow-hidden shadow-2xl bg-[#f0eee5]"
      >
         {/* Inner Ring */}
        <div className="absolute inset-1 border border-stone-400 rounded-full opacity-50"></div>

        {/* Yin Yang Symbol */}
        <div className="absolute w-full h-full bg-stone-900 left-0 top-0 rounded-full" style={{ clipPath: 'inset(0 0 0 50%)' }}></div>
        <div className="absolute w-full h-full bg-[#f0eee5] left-0 top-0 rounded-full" style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
        
        <div className="absolute w-1/2 h-full bg-stone-900 left-1/2 top-0 rounded-full transform -translate-x-1/2 origin-center" style={{ clipPath: 'circle(25% at 50% 25%)' }}></div>
        <div className="absolute w-1/2 h-full bg-[#f0eee5] left-1/2 top-0 rounded-full transform -translate-x-1/2 origin-center" style={{ clipPath: 'circle(25% at 50% 75%)' }}></div>
        
        <div className="absolute w-4 h-4 bg-[#f0eee5] rounded-full top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-inner"></div>
        <div className="absolute w-4 h-4 bg-stone-900 rounded-full top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-inner"></div>
      </motion.div>

      <div className="text-center space-y-2">
        <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl font-calligraphy text-stone-800 tracking-widest"
        >
            天机推演中
        </motion.p>
        <p className="text-xs text-stone-500 font-serif tracking-[0.2em] uppercase">Divining Heavens...</p>
      </div>
    </div>
  );
};

export default BaguaLoader;