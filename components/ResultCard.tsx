import React from 'react';
import { motion, Variants } from 'framer-motion';
import { DivinationResult } from '../types';

interface ResultCardProps {
  data: DivinationResult;
  onReset: () => void;
}

// Red Seal Component
const Seal: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    initial={{ scale: 2, opacity: 0, rotate: 10 }}
    animate={{ scale: 1, opacity: 0.8, rotate: -5 }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    className="absolute bottom-16 right-8 w-24 h-24 border-4 border-red-800 rounded-xl flex items-center justify-center p-2 opacity-80 mix-blend-multiply pointer-events-none transform rotate-[-5deg]"
    style={{ maskImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }} // Optional texture mask
  >
    <div className="w-full h-full border border-red-800 flex flex-col items-center justify-center space-y-1">
      <div className="text-red-900 font-calligraphy text-2xl leading-none">天机</div>
      <div className="text-red-900 font-calligraphy text-2xl leading-none">阁印</div>
    </div>
  </motion.div>
);

const ResultCard: React.FC<ResultCardProps> = ({ data, onReset }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl w-full bg-[#f5f2e9] relative overflow-hidden shadow-2xl rounded-sm flex flex-col md:flex-row"
      style={{ minHeight: '600px' }}
    >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-10" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>

        {/* Decorative Background Art (Bamboo) */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none z-0">
            <svg width="300" height="400" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 200 Q 60 150 50 100 T 55 0" stroke="black" strokeWidth="2" fill="none" />
                <path d="M50 140 L 80 120" stroke="black" strokeWidth="1" />
                <path d="M50 100 L 20 80" stroke="black" strokeWidth="1" />
                <path d="M55 40 L 85 20" stroke="black" strokeWidth="1" />
            </svg>
        </div>

      {/* LEFT COLUMN: Data & Analysis */}
      <div className="flex-1 p-8 md:p-12 z-20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-300 border-double">
         <div>
            <motion.h2 variants={itemVariants} className="text-4xl font-calligraphy text-stone-900 mb-8 border-l-4 border-stone-800 pl-4">
                卦象已成
            </motion.h2>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-10">
                <div className="space-y-1">
                    <span className="text-stone-500 text-xs tracking-widest uppercase block border-b border-stone-300 pb-1 mb-1">灵根 Spirit Root</span>
                    <span className="text-xl font-bold text-stone-800 font-serif">{data.linggen}</span>
                </div>
                <div className="space-y-1">
                    <span className="text-stone-500 text-xs tracking-widest uppercase block border-b border-stone-300 pb-1 mb-1">境界 Realm</span>
                    <span className="text-xl font-bold text-stone-800 font-serif">{data.realm}</span>
                </div>
                <div className="space-y-1">
                    <span className="text-stone-500 text-xs tracking-widest uppercase block border-b border-stone-300 pb-1 mb-1">五行 Element</span>
                    <span className="text-xl font-bold text-stone-800 font-serif">{data.element}</span>
                </div>
                <div className="space-y-1">
                    <span className="text-stone-500 text-xs tracking-widest uppercase block border-b border-stone-300 pb-1 mb-1">法宝 Artifact</span>
                    <span className="text-xl font-bold text-stone-800 font-serif">{data.luckyArtifact}</span>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-bold text-stone-800 font-calligraphy">命理批注</h3>
                <p className="text-stone-700 leading-loose text-justify font-serif text-base">
                    {data.analysis}
                </p>
            </motion.div>
         </div>

         <motion.div variants={itemVariants} className="mt-8">
            <button
            onClick={onReset}
            className="px-6 py-2 border-2 border-stone-800 text-stone-800 font-serif hover:bg-stone-800 hover:text-stone-100 transition-colors duration-300 flex items-center gap-2 group"
            >
            <span>再算一卦</span>
            <span className="group-hover:rotate-180 transition-transform duration-300">↻</span>
            </button>
         </motion.div>
      </div>

      {/* RIGHT COLUMN: Poem (Vertical Text) */}
      <div className="w-full md:w-32 bg-[#ebe6d8] p-6 md:p-8 flex flex-col items-center justify-center relative z-20 shadow-inner">
         <motion.div 
            variants={itemVariants} 
            className="writing-vertical text-2xl md:text-3xl font-cursive leading-loose text-stone-800 h-full max-h-[500px] flex flex-wrap-reverse gap-6 md:gap-8 justify-center items-center py-4"
         >
            {/* Split poem by newline or punctuation for columns */}
            {data.poem.split(/[,，。.\n]/).filter(s => s.trim().length > 0).reverse().map((line, i) => (
                <span key={i} className="whitespace-nowrap">{line}</span>
            ))}
         </motion.div>
         
         {/* Seal Stamp */}
         <Seal delay={2} />
      </div>
    </motion.div>
  );
};

export default ResultCard;