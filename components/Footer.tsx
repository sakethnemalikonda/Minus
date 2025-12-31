import React from "react";
import { ShieldCheck } from "lucide-react";
import { ScrollReveal } from "./Shared";

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-white border-t-8 border-black text-center relative overflow-hidden text-black">
       <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>

       <div className="relative z-10 max-w-4xl mx-auto">
           <ScrollReveal>
              <div className="inline-flex items-center gap-3 bg-black border-2 border-black px-6 py-3 mb-12 shadow-[4px_4px_0px_0px_#00E699]">
                 <ShieldCheck className="w-6 h-6 text-neo-mint" />
                 <span className="text-lg font-black text-white uppercase tracking-widest font-heading">Economic Hygiene</span>
              </div>
           </ScrollReveal>

           <ScrollReveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto mb-16">
                  {["Minus does not store your data.", "Minus does not touch your money.", "Minus does not lock you in."].map((text, i) => (
                      <div key={i} className="bg-paper border-2 border-black p-4 shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 transition-transform">
                          <p className="font-mono font-bold text-black text-sm uppercase leading-relaxed">
                              {text}
                          </p>
                      </div>
                  ))}
              </div>
           </ScrollReveal>
           
           <div className="pt-12 border-t-4 border-black border-dashed flex flex-col justify-center items-center gap-4">
              <p className="text-black text-2xl font-heading font-black uppercase">
                 Trust is not claimed. It is designed.
              </p>
              <p className="text-slate-500 text-xs font-mono uppercase font-bold">
                 Minus Protocol v1.0 • System Ready
              </p>
           </div>
       </div>
    </footer>
  );
};

export default Footer;