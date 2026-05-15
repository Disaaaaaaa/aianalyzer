"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrainCircuit, ChevronRight, ShieldAlert, Zap } from "lucide-react";

export default function Home() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Dark overlay to ensure text readability over the background image */}
      <div className="absolute inset-0 bg-[#020617]/80 z-0 pointer-events-none"></div>

      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple rounded-full blur-[150px] opacity-30 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan rounded-full blur-[150px] opacity-30 pointer-events-none z-0"></div>
      
      <main className="z-10 flex flex-col items-center max-w-4xl w-full text-center space-y-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full mb-4">
            <BrainCircuit className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm font-medium tracking-wide uppercase text-slate-300">AI Симулятор</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            2050: <span className="bg-gradient-text">Сенің болашағың</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            2050 жылы сенің мамандығың қандай болады? AI сенің жұмысыңды алмастыра ма? Қазір қандай дағдылар керек?
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl"
        >
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-neon-blue" />
            </div>
            <h3 className="font-semibold text-white">Жедел талдау</h3>
            <p className="text-sm text-slate-400">Бір минутта жеке болашақ симуляциясын ал.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="font-semibold text-white">Қауіптілік деңгейі</h3>
            <p className="text-sm text-slate-400">AI сенің мамандығыңа қалай әсер ететінін біл.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent pointer-events-none"></div>
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-neon-cyan" />
            </div>
            <h3 className="font-semibold text-white">Future ID Card</h3>
            <p className="text-sm text-slate-400">Болашақ статусыңды көрсететін сандық ID.</p>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/simulation">
            <button className="btn-primary group relative px-8 py-4 rounded-full text-lg font-bold text-white flex items-center space-x-3 overflow-hidden">
              <span className="relative z-10">Болашағыңды тексер</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </Link>
        </motion.div>
        
        {/* Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs text-slate-500 max-w-xl mx-auto mt-8"
        >
          Бұл платформа кәсіби бағдар беру мақсатында жасалған AI симулятор. Нәтиже нақты болашақты дәл болжау емес.
        </motion.div>
      </main>
    </div>
  );
}
