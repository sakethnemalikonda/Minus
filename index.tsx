import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import InvisibleEnemy from "./components/InvisibleEnemy";
import Doctor from "./components/Doctor";
import DNA from "./components/DNA";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import MainApp from "./components/MainApp";
import Menu from "./components/Menu";
import HomeLink from "./components/HomeLink";
import StartCTA from "./components/StartCTA";
import CalculatorWidget from "./components/CalculatorWidget";

const Landing = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="bg-obsidian text-slate-50 font-sans min-h-screen selection:bg-mint selection:text-white pb-0">
      <Hero />
      
      {/* Single professional white line under hero */}
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      </div>
      
      <Problem />
      <InvisibleEnemy />
      <Doctor />
      <DNA />
      <Benefits />
      <Footer />
      <StartCTA onStart={onStart} />
    </div>
  );
};

const App = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    window.scrollTo(0, 0);
    setStarted(true);
  };

  const handleHome = () => {
    window.scrollTo(0, 0);
    setStarted(false);
  };

  return (
    <div className="bg-obsidian min-h-screen text-slate-50 relative">
        <HomeLink onHome={handleHome} />
        <Menu />
        <CalculatorWidget />
        {!started ? <Landing onStart={handleStart} /> : <MainApp />}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);