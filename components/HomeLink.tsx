import React from "react";

const HomeLink = ({ onHome }: { onHome: () => void }) => {
  return (
    <button 
      onClick={onHome}
      className="fixed top-6 left-24 z-50 group"
    >
      <div className="bg-black text-white px-4 py-2.5 border-2 border-white font-heading font-black text-lg tracking-tight shadow-[4px_4px_0px_0px_white] transition-all group-hover:bg-white group-hover:text-black group-hover:border-black group-hover:shadow-[4px_4px_0px_0px_black] group-active:translate-y-[2px] group-active:shadow-none">
         Minus<span className="text-neo-mint group-hover:text-neo-red">.</span>
      </div>
    </button>
  );
};

export default HomeLink;