"use client";

import { useState } from "react";
import Questionnaire from "@/components/Questionnaire";
import LoadingSimulation from "@/components/LoadingSimulation";
import ResultDashboard from "@/components/ResultDashboard";
import { QuestionnaireData, AiResponseData } from "@/types";

type ViewState = "questionnaire" | "loading" | "result" | "error";

export default function SimulationPage() {
  const [viewState, setViewState] = useState<ViewState>("questionnaire");
  const [resultData, setResultData] = useState<AiResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (data: QuestionnaireData) => {
    setViewState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("AI уақытша жауап бере алмады. Бірнеше секундтан кейін қайта көріңіз.");
      }

      const result = await response.json();
      setResultData(result);
      setViewState("result");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Интернет байланысын тексеріңіз немесе кейінірек қайталап көріңіз.");
      setViewState("error");
    }
  };

  const handleRestart = () => {
    setResultData(null);
    setViewState("questionnaire");
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center">
      {viewState === "questionnaire" && (
        <div className="w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Болашақ Симуляциясы</h1>
            <p className="text-slate-400">Деректеріңізді енгізіп, 2050 жылғы статусыңызды біліңіз</p>
          </div>
          <Questionnaire onSubmit={handleFormSubmit} />
        </div>
      )}

      {viewState === "loading" && <LoadingSimulation />}

      {viewState === "result" && resultData && (
        <ResultDashboard data={resultData} onRestart={handleRestart} />
      )}

      {viewState === "error" && (
        <div className="glass-panel p-8 rounded-3xl max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-white">Қате шықты</h2>
          <p className="text-slate-400">{errorMessage}</p>
          <button onClick={handleRestart} className="btn-primary w-full py-3 rounded-xl mt-6">
            Қайта көру
          </button>
        </div>
      )}
    </div>
  );
}
