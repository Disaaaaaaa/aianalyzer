"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { QuestionnaireData } from "@/types";

interface QuestionnaireProps {
  onSubmit: (data: QuestionnaireData) => void;
}

export default function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof QuestionnaireData, string>>>({});
  
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: "",
    age: "",
    educationLevel: "",
    profession: "",
    interests: "",
    favoriteSubjects: "",
    futureGoal: "",
    currentSkills: "",
    workStyle: "",
    aiKnowledgeLevel: "",
    desiredDirections: ""
  });

  const handleInputChange = (field: keyof QuestionnaireData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const fillRandomData = () => {
    setFormData({
      name: "Жәнібек",
      age: "18",
      educationLevel: "мектеп оқушысы",
      profession: "Жасанды Интеллект Инженері",
      interests: "Компьютерлік ойындар, нейрожелілер, математика",
      favoriteSubjects: "Информатика, Алгебра",
      futureGoal: "Өз AI стартапымды ашу",
      currentSkills: "Python, C++, ағылшын тілі орташа деңгейде",
      workStyle: "зерттеушілік",
      aiKnowledgeLevel: "орташа білемін",
      desiredDirections: "Машиналық оқыту, Data Science"
    });
    setErrors({});
  };

  const validateStep = () => {
    const newErrors: Partial<Record<keyof QuestionnaireData, string>> = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Атыңызды жазыңыз";
      if (!formData.age.trim()) newErrors.age = "Жасыңызды жазыңыз";
      if (!formData.educationLevel) newErrors.educationLevel = "Оқу деңгейін таңдаңыз";
    } else if (step === 2) {
      if (!formData.profession.trim()) newErrors.profession = "Мамандықты жазыңыз";
      if (!formData.interests.trim()) newErrors.interests = "Қызығушылықтарыңызды жазыңыз";
    } else if (step === 3) {
      if (!formData.currentSkills.trim()) newErrors.currentSkills = "Қазіргі дағдыларыңызды жазыңыз";
      if (!formData.workStyle) newErrors.workStyle = "Жұмыс стилін таңдаңыз";
      if (!formData.aiKnowledgeLevel) newErrors.aiKnowledgeLevel = "Білім деңгейін таңдаңыз";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) setStep(step + 1);
      else onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const inputClass = "w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all";
  const selectClass = "w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all appearance-none";
  const labelClass = "block text-sm font-medium text-slate-300 mb-2";

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-8 rounded-3xl relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
        <motion.div 
          className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan"
          initial={{ width: `${((step - 1) / 3) * 100}%` }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="mb-8 mt-2 flex justify-between items-center text-sm font-medium text-slate-400">
        <div className="flex items-center space-x-4">
          <span>Қадам {step}/3</span>
          {step === 1 && <span>Жеке ақпарат</span>}
          {step === 2 && <span>Мамандық және қызығушылық</span>}
          {step === 3 && <span>Дағды және жұмыс стилі</span>}
        </div>
        <button 
          onClick={fillRandomData}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-neon-cyan px-3 py-1 rounded-full transition-colors border border-neon-cyan/30"
          type="button"
        >
          Рандом толтыру
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Аты-жөніңіз *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={inputClass} 
                  placeholder="Мәселен, Диас"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className={labelClass}>Жасыңыз *</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className={inputClass} 
                  placeholder="16"
                />
                {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className={labelClass}>Оқу деңгейі *</label>
                <select 
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>Таңдаңыз</option>
                  <option value="мектеп оқушысы">Мектеп оқушысы</option>
                  <option value="колледж студенті">Колледж студенті</option>
                  <option value="университет студенті">Университет студенті</option>
                  <option value="жұмыс істеймін">Жұмыс істеймін</option>
                  <option value="мамандық таңдаудамын">Мамандық таңдаудамын</option>
                </select>
                {errors.educationLevel && <p className="text-red-400 text-xs mt-1">{errors.educationLevel}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Таңдаған немесе армандайтын мамандығыңыз *</label>
                <input 
                  type="text" 
                  value={formData.profession}
                  onChange={(e) => handleInputChange("profession", e.target.value)}
                  className={inputClass} 
                  placeholder="Мәселен, IT маман, Мұғалім..."
                />
                {errors.profession && <p className="text-red-400 text-xs mt-1">{errors.profession}</p>}
              </div>
              
              <div>
                <label className={labelClass}>Қызығушылықтарыңыз (Хобби) *</label>
                <textarea 
                  value={formData.interests}
                  onChange={(e) => handleInputChange("interests", e.target.value)}
                  className={`${inputClass} resize-none min-h-[80px]`}
                  placeholder="Неміс тілі, дизайн, робототехника..."
                />
                {errors.interests && <p className="text-red-400 text-xs mt-1">{errors.interests}</p>}
              </div>

              <div>
                <label className={labelClass}>Сүйікті пәндеріңіз</label>
                <input 
                  type="text" 
                  value={formData.favoriteSubjects}
                  onChange={(e) => handleInputChange("favoriteSubjects", e.target.value)}
                  className={inputClass} 
                  placeholder="Математика, Информатика..."
                />
              </div>

              <div>
                <label className={labelClass}>Болашақтағы мақсатыңыз (Қысқаша)</label>
                <input 
                  type="text" 
                  value={formData.futureGoal}
                  onChange={(e) => handleInputChange("futureGoal", e.target.value)}
                  className={inputClass} 
                  placeholder="Өз компаниямды ашу"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Қазіргі дағдыларыңыз *</label>
                <textarea 
                  value={formData.currentSkills}
                  onChange={(e) => handleInputChange("currentSkills", e.target.value)}
                  className={`${inputClass} resize-none min-h-[80px]`}
                  placeholder="Python білемін, адамдармен жақсы сөйлесемін..."
                />
                {errors.currentSkills && <p className="text-red-400 text-xs mt-1">{errors.currentSkills}</p>}
              </div>

              <div>
                <label className={labelClass}>Жұмыс стиліңіз *</label>
                <select 
                  value={formData.workStyle}
                  onChange={(e) => handleInputChange("workStyle", e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>Таңдаңыз</option>
                  <option value="шығармашылық">Шығармашылық</option>
                  <option value="техникалық">Техникалық</option>
                  <option value="зерттеушілік">Зерттеушілік</option>
                  <option value="адамдармен жұмыс">Адамдармен жұмыс</option>
                  <option value="басқару">Басқару</option>
                  <option value="кәсіпкерлік">Кәсіпкерлік</option>
                  <option value="аралас">Аралас</option>
                </select>
                {errors.workStyle && <p className="text-red-400 text-xs mt-1">{errors.workStyle}</p>}
              </div>

              <div>
                <label className={labelClass}>AI туралы білім деңгейіңіз *</label>
                <select 
                  value={formData.aiKnowledgeLevel}
                  onChange={(e) => handleInputChange("aiKnowledgeLevel", e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>Таңдаңыз</option>
                  <option value="мүлде білмеймін">Мүлде білмеймін</option>
                  <option value="аздап білемін">Аздап білемін</option>
                  <option value="орташа білемін">Орташа білемін</option>
                  <option value="жақсы қолданамын">Жақсы қолданамын</option>
                  <option value="кәсіби деңгейде қолданамын">Кәсіби деңгейде қолданамын</option>
                </select>
                {errors.aiKnowledgeLevel && <p className="text-red-400 text-xs mt-1">{errors.aiKnowledgeLevel}</p>}
              </div>

              <div>
                <label className={labelClass}>Үйренгіңіз келетін бағыттар</label>
                <input 
                  type="text" 
                  value={formData.desiredDirections}
                  onChange={(e) => handleInputChange("desiredDirections", e.target.value)}
                  className={inputClass} 
                  placeholder="Жасанды интеллект, Data Science..."
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center mt-10">
        <button 
          onClick={handleBack}
          className={`flex items-center space-x-2 text-slate-400 hover:text-white transition-colors ${step === 1 ? 'invisible' : 'visible'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Артқа</span>
        </button>
        
        <button 
          onClick={handleNext}
          className="btn-primary px-6 py-3 rounded-xl font-medium text-white flex items-center space-x-2"
        >
          <span>{step === 3 ? "Нәтижені алу" : "Жалғастыру"}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
