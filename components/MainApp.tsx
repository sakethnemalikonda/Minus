import React, { useState } from "react";
import ReportView from "./ReportView";
import FormInterface from "./FormInterface";
import { Workflow, Minimize2, AlertTriangle, RefreshCw } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { MINUS_RULEBOOK, GENERATE_USER_PROMPT } from "./Prompts";

const MainApp = () => {
  const [view, setView] = useState<'chat' | 'analyzing' | 'report' | 'error'>('chat');
  const [reportContent, setReportContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const startAnalysis = async (formData: any) => {
      // 1. Persistence (Optional, good for UX)
      try { localStorage.setItem('minus_user_temp_data', JSON.stringify(formData)); } catch (e) {}

      // 2. UI State
      setView('analyzing');
      setErrorMessage("");

      try {
        console.log(">> Initializing Gemini Client...");
        
        // Use environment variable strictly as per guidelines
        if (!process.env.API_KEY) {
            throw new Error("Gemini API Key is missing. Please check your environment configuration.");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const userPrompt = GENERATE_USER_PROMPT(JSON.stringify(formData, null, 2));

        console.log(">> Sending request to Gemini...");

        // Using gemini-3-flash-preview for fast, high-quality text generation
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: userPrompt,
            config: {
                systemInstruction: MINUS_RULEBOOK,
                temperature: 0.1, // Strict adherence to financial rules
                maxOutputTokens: 4000,
            }
        });

        const reportText = response.text;

        if (reportText) {
            console.log(">> Report generated successfully.");
            setReportContent(reportText);
            // 4. Success Transition
            setTimeout(() => {
                setView('report');
                localStorage.removeItem('minus_user_temp_data');
            }, 1500); // Slight delay to show the animation
        } else {
            throw new Error("AI returned success but no report content.");
        }

      } catch (error: any) {
          console.error("Analysis Failed:", error);
          // Enhance error message for common issues
          let msg = error.message || "Connection Failed";
          
          setErrorMessage(msg);
          setTimeout(() => setView('error'), 2000);
      }
  };

  const handleRetry = () => setView('chat');

  if (view === 'error') {
      return (
          <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-4">
              <div className="bg-white border-4 border-neo-red p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_#000000] text-center animate-in fade-in zoom-in duration-300">
                  <div className="inline-block p-4 bg-neo-red border-4 border-black mb-6">
                      <AlertTriangle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-black font-heading uppercase text-black mb-4">
                      Analysis Failed
                  </h2>
                  <div className="bg-neutral-100 border-2 border-black p-4 mb-8 font-mono text-sm text-red-600 break-words font-bold">
                      {errorMessage}
                  </div>
                  <button 
                    onClick={handleRetry}
                    className="bg-black text-white px-8 py-4 font-bold font-heading uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 mx-auto w-full"
                  >
                      <RefreshCw className="w-5 h-5" /> Try Again
                  </button>
              </div>
          </div>
      );
  }

  if (view === 'analyzing') {
      return (
          <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center relative overflow-hidden perspective-2000">
              <div className="absolute inset-0 bg-dot-grid opacity-20"></div>
              <div className="relative z-10 w-72 h-96 md:w-96 md:h-[30rem]">
                  <div className="relative w-full h-full preserve-3d animate-flip-slow">
                      <div className="absolute inset-0 backface-hidden bg-paper border-4 border-black shadow-[16px_16px_0px_0px_#00E699] flex flex-col items-center justify-center p-8 text-center">
                           <div className="border-4 border-black p-4 mb-6 bg-neo-yellow transform -rotate-3">
                               <Workflow className="w-12 h-12 text-black" />
                           </div>
                           <h2 className="text-3xl font-heading font-black uppercase text-black mb-2">Analyzing</h2>
                           <p className="font-mono text-sm font-bold text-slate-500 uppercase tracking-widest">Cashflow Structure</p>
                           <div className="w-full mt-8 space-y-3 opacity-50">
                               <div className="h-1 bg-black w-full"></div>
                               <div className="h-1 bg-black w-3/4 mx-auto"></div>
                               <div className="h-1 bg-black w-1/2 mx-auto"></div>
                           </div>
                      </div>
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-neo-black border-4 border-neo-mint shadow-[16px_16px_0px_0px_white] flex flex-col items-center justify-center p-8 text-center">
                           <div className="border-4 border-neo-mint p-4 mb-6 bg-black transform rotate-3">
                               <Minimize2 className="w-12 h-12 text-neo-mint" />
                           </div>
                           <h2 className="text-3xl font-heading font-black uppercase text-white mb-2">Optimizing</h2>
                           <p className="font-mono text-sm font-bold text-neo-mint uppercase tracking-widest">Pathways</p>
                           <div className="w-full mt-8 space-y-2 text-[10px] font-mono text-slate-600 text-left pl-8 opacity-60">
                               <div>{'>'} MAPPING_DEBT_VECTORS...</div>
                               <div>{'>'} CHECKING_CASE_LAW...</div>
                               <div>{'>'} 28TH_RULE_APPLIED...</div>
                           </div>
                      </div>
                  </div>
              </div>
              <div className="mt-16 text-center">
                  <p className="font-mono text-xs font-bold text-slate-500 uppercase tracking-[0.2em] animate-pulse">Minus Protocol Active</p>
              </div>
          </div>
      );
  }

  if (view === 'report') {
      return <ReportView content={reportContent} />;
  }

  return (
    <div className="min-h-screen bg-obsidian w-full flex flex-col relative pt-32 pb-10 md:py-10 px-4 md:px-0 items-center">
       <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
       <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
           <FormInterface onSubmit={startAnalysis} />
       </div>
    </div>
  );
};

export default MainApp;