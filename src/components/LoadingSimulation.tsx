"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";

const loadingTexts = [
  "Мамандық болашағы талданып жатыр...",
  "AI әсер деңгейі есептеліп жатыр...",
  "Дағдылар картасы жасалып жатыр...",
  "Future ID Card дайындалып жатыр..."
];

export default function LoadingSimulation() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-xl mx-auto min-h-[400px]">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
          filter: ["drop-shadow(0 0 20px #06b6d4)", "drop-shadow(0 0 40px #8b5cf6)", "drop-shadow(0 0 20px #06b6d4)"]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple blur-xl rounded-full opacity-50"></div>
        <BrainCircuit className="w-24 h-24 text-white relative z-10" />
      </motion.div>

      <div className="space-y-4 text-center w-full">
        <h3 className="text-xl font-semibold text-white">AI сенің болашағыңды модельдеп жатыр</h3>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </div>

        {/* Dynamic Loading Text */}
        <motion.p 
          key={textIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-slate-400 text-sm h-5"
        >
          {loadingTexts[textIndex]}
        </motion.p>
      </div>
    </div>
  );
}
