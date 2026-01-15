import React, { useState, useEffect } from "react";
import { X, Menu as MenuIcon, ChevronRight, ArrowLeft, FileText, ExternalLink, Minimize2, Maximize2 } from "lucide-react";
import { MarkdownRenderer } from "./Shared";
import { PUBLIC_PRINCIPLES, LEDGER_CASES, MINUS_TERMS } from "./Prompts";

// --- Internal Record Window Component ---
const RecordPage = ({ title, onClose }: { title: string, onClose: () => void }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  // Lock body scroll when this modal is open to prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isRuleBook = title === "Rule Book";
  const isLedger = title === "Ledger";
  const isTerms = title === "Terms & Conditions";

  const getRenderContent = () => {
    if (isRuleBook) {
      return (
        <div className="prose prose-invert prose-p:text-black prose-headings:text-black prose-strong:text-black prose-li:text-black max-w-none animate-in fade-in duration-500">
          <div className="bg-yellow-50 border-2 border-black p-6 mb-6 font-mono text-sm text-black">
             // SYSTEM_NOTICE: These principles are immutable.
          </div>
          <MarkdownRenderer content={PUBLIC_PRINCIPLES} />
        </div>
      );
    }

    if (isTerms) {
      return (
        <div className="prose prose-invert prose-p:text-black prose-headings:text-black max-w-none animate-in fade-in duration-500">
          <MarkdownRenderer content={MINUS_TERMS} />
        </div>
      );
    }

    if (isLedger) {
      if (selectedCaseId) {
        const caseData = LEDGER_CASES.find(c => c.id === selectedCaseId);
        if (caseData) {
          return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <button 
                 onClick={() => setSelectedCaseId(null)}
                 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-black px-4 py-2 border-2 border-transparent hover:border-black hover:bg-white hover:text-black mb-6 transition-all shadow-neo-sm"
               >
                 <ArrowLeft className="w-4 h-4" /> Return to Index
               </button>
               <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                   <div className="prose prose-invert prose-p:text-slate-800 prose-headings:text-black max-w-none">
                     <MarkdownRenderer content={caseData.content} />
                   </div>
               </div>
            </div>
          );
        }
      }

      // Ledger List View
      return (
        <div className="space-y-4 animate-in fade-in duration-500">
           <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-black">Case Database</p>
              <p className="text-xs font-mono font-bold bg-neo-mint px-2 border border-black text-black">LIVE</p>
           </div>
           
           <div className="grid gap-3">
             {LEDGER_CASES.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setSelectedCaseId(item.id)}
                 className="w-full text-left p-4 bg-white border-2 border-black hover:bg-neo-yellow transition-all group shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_black]"
               >
                  <div className="flex items-center justify-between mb-2">
                     <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-bold">{item.id}</span>
                     <ExternalLink className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-sm font-black text-black mb-1 uppercase font-heading">{item.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-1 font-mono">{item.desc}</p>
               </button>
             ))}
           </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 opacity-80 animate-in fade-in duration-500 py-12">
         <div className="w-20 h-20 bg-neutral-200 border-4 border-black flex items-center justify-center">
            <Minimize2 className="w-8 h-8 text-black" />
         </div>
         <div className="text-center">
             <p className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest inline-block mb-2">Access Denied</p>
             <p className="text-black font-mono text-sm">Content segment locked.</p>
         </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4 md:p-8 animate-in fade-in duration-300">
       
       {/* OS Window Container */}
       <div className="bg-paper w-full max-w-3xl h-[85vh] flex flex-col border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden animate-in zoom-in-95 duration-300">
          
          {/* Title Bar */}
          <div className="h-12 bg-neo-blue border-b-4 border-black flex justify-between items-center px-4 select-none">
             <div className="flex items-center gap-3">
               <div className="flex gap-1.5">
                   <div className="w-3 h-3 bg-white border border-black"></div>
                   <div className="w-3 h-3 bg-white border border-black"></div>
                   <div className="w-3 h-3 bg-white border border-black"></div>
               </div>
               <span className="text-white font-mono font-bold text-xs uppercase tracking-wider ml-2">C:/MINUS/{title.replace(/\s/g, '_').toUpperCase()}.EXE</span>
             </div>
             <button 
                onClick={onClose} 
                className="w-8 h-8 bg-neo-red border-2 border-black flex items-center justify-center hover:bg-red-600 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_black]"
             >
                <X className="w-5 h-5 text-white stroke-[3]" />
             </button>
          </div>

          {/* Content Area (White Paper) */}
          <div className="flex-1 bg-paper p-0 overflow-hidden flex flex-col">
             {/* Toolbar */}
             <div className="bg-neutral-200 border-b-2 border-black px-4 py-2 flex gap-4 text-xs font-mono font-bold text-black">
                 <span className="cursor-pointer hover:underline">FILE</span>
                 <span className="cursor-pointer hover:underline">EDIT</span>
                 <span className="cursor-pointer hover:underline">VIEW</span>
                 <span className="flex-grow text-right text-slate-500">READ-ONLY MODE</span>
             </div>

             <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent overscroll-contain">
                 {getRenderContent()}
             </div>
          </div>
          
          {/* Status Bar */}
          <div className="h-8 bg-neutral-800 border-t-4 border-black flex justify-between items-center px-4 text-[10px] text-white font-mono uppercase">
             <span>MEM: 64K OK</span>
             <span>Ln 1, Col 1</span>
          </div>
       </div>
    </div>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<string | null>(null);

  const menuItems = [
    { title: "Rule Book", color: "hover:bg-neo-yellow" },
    { title: "Ledger", color: "hover:bg-neo-mint" },
    { title: "Terms & Conditions", color: "hover:bg-neo-blue hover:text-white" }
  ];

  return (
    <>
      {/* NeoPOP Hamburger Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 group focus:outline-none"
      >
         <div className="bg-white border-2 border-black p-2.5 shadow-[4px_4px_0px_0px_black] transition-all group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_black] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <MenuIcon className="w-6 h-6 text-black" />
         </div>
      </button>

      {/* Sidebar Overlay - Solid NeoPOP */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
           
           {/* Drawer */}
           <div className="relative w-full max-w-sm h-full bg-white border-r-4 border-black shadow-[10px_0_0_0_rgba(0,0,0,0.2)] flex flex-col animate-in slide-in-from-left duration-300">
              
              {/* Header */}
              <div className="p-8 border-b-4 border-black bg-neo-black text-white flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter font-heading">Menu</h2>
                    <p className="text-[10px] font-mono text-neo-mint mt-1">System Navigation</p>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="bg-white text-black border-2 border-black p-1 hover:bg-neo-red hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 p-6 space-y-4 bg-paper">
                 {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveRecord(item.title)}
                      className={`w-full text-left px-6 py-5 border-2 border-black bg-white text-black font-bold text-lg uppercase font-heading tracking-wide transition-all shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] active:translate-y-0 active:shadow-[2px_2px_0px_0px_black] flex items-center justify-between group ${item.color}`}
                    >
                       <span>{item.title}</span>
                       <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                 ))}
              </div>

              {/* Footer */}
              <div className="p-8 border-t-4 border-black bg-neutral-100">
                 <div className="bg-black text-white px-4 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#00E699] mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-center">Protocol v1.0 Live</p>
                 </div>
                 <p className="text-[10px] text-center text-slate-500 font-mono font-bold">
                    SESSION ID: {Math.random().toString(36).substring(7).toUpperCase()}
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* Internal Window Overlay */}
      {activeRecord && (
        <RecordPage title={activeRecord} onClose={() => setActiveRecord(null)} />
      )}
    </>
  );
};

export default Menu;