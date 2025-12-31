import React from "react";
import GlobeVisual from "./GlobeVisual";
import DotGrid from "./DotGrid";
import { ScrollReveal } from "./Shared";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-neo-black border-b-8 border-black">
      {/* Globe Background */}
      <GlobeVisual />

      {/* Interactive Dot Grid */}
      <DotGrid />
      
      {/* Overlay to ensure text readability over globe if needed */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      {/* Floating Elements */}
      <div className="absolute top-[20%] left-[5%] md:left-[10%] z-20 animate-float" style={{ animationDelay: '0s' }}>
          <div className="bg-neo-red border-4 border-black p-4 shadow-[8px_8px_0px_0px_white] transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <span className="font-black font-heading text-xl md:text-3xl uppercase text-white tracking-widest">
                  Subtract Debt.
              </span>
          </div>
      </div>

      <div className="absolute bottom-[20%] right-[5%] md:right-[10%] z-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="bg-neo-mint border-4 border-black p-4 shadow-[8px_8px_0px_0px_white] transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <span className="font-black font-heading text-xl md:text-3xl uppercase text-black tracking-widest">
                  Add Life.
              </span>
          </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center mt-0">
        <ScrollReveal>
            {/* Massive Title with Split Colors on separate lines */}
            <h1 className="text-7xl md:text-[10rem] font-black font-heading tracking-tighter leading-[0.85] mb-0 cursor-default">
                <span className="block text-white drop-shadow-[4px_4px_0px_black] mb-2 md:mb-4">THE</span>
                <span className="block text-black hover:text-white transition-colors duration-300 drop-shadow-[4px_4px_0px_white] hover:drop-shadow-[4px_4px_0px_#00E699]">ECONOMY</span>
            </h1>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;