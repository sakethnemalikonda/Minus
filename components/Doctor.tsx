import React from "react";
import { ScrollReveal } from "./Shared";
import { Stethoscope, Activity, ClipboardList } from "lucide-react";

const Doctor = () => {
  return (
    <section className="py-24 px-6 bg-white relative border-b-4 border-black overflow-hidden text-black">
        {/* Decorative Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                
                <div className="w-full md:w-1/2">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 border-4 border-black px-6 py-2 bg-neo-mint shadow-[4px_4px_0px_0px_black] mb-8 transform -rotate-1">
                            <Stethoscope className="w-6 h-6 text-black" />
                            <span className="font-black font-heading text-lg uppercase text-black">Enter The Doctor</span>
                        </div>
                        
                        {/* Forced 2 Lines */}
                        <h2 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter text-black leading-[1.0] mb-8">
                            <span className="block">We don't sell.</span>
                            <span className="block bg-neo-blue text-white px-2 w-fit transform -rotate-1 mt-2">We Diagnose.</span>
                        </h2>
                        
                        <p className="text-xl font-bold font-mono text-black mb-8 border-l-8 border-neo-yellow pl-6">
                            When a body is sick, you don't gamble. You diagnose. Minus asks one question: <br/><br/>
                            <span className="bg-black text-white px-1">"Where is money leaking?"</span>
                        </p>
                    </ScrollReveal>
                </div>

                <div className="w-full md:w-1/2">
                    <ScrollReveal delay={200}>
                        <div className="bg-paper border-4 border-black p-8 shadow-[12px_12px_0px_0px_black] relative transform rotate-2 hover:rotate-0 transition-transform duration-300">
                             <div className="absolute -top-6 -left-6 bg-neo-red border-4 border-black p-4 rounded-none shadow-[4px_4px_0px_0px_black]">
                                 <Activity className="w-8 h-8 text-white" />
                             </div>
                             
                             {/* Moved 'The Protocol' further right */}
                             <h3 className="text-3xl font-black font-heading uppercase border-b-4 border-black pb-4 mb-6 text-black ml-12">The Protocol</h3>
                             
                             <div className="space-y-6">
                                 <p className="font-mono font-bold text-lg leading-tight text-black">
                                     Then it closes the leak.
                                 </p>
                                 <ul className="space-y-3">
                                    <li className="flex items-center gap-3 font-mono font-bold text-black uppercase">
                                        <div className="w-4 h-4 bg-black"></div> Not with Force.
                                    </li>
                                    <li className="flex items-center gap-3 font-mono font-bold text-black uppercase">
                                        <div className="w-4 h-4 bg-black"></div> Not with Fear.
                                    </li>
                                    <li className="flex items-center gap-3 font-mono font-bold text-white bg-black px-2 py-1 uppercase shadow-[2px_2px_0px_0px_#00E699]">
                                        <div className="w-3 h-3 bg-neo-mint"></div> But with Structure.
                                    </li>
                                 </ul>
                             </div>

                             <div className="mt-8 pt-6 border-t-4 border-black border-dashed flex items-center justify-between">
                                 <ClipboardList className="w-6 h-6 text-slate-400" />
                                 <span className="font-mono font-bold text-xs uppercase tracking-widest text-slate-500">Diagnosis Complete</span>
                             </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Doctor;