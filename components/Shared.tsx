
import React, { useState, useEffect, useRef } from "react";

// --- Helpers ---
export const parseBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-current font-black">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const generateId = () => Math.random().toString(36).substring(2, 9);

// --- Components ---

/**
 * ScrollReveal component that triggers a fade-in and slide-up animation when it enters the viewport.
 */
export const ScrollReveal = ({ children, className = "", delay = 0, threshold = 0.2 }: { children?: React.ReactNode, className?: string, delay?: number, threshold?: number, key?: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: threshold, rootMargin: "0px 0px -10% 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const MarkdownRenderer = ({ content }: { content: string }) => {
  const lines = content.split("\n");
  const renderedElements: React.ReactNode[] = [];
  
  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  const flushTable = (key: number) => {
    if (tableRows.length === 0) return null;
    return (
      <div key={`table-${key}`} className="my-8 overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <table className="w-full text-sm text-left">
          <thead className="bg-black text-white border-b-2 border-black">
            <tr>
              {tableHeader.map((th, i) => (
                <th key={i} className="px-4 py-3 font-black uppercase tracking-wider whitespace-nowrap border-r border-white/20 last:border-r-0">{th}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black bg-white">
            {tableRows.map((row, i) => (
              <tr key={i} className="hover:bg-yellow-50 transition-colors">
                {row.map((td, j) => (
                  <td key={j} className="px-4 py-3 text-black font-medium whitespace-nowrap border-r-2 border-black last:border-r-0">{parseBold(td)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("|")) {
      const cols = trimmed.split("|").filter(c => c.trim() !== "").map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHeader = cols;
        tableRows = [];
      } else if (trimmed.includes("---")) {
        // Skip separator
      } else {
        tableRows.push(cols);
      }
      return;
    } else if (inTable) {
      renderedElements.push(flushTable(index));
      inTable = false;
    }

    if (trimmed.startsWith("### ")) {
      renderedElements.push(<h3 key={index} className="text-black font-black text-xl md:text-2xl mt-8 mb-4 tracking-tight uppercase font-heading">{parseBold(trimmed.replace("### ", ""))}</h3>);
    } else if (trimmed.startsWith("## ")) {
      renderedElements.push(<h2 key={index} className="text-black font-black text-2xl md:text-3xl mt-10 mb-6 border-b-4 border-black pb-2 tracking-tighter uppercase font-heading">{parseBold(trimmed.replace("## ", ""))}</h2>);
    } else if (trimmed.startsWith("# ")) {
      renderedElements.push(<h1 key={index} className="text-black font-black text-3xl md:text-4xl mt-10 mb-6 tracking-tighter uppercase font-heading bg-neo-yellow inline-block px-2 border-2 border-black shadow-[4px_4px_0px_0px_black] transform -rotate-1">{parseBold(trimmed.replace("# ", ""))}</h1>);
    } else if (trimmed.startsWith("- ")) {
       renderedElements.push(<li key={index} className="ml-6 list-disc text-slate-800 mb-2 leading-relaxed font-bold pl-2 marker:text-black">{parseBold(trimmed.replace("- ", ""))}</li>);
    } else if (trimmed.startsWith("> ")) {
       renderedElements.push(
         <div key={index} className="my-6 border-l-4 border-black pl-6 py-2 bg-neutral-100 italic font-medium text-slate-800">
            {parseBold(trimmed.replace("> ", ""))}
         </div>
       );
    } else if (trimmed.length > 0) {
      renderedElements.push(<p key={index} className="mb-4 text-slate-800 leading-relaxed font-medium">{parseBold(trimmed)}</p>);
    }
  });

  if (inTable) renderedElements.push(flushTable(lines.length));
  return <div>{renderedElements}</div>;
};

export const SectionCard = ({ 
  title, 
  icon: Icon, 
  children, 
  className = "" 
}: { 
  title: string; 
  icon: any; 
  children?: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`bg-white border-2 border-black p-8 shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm ${className}`}>
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2.5 bg-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black font-heading">{title}</h3>
      </div>
      <div className="text-slate-800 font-medium">
        {children}
      </div>
    </div>
  );
};
