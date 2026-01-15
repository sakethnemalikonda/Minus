'use client';

import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import InvisibleEnemy from "../components/InvisibleEnemy";
import Doctor from "../components/Doctor";
import DNA from "../components/DNA";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import MainApp from "../components/MainApp";
import Menu from "../components/Menu";
import HomeLink from "../components/HomeLink";
import StartCTA from "../components/StartCTA";
import CalculatorWidget from "../components/CalculatorWidget";

// Logic moved from old index.tsx
const Landing = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="bg-obsidian text-slate-50 font-sans min-h-screen selection:bg-mint selection:text-white pb-0">
      <Hero />
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

export default function Page() {
  const [started, setStarted] = useState(false);
  
  // Handle client-side mounting for window interactions
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const handleStart = () => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    setStarted(true);
  };

  const handleHome = () => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    setStarted(false);
  };

  if (!isMounted) return null;

  return (
    <div className="bg-obsidian min-h-screen text-slate-50 relative">
        <HomeLink onHome={handleHome} />
        <Menu />
        <CalculatorWidget />
        {!started ? <Landing onStart={handleStart} /> : <MainApp />}
    </div>
  );
}
