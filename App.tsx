import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDivination } from './services/geminiService';
import { AppState, DivinationResult } from './types';
import SmokeEffect from './components/SmokeEffect';
import BaguaLoader from './components/BaguaLoader';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [name, setName] = useState('');
  
  // Date Selection State
  const [selYear, setSelYear] = useState('');
  const [selMonth, setSelMonth] = useState('');
  const [selDay, setSelDay] = useState('');

  const [result, setResult] = useState<DivinationResult | null>(null);

  // Generate Year Options (Last 100 Years)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  // Generate Month Options
  const months = useMemo(() => [
    { val: '01', label: '正月' }, { val: '02', label: '二月' }, { val: '03', label: '三月' },
    { val: '04', label: '四月' }, { val: '05', label: '五月' }, { val: '06', label: '六月' },
    { val: '07', label: '七月' }, { val: '08', label: '八月' }, { val: '09', label: '九月' },
    { val: '10', label: '十月' }, { val: '11', label: '冬月' }, { val: '12', label: '腊月' }
  ], []);

  // Generate Day Options
  const days = useMemo(() => {
    const year = parseInt(selYear) || new Date().getFullYear();
    const month = parseInt(selMonth) || 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      const label = d <= 10 ? `初${['','一','二','三','四','五','六','七','八','九','十'][d]}` : 
                    d < 20 ? `十${['','一','二','三','四','五','六','七','八','九'][d-10]}` :
                    d === 20 ? '二十' :
                    d < 30 ? `廿${['','一','二','三','四','五','六','七','八','九'][d-20]}` :
                    d === 30 ? '三十' : '三十一';
      return { val: String(d).padStart(2, '0'), label: `${d}日` };
    });
  }, [selYear, selMonth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selYear || !selMonth || !selDay) return;

    const birthDate = `${selYear}-${selMonth}-${selDay}`;
    setAppState(AppState.LOADING);
    
    const minDelay = new Promise(resolve => setTimeout(resolve, 2500)); // Increased delay for dramatic effect
    
    try {
      const [divinationData] = await Promise.all([
        getDivination(name, birthDate),
        minDelay
      ]);
      setResult(divinationData);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setAppState(AppState.IDLE);
      alert("云雾遮蔽了天机，请稍后再试。");
    }
  };

  const handleReset = () => {
    setResult(null);
    setAppState(AppState.IDLE);
    setName('');
    setSelYear('');
    setSelMonth('');
    setSelDay('');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden">
      <SmokeEffect />
      
      <main className="relative z-10 w-full flex justify-center perspective-1000">
        <AnimatePresence mode="wait">
          
          {/* IDLE STATE: INPUT FORM */}
          {appState === AppState.IDLE && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[#f5f2e9] p-8 md:p-14 w-full max-w-lg shadow-2xl relative border-y-8 border-stone-800"
            >
               {/* Decorative Inner Border */}
               <div className="absolute inset-2 border border-stone-400 pointer-events-none opacity-50"></div>
               <div className="absolute inset-3 border border-stone-300 pointer-events-none opacity-30"></div>

              <div className="text-center mb-12">
                <div className="relative inline-block">
                    <div className="w-24 h-24 mx-auto mb-6 border-[3px] border-stone-800 rounded-full flex items-center justify-center bg-[#f5f2e9] shadow-inner relative z-10">
                        <span className="text-5xl font-calligraphy text-stone-900">道</span>
                    </div>
                     <div className="absolute top-0 left-0 w-full h-full rounded-full border border-stone-400 animate-ping opacity-20 duration-[3s]"></div>
                </div>
                
                <h1 className="text-6xl font-calligraphy text-stone-900 mb-2 tracking-wide">天机阁</h1>
                <div className="h-px w-24 bg-stone-800 mx-auto my-4"></div>
                <p className="text-stone-600 font-serif tracking-[0.3em] text-sm uppercase">Destiny Divination</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="group">
                  <label className="block text-sm font-bold text-stone-500 tracking-widest uppercase mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-stone-300 focus:border-stone-900 outline-none py-3 text-2xl font-calligraphy text-stone-900 transition-all placeholder-stone-300 text-center group-hover:border-stone-500"
                    placeholder="请输入道号"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-500 tracking-widest uppercase mb-2">Birth Date</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="relative">
                      <select value={selYear} onChange={(e) => setSelYear(e.target.value)} className="w-full bg-[#ebe6d8] border border-stone-300 py-2 px-2 text-stone-800 font-serif appearance-none cursor-pointer focus:border-stone-800 focus:ring-0 text-center" required>
                        <option value="" disabled>年</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>

                    <div className="relative">
                      <select value={selMonth} onChange={(e) => setSelMonth(e.target.value)} className="w-full bg-[#ebe6d8] border border-stone-300 py-2 px-2 text-stone-800 font-serif appearance-none cursor-pointer focus:border-stone-800 focus:ring-0 text-center" required>
                        <option value="" disabled>月</option>
                         {months.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                      </select>
                    </div>

                    <div className="relative">
                      <select value={selDay} onChange={(e) => setSelDay(e.target.value)} className="w-full bg-[#ebe6d8] border border-stone-300 py-2 px-2 text-stone-800 font-serif appearance-none cursor-pointer focus:border-stone-800 focus:ring-0 text-center" required>
                        <option value="" disabled>日</option>
                         {days.map(d => <option key={d.val} value={d.val}>{d.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                    <button
                    type="submit"
                    disabled={!name || !selYear || !selMonth || !selDay}
                    className="w-full py-4 bg-stone-900 text-[#f5f2e9] font-calligraphy text-3xl tracking-[0.3em] hover:bg-stone-800 transition-all duration-500 shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    <span className="relative z-10">开启卦象</span>
                    <div className="absolute inset-0 bg-stone-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-0"></div>
                    </button>
                </div>
              </form>
            </motion.div>
          )}

          {appState === AppState.LOADING && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <BaguaLoader />
            </motion.div>
          )}

          {appState === AppState.RESULT && result && (
            <ResultCard key="result" data={result} onReset={handleReset} />
          )}

        </AnimatePresence>
      </main>

      <footer className="fixed bottom-4 text-stone-400 text-[10px] font-serif z-50 tracking-[0.2em] mix-blend-multiply opacity-50">
        TIANJI PAVILION © 2025
      </footer>
    </div>
  );
};

export default App;