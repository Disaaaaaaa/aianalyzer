"use client";

import { AiResponseData } from "@/types";
import { BrainCircuit, Fingerprint, ShieldAlert, Zap } from "lucide-react";

interface FutureIdCardProps {
  data: AiResponseData["future_id_card"];
  riskLevel: number;
}

export default function FutureIdCard({ data, riskLevel }: FutureIdCardProps) {
  return (
    <div id="future-id-card" className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl glass-panel border border-slate-700/50 shadow-2xl p-6">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 z-0"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/20 blur-[50px] z-0"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/20 blur-[50px] z-0"></div>
      
      {/* Hologram lines overlay */}
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)] z-0 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col h-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-700/50 pb-4">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-6 h-6 text-neon-cyan" />
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">2050 Earth Gov</p>
              <p className="text-sm font-black tracking-wider text-white">FUTURE ID</p>
            </div>
          </div>
          <Zap className="w-5 h-5 text-neon-purple" />
        </div>

        {/* Info Area */}
        <div className="space-y-4">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Name</p>
            <p className="text-xl font-bold text-white uppercase tracking-wide">{data.name}</p>
          </div>
          
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Future Profession</p>
            <p className="text-base font-semibold text-neon-cyan leading-tight">{data.future_profession}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">AI Risk Level</p>
              <div className="flex items-center space-x-1">
                <ShieldAlert className={`w-4 h-4 ${riskLevel > 60 ? 'text-red-400' : 'text-green-400'}`} />
                <span className="text-sm font-bold text-white">{riskLevel}%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Status 2050</p>
              <p className="text-sm font-bold text-white">{data.status}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Main Skill</p>
            <p className="text-sm font-medium text-slate-200 bg-slate-800/50 px-2 py-1 rounded inline-block border border-slate-700">
              {data.main_skill}
            </p>
          </div>
        </div>

        {/* Footer/Barcode */}
        <div className="pt-4 border-t border-slate-700/50 flex justify-between items-end">
          <div className="flex flex-col">
            <Fingerprint className="w-8 h-8 text-slate-500 mb-1" />
            <p className="text-[10px] font-mono text-slate-400 tracking-widest">{data.id_code}</p>
          </div>
          
          {/* Simulated Barcode */}
          <div className="flex space-x-[2px] h-8 opacity-50">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-white h-full" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
