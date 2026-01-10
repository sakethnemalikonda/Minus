import React from "react";
import { ScrollReveal } from "./Shared";
import { Check, X, ArrowRight } from "lucide-react";
import DNAVisual from "./DNAVisual";

const DNA = () => {
  return (
    <section className="bg-neo-blue border-b-4 border-black relative">
        {/* PART 1: DNA - Blue Background (White text is ok) */}
        <div className="py-24 px-6 border-b-4 border-black relative overflow-hidden">
            {/* Animated Background */}
            <DNAVisual />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <h2 className="text-center text-white text-6xl md:text-9xl font-black font-heading uppercase mb-16 tracking-tighter drop-shadow-[4px_4px_0px_black]">
                        The DNA
                    </h2>
                    
                    {/* Split into 3 lines */}
                    <div className="text-center font-mono font-bold text-white text-xl md:text-2xl mb-16 max-w-3xl mx-auto bg-black border-4 border-white p-6 shadow-[8px_8px_0px_0px_black] space-y-2 relative z-20">
                        <p>Minus is not an app.</p>
                        <p>Not a bank.</p>
                        <p>Not an investment platform.</p>
                        <div className="pt-4 mt-4 border-t-2 border-white/20">
                            <span className="text-neo-mint uppercase tracking-wider">Minus is a clarity engine.</span>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Refuses */}
                    <ScrollReveal delay={100} className="h-full">
                        <div className="bg-neo-red border-4 border-black p-8 h-full shadow-[8px_8px_0px_0px_black]">
                            <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
                                <h3 className="text-3xl font-heading font-black uppercase text-black">We Refuse</h3>
                                <X className="w-12 h-12 text-black" />
                            </div>
                            <ul className="space-y-4">
                                {["No Stocks", "No Crypto", "No Mutual Funds", "No New Loans", "No Empty Promises"].map((txt, i) => (
                                    <li key={i} className="font-mono font-bold text-lg uppercase text-black flex items-center gap-3">
                                        <div className="w-4 h-4 bg-black"></div> {txt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Does */}
                    <ScrollReveal delay={200} className="h-full">
                        <div className="bg-white border-4 border-black p-8 h-full shadow-[8px_8px_0px_0px_white]">
                            <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
                                <h3 className="text-3xl font-heading font-black uppercase text-black">We Quietly Do</h3>
                                <Check className="w-12 h-12 text-neo-mint bg-black rounded-none p-1 border-2 border-black" />
                            </div>
                            <ul className="space-y-4">
                                {["Reorder Cashflow", "Kill Unnecessary Interest", "Shorten Timelines", "Restore Calm", "Remove Friction"].map((txt, i) => (
                                    <li key={i} className="font-mono font-bold text-lg uppercase text-black flex items-center gap-3">
                                        <div className="w-4 h-4 bg-neo-mint border-2 border-black"></div> {txt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>

        {/* PART 2: MOMENT OF REALIZATION - Yellow Background (Needs Black Text) */}
        <div className="py-24 px-6 bg-neo-yellow text-black">
            <div className="max-w-5xl mx-auto text-center">
                 <ScrollReveal>
                    <h3 className="text-4xl md:text-6xl font-black font-heading uppercase text-black mb-12">
                        How It Actually Works
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {[
                            "1. Tell Minus flow", 
                            "2. Minus maps time", 
                            "3. Finds mismatches", 
                            "4. Rearranges safely"
                        ].map((step, i) => (
                            <div key={i} className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 transition-transform">
                                <p className="font-heading font-black text-xl uppercase leading-tight text-black">{step}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black text-white border-4 border-white p-8 inline-block shadow-[12px_12px_0px_0px_black] transform rotate-1">
                        <p className="font-mono font-bold text-lg md:text-xl uppercase">
                            What comes out is not advice. <br/>
                            <span className="text-neo-mint">It’s a map out of debt.</span>
                        </p>
                    </div>
                 </ScrollReveal>
            </div>
        </div>
        
        {/* PART 3: THE LEDGER (STORY) - Paper Background (Needs Black Text) */}
        <div className="py-24 px-6 bg-paper border-t-4 border-black text-black">
             <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                             <div className="inline-block bg-neo-mint border-2 border-black px-3 py-1 font-mono font-bold text-xs uppercase mb-4 text-black">
                                 The Ledger: Case #001
                             </div>
                             <h3 className="text-4xl font-heading font-black uppercase mb-6 text-black">Where Minus Was Born</h3>
                             <p className="font-mono font-bold text-slate-700 mb-6 leading-relaxed">
                                 A simple household. A disciplined father. A 15-year education loan. Nothing was "wrong". Everything was inefficient.
                             </p>
                             <div className="space-y-2 border-l-4 border-black pl-4">
                                 <p className="font-mono text-sm text-slate-500 font-bold">EMI paid regularly.</p>
                                 <p className="font-mono text-sm text-slate-500 font-bold">FD earning safely.</p>
                                 <p className="font-mono text-sm text-black font-black uppercase">Loan quietly compounding.</p>
                             </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#EB5757]">
                                <h4 className="font-heading font-black text-2xl uppercase mb-4 border-b-2 border-black pb-2 text-black">The Result</h4>
                                <ul className="space-y-4">
                                    <li className="flex justify-between font-mono font-bold text-lg text-black">
                                        <span>Income:</span> <span className="text-slate-400">Same</span>
                                    </li>
                                    <li className="flex justify-between font-mono font-bold text-lg text-black">
                                        <span>Lifestyle:</span> <span className="text-slate-400">Same</span>
                                    </li>
                                    <li className="flex justify-between font-mono font-bold text-lg bg-neo-yellow p-1 border border-black text-black">
                                        <span>Timing:</span> <span>Optimized</span>
                                    </li>
                                    <li className="pt-4 mt-4 border-t-2 border-dashed border-black">
                                        <p className="font-heading font-black text-3xl uppercase leading-none text-black">
                                            15 Years <ArrowRight className="inline w-6 h-6"/> ~2 Years
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
             </div>
        </div>
    </section>
  );
};

export default DNA;