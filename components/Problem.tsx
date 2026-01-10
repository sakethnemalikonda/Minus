import React from "react";
import { ScrollReveal } from "./Shared";
import { AlertTriangle, Clock, ShieldAlert, CreditCard, BrainCircuit } from "lucide-react";

const Problem = () => {
  const problems = [
    { 
        icon: BrainCircuit,
        title: "A Strange Reality", 
        desc: "People earn. People save. People still struggle. Why? Because money is running in the wrong direction.", 
        bg: "bg-neo-red", text: "text-black" 
    },
    { 
        icon: Clock,
        title: "Long EMIs", 
        desc: "Loans are paid for decades without understanding how interest grows daily. Time is stealing from you.", 
        bg: "bg-white", text: "text-black" 
    },
    { 
        icon: ShieldAlert,
        title: "Hurting Safety", 
        desc: "Money sleeps peacefully in FDs... while high-interest loans stay wide awake. A costly mismatch.", 
        bg: "bg-neo-blue", text: "text-black" 
    },
    { 
        icon: CreditCard,
        title: "Heavy Plastic", 
        desc: "Credit cards feel small in the hand — but heavy on the future. They are not free money.", 
        bg: "bg-black", text: "text-white" 
    },
  ];

  return (
    <section className="py-24 px-6 bg-paper border-b-4 border-black relative overflow-hidden text-black">
        {/* Background Noise */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#000_0px,#000_2px,transparent_2px,transparent_12px)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row gap-8 items-start mb-20">
                    <div className="bg-black text-white p-4 border-4 border-black shadow-[8px_8px_0px_0px_#FF725E] transform -rotate-1">
                        <h2 className="text-4xl md:text-6xl font-heading font-black uppercase leading-none">
                            The Quiet<br/>Crisis.
                        </h2>
                    </div>
                    <div className="flex-1 pl-6 border-l-8 border-black">
                        <p className="text-xl font-bold font-mono mb-2 text-black">
                            What is actually stressing the economy?
                        </p>
                        <p className="text-slate-600 font-mono text-sm font-bold">
                            This is not financial irresponsibility. This is structural confusion.
                        </p>
                    </div>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {problems.map((p, i) => (
                    <ScrollReveal key={i} delay={i * 100} className="h-full">
                        <div className={`h-full border-4 border-black p-6 shadow-[8px_8px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_black] transition-all flex flex-col justify-between group ${p.bg}`}>
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 border-2 border-black bg-white text-black font-bold font-mono text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]`}>
                                        0{i+1}
                                    </div>
                                    <p.icon className={`w-8 h-8 ${p.text} stroke-[2px]`} />
                                </div>
                                <h3 className={`text-2xl font-black font-heading uppercase leading-tight mb-4 ${p.text}`}>
                                    {p.title}
                                </h3>
                            </div>
                            <p className={`font-mono font-bold text-sm leading-relaxed border-t-2 border-dashed border-current pt-4 ${p.text} opacity-100`}>
                                {p.desc}
                            </p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            <ScrollReveal delay={400}>
                <div className="mt-16 text-center">
                    <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_#F2C94C] transform rotate-1">
                        <h3 className="font-heading font-black text-2xl uppercase text-black">The Invisible Exhaustion</h3>
                        <p className="font-mono text-sm font-bold text-slate-600 mt-2">
                            Financial decisions are postponed because people are already overwhelmed by life.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
  );
};

export default Problem;