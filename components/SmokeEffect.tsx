import React from 'react';
import { motion } from 'framer-motion';

const SmokeEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(220,215,200,0.8)_100%)] opacity-80" />

      {/* Large Ink Blot - Top Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -150, y: -150 }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3], 
          scale: [1, 1.1, 1],
          x: [-50, -20, -50],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-stone-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
      />
      
      {/* Large Ink Blot - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 150, y: 150 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2], 
          scale: [1, 1.2, 1],
          x: [50, 80, 50],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-40 -right-40 w-[50rem] h-[50rem] bg-stone-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-30"
      />

       {/* Flowing Mist Layers */}
       {[...Array(2)].map((_, i) => (
         <motion.div
            key={`mist-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-stone-100 to-transparent opacity-40 h-40 w-[150%]"
            style={{ 
              top: `${30 + i * 40}%`, 
              left: '-25%',
              maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
            }}
            animate={{ x: ['-10%', '10%', '-10%'] }}
            transition={{ 
                duration: 20 + i * 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 3
            }}
         />
       ))}
    </div>
  );
};

export default SmokeEffect;