import React from "react";
import { ScrollReveal } from "./Shared";
import { Clock, TrendingUp } from "lucide-react";

const InvisibleEnemy = () => {
  return (
    <section className="py-24 px-6 bg-neo-black text-white border-b-4 border-white relative">
        <div className="max-w-6xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-16">
                     <span className="bg-neo-red text-black font-black font-mono px-4 py-1 uppercase tracking-widest border-2 border-white shadow-[4px_4px_0px_0px_white] mb-6 inline-block transform -rotate-2">
                        The Real Villain
                     </span>
                     <h2 className="text-5xl md:text-8xl font-black font-heading uppercase tracking-tighter leading-none mb-6">
                        Time <span className="text-neo-red">×</span> Interest
                     </h2>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-white bg-black shadow-[12px_12px_0px_0px_#00E699]">
                {/* Left - Dark Card */}
                <div className="p-12 border-b-4 md:border-b-0 md:border-r-4 border-white relative overflow-hidden group">
                    <div className="absolute top-0 left-0 bg-white text-black px-4 py-2 font-bold font-mono uppercase text-xs">No Alarms</div>
                    <div className="mt-8 relative z-10">
                        <Clock className="w-16 h-16 text-white mb-6" />
                        <h3 className="text-4xl font-heading font-black uppercase mb-4 text-white">Quiet Compounding</h3>
                        <p className="font-mono text-slate-400 text-lg">
                            "Interest doesn’t shout. It whispers. A little today. A little tomorrow."
                        </p>
                    </div>
                </div>

                {/* Right - Light Card */}
                <div className="p-12 bg-white text-black relative overflow-hidden group">
                    <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-bold font-mono uppercase text-xs">Too Much</div>
                    <div className="mt-8 relative z-10">
                        <TrendingUp className="w-16 h-16 text-neo-red mb-6" />
                        <h3 className="text-4xl font-heading font-black uppercase mb-4 text-black">Lifetime Later</h3>
                        <p className="font-mono text-black font-bold text-lg">
                            "The enemy is not debt. The enemy is letting debt age without control."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default InvisibleEnemy;