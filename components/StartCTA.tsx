import React from "react";
import { ArrowRight, Star } from "lucide-react";

const StartCTA = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="py-32 bg-neo-yellow border-t-8 border-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,black_0px,black_2px,transparent_2px,transparent_40px)]"></div>
        </div>

        <div className="relative z-10 text-center px-4">
            <div className="mb-8 flex justify-center">
                {[1,2,3].map(i => (
                    <Star key={i} className="w-8 h-8 text-black fill-black animate-spin-slow mx-2" style={{ animationDuration: `${i*2}s` }}/>
                ))}
            </div>
            
            <p className="font-mono font-bold text-black text-sm md:text-lg uppercase tracking-widest mb-6 bg-white border-2 border-black inline-block px-4 py-1 shadow-[4px_4px_0px_0px_black]">
                This is not magic. This is not motivation.
            </p>

            <h2 className="text-5xl md:text-8xl font-black font-heading text-black uppercase tracking-tighter mb-12 drop-shadow-[4px_4px_0px_white]">
                This Is <br/>Order.
            </h2>
            
            <div className="mb-12 space-y-2">
                {["If you are tired of guessing...", "If you are tired of waiting...", "If you are tired of fear..."].map((line, i) => (
                    <p key={i} className="font-mono font-bold text-black text-sm uppercase">{line}</p>
                ))}
            </div>

            <button
                onClick={onStart}
                className="group relative inline-flex"
            >
                <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-0 group-active:translate-y-0"></div>
                <div className="relative bg-neo-mint border-4 border-black px-12 py-6 flex items-center gap-6 group-hover:-translate-y-1 group-hover:-translate-x-1 group-active:translate-x-0 group-active:translate-y-0 transition-transform">
                    <span className="text-2xl md:text-4xl font-black font-heading uppercase text-black tracking-widest">
                        ENTER
                    </span>
                    <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-black" />
                </div>
            </button>
        </div>
    </section>
  );
};

export default StartCTA;