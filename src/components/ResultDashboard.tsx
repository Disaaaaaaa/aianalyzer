"use client";

import { useRef, useState } from "react";
import { AiResponseData } from "@/types";
import FutureIdCard from "./FutureIdCard";
import { motion } from "framer-motion";
import { toPng, toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";
import { Copy, Download, RefreshCw, AlertTriangle, CheckCircle2, Zap, BrainCircuit } from "lucide-react";

interface ResultDashboardProps {
  data: AiResponseData;
  onRestart: () => void;
}

export default function ResultDashboard({ data, onRestart }: ResultDashboardProps) {
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  
  const riskColor = data.ai_risk_percentage > 85 ? 'text-red-500' : 
                    data.ai_risk_percentage > 60 ? 'text-orange-500' : 
                    data.ai_risk_percentage > 30 ? 'text-yellow-400' : 'text-green-400';

  const downloadPNG = async () => {
    const cardElement = document.getElementById("future-id-card");
    if (!cardElement) return;
    try {
      const dataUrl = await toPng(cardElement, { 
        backgroundColor: '#020617',
        pixelRatio: 3 
      });
      const link = document.createElement("a");
      link.download = `Future-ID-${data.future_id_card.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download PNG", err);
    }
  };

  const downloadPDF = async () => {
    if (!resultRef.current) return;
    try {
      const filter = (node: HTMLElement) => {
        if (node?.hasAttribute && node.hasAttribute('data-html2canvas-ignore')) {
          return false;
        }
        return true;
      };

      const dataUrl = await toJpeg(resultRef.current, { 
        backgroundColor: '#020617',
        pixelRatio: 2,
        quality: 0.95,
        filter: filter as any
      });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // Calculate height maintaining aspect ratio
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => { img.onload = resolve; });
      const pdfHeight = (img.height * pdfWidth) / img.width;
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`2050-Simulation-${data.future_id_card.name}.pdf`);
    } catch (err) {
      console.error("Failed to download PDF", err);
    }
  };

  const copyResult = () => {
    const text = `2050 Симуляция: ${data.future_id_card.name}
Мамандық: ${data.future_profession}
AI Қауіптілігі: ${data.ai_risk_percentage}% (${data.risk_level})

Қорытынды: ${data.short_summary}
Болашақ: ${data.profession_future}

Дағдылар:
- Техникалық: ${data.required_skills.technical.join(', ')}
- Жұмсақ: ${data.required_skills.soft.join(', ')}

Кеңес: ${data.advice}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header Notification */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 rounded-xl flex items-start space-x-3 text-sm text-slate-300 border-l-4 border-l-neon-cyan"
      >
        <AlertTriangle className="w-5 h-5 text-neon-cyan shrink-0" />
        <p>Бұл нәтиже нақты ғылыми болжам емес. Бұл AI жасаған симуляциялық кеңес. Мамандық таңдауда мұғалім, ата-ана немесе кәсіби кеңесші пікірі де ескерілуі керек.</p>
      </motion.div>

      <div ref={resultRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 bg-[#020617] rounded-3xl">
        
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{data.future_profession}</h2>
              <p className="text-slate-400">{data.short_summary}</p>
            </div>
            
            {/* Circular Risk Meter */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className={riskColor} strokeDasharray={`${data.ai_risk_percentage}, 100`} strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-2xl font-bold ${riskColor}`}>{data.ai_risk_percentage}%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Қауіп</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl">
              <h3 className="text-neon-cyan font-semibold mb-4 flex items-center"><Zap className="w-4 h-4 mr-2" /> 2050 Жағдайы</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{data.profession_future}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl">
              <h3 className="text-neon-purple font-semibold mb-4 flex items-center"><BrainCircuit className="w-4 h-4 mr-2" /> Қажет Дағдылар</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-500 text-xs uppercase block mb-1">Техникалық</span>
                  <div className="flex flex-wrap gap-2">
                    {data.required_skills.technical.map(s => <span key={s} className="bg-slate-800 px-2 py-1 rounded text-slate-300">{s}</span>)}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase block mb-1">Жұмсақ (Soft)</span>
                  <div className="flex flex-wrap gap-2">
                    {data.required_skills.soft.map(s => <span key={s} className="bg-slate-800 px-2 py-1 rounded text-slate-300">{s}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-2xl">
            <h3 className="text-white font-semibold mb-4">Даму Жоспары</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <span className="text-neon-cyan font-bold block mb-2">1 Ай</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  {data.development_plan.one_month.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <span className="text-neon-blue font-bold block mb-2">6 Ай</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  {data.development_plan.six_months.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <span className="text-neon-purple font-bold block mb-2">1 Жыл</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  {data.development_plan.one_year.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-2xl">
             <h3 className="text-white font-semibold mb-2">2050 Жылғы бір күн</h3>
             <p className="text-sm text-slate-400 italic leading-relaxed">&quot;{data.future_day_story}&quot;</p>
          </motion.div>

        </div>

        {/* Right Column - ID Card & Actions */}
        <div className="space-y-6 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="w-full">
            <FutureIdCard data={data.future_id_card} riskLevel={data.ai_risk_percentage} />
          </motion.div>
          
          {/* Actions */}
          <div className="w-full grid grid-cols-2 gap-3" data-html2canvas-ignore="true">
            <button onClick={downloadPNG} className="bg-slate-800 hover:bg-slate-700 text-white text-sm py-3 px-4 rounded-xl flex items-center justify-center transition-colors">
              <Download className="w-4 h-4 mr-2" /> PNG жүктеу
            </button>
            <button onClick={downloadPDF} className="bg-slate-800 hover:bg-slate-700 text-white text-sm py-3 px-4 rounded-xl flex items-center justify-center transition-colors">
              <Download className="w-4 h-4 mr-2" /> PDF жүктеу
            </button>
            <button onClick={copyResult} className="bg-slate-800 hover:bg-slate-700 text-white text-sm py-3 px-4 rounded-xl flex items-center justify-center transition-colors col-span-2">
              {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Көшірілді" : "Нәтижені көшіру"}
            </button>
            <button onClick={onRestart} className="btn-primary py-4 px-4 rounded-xl flex items-center justify-center transition-colors col-span-2 font-bold mt-4">
              <RefreshCw className="w-4 h-4 mr-2" /> Жаңа симуляция жасау
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
