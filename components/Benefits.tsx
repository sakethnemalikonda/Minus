import React from "react";
import { Users, Landmark, Globe, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./Shared";

const Benefits = () => {
  const benefits = [
    { 
      id: 'PEOPLE',
      icon: Users, 
      title: "People", 
      desc: "They stop surviving money and start understanding it.",
      bg: "bg-neo-purple",
      text: "text-white"
    },
    { 
      id: 'BANKS',
      icon: Landmark, 
      title: "Banks", 
      desc: "Fewer defaults. Stronger borrowers. Cleaner balance sheets.",
      bg: "bg-white",
      text: "text-black" 
    },
    { 
      id: 'ECONOMY',
      icon: Globe, 
      title: "The Economy", 
      desc: "Less waste. More circulation. Stronger middle class.",
      bg: "bg-neo-blue",
      text: "text-black"
    }
  ];

  return (
    <section className="py-24 px-6 bg-neo-black border-t-4 border-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
           <h2 className="text-center text-4xl md:text-7xl font-heading font-black text-white mb-20 tracking-tighter uppercase">
             A &nbsp; Movement, <br/><span className="text-neo-mint">Not Magic.</span>
           </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {benefits.map((b, i) => (
                <ScrollReveal key={i} delay={i*100}>
                    <div className={`${b.bg} border-4 border-white p-8 h-full shadow-[8px_8px_0px_0px_#F2C94C] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#F2C94C] transition-all group`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-black border-2 border-black text-white shadow-[2px_2px_0px_0px_white]">
                                <b.icon className="w-6 h-6" />
                            </div>
                            <span className={`font-mono font-bold text-xs uppercase border-2 border-black px-2 py-1 bg-white text-black`}>
                                Win #{i+1}
                            </span>
                        </div>
                        <h3 className={`text-3xl font-heading font-black uppercase mb-4 ${b.text}`}>
                            {b.title}
                        </h3>
                        {/* Forced slate-900 color for black-text cards to ensure visibility */}
                        <p className={`font-mono font-bold text-sm ${b.text === 'text-white' ? 'text-white/90' : 'text-slate-900'}`}>
                            {b.desc}
                        </p>
                    </div>
                </ScrollReveal>
            ))}
        </div>

        <ScrollReveal delay={300}>
            <div className="bg-neo-mint border-4 border-black p-8 text-center max-w-3xl mx-auto shadow-[12px_12px_0px_0px_white] transform rotate-1">
                <p className="font-heading font-black text-xl md:text-3xl uppercase leading-tight text-black">
                    Even fixing 10% of household inefficiency can release <span className="bg-black text-white px-2">₹1 Lakh Crore</span> back into the economy.
                </p>
                <p className="font-mono font-bold text-sm text-slate-800 mt-4 uppercase">
                    Without creating a single rupee of risk.
                </p>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Benefits;