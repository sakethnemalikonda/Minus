import React, { useState } from 'react';
import { X, Delete, Calculator } from 'lucide-react';

const CalculatorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('0');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string>('');

  const handleToggle = () => setIsOpen(!isOpen);

  const handlePress = (val: string) => {
    // If we have a result and user types a number, start fresh.
    if (result !== null && !['+', '-', '*', '/', '%'].includes(val)) {
        setInput(val);
        setResult(null);
        setHistory('');
        return;
    }
    
    // If we have a result and user types an operator, continue with that result.
    if (result !== null && ['+', '-', '*', '/', '%'].includes(val)) {
        setInput(result + val);
        setResult(null);
        setHistory('');
        return;
    }

    // Prevent multiple decimals in the same number segment
    if (val === '.') {
        const lastOperatorIndex = Math.max(
            input.lastIndexOf('+'), 
            input.lastIndexOf('-'), 
            input.lastIndexOf('*'), 
            input.lastIndexOf('/')
        );
        const currentSegment = lastOperatorIndex === -1 ? input : input.slice(lastOperatorIndex + 1);
        if (currentSegment.includes('.')) return;
    }

    if (input === '0' && !['+', '-', '*', '/', '%', '.'].includes(val)) {
      setInput(val);
    } else {
      setInput(prev => prev + val);
    }
  };

  const handleClear = () => {
    setInput('0');
    setResult(null);
    setHistory('');
  };

  const handleDelete = () => {
    if (result !== null) {
        handleClear();
        return;
    }
    if (input.length === 1) {
      setInput('0');
    } else {
      setInput(prev => prev.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    try {
      // Basic sanitization
      // Replace visual '×' if used (though we use * in state)
      // We are using standard operators in state for simplicity
      const sanitized = input.replace(/%/g, '/100');

      // Check for empty or invalid ending
      if (/[+\-*/.]$/.test(sanitized)) return;

      // eslint-disable-next-line no-eval
      const res = eval(sanitized); 
      
      if (!isFinite(res) || isNaN(res)) {
        setResult('Error');
      } else {
          // Format to max 8 decimals to avoid floating point ugliness
          const formatted = String(Math.round(res * 100000000) / 100000000);
          setResult(formatted);
          setHistory(input + ' =');
      }
    } catch (e) {
      setResult('Error');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-[90] group animate-in slide-in-from-bottom-4 fade-in duration-500 focus:outline-none"
      >
        <div className="bg-white border-2 border-black px-6 py-3 rounded-full shadow-[4px_4px_0px_0px_black] transition-all group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_black] group-active:translate-y-0 group-active:shadow-[2px_2px_0px_0px_black] flex items-center gap-3">
           <Calculator className="w-5 h-5 text-black" />
           <span className="font-heading font-black text-xl tracking-tight text-black pb-1">calc.</span>
        </div>
      </button>
    );
  }

  const buttons = [
    { label: 'C', onClick: handleClear, style: 'bg-neo-red text-white' },
    { label: '%', onClick: () => handlePress('%'), style: 'bg-paper text-black' },
    { label: <Delete className="w-4 h-4"/>, onClick: handleDelete, style: 'bg-paper text-black' },
    { label: '÷', onClick: () => handlePress('/'), style: 'bg-neo-yellow text-black' },
    
    { label: '7', onClick: () => handlePress('7') },
    { label: '8', onClick: () => handlePress('8') },
    { label: '9', onClick: () => handlePress('9') },
    { label: '×', onClick: () => handlePress('*'), style: 'bg-neo-yellow text-black' },
    
    { label: '4', onClick: () => handlePress('4') },
    { label: '5', onClick: () => handlePress('5') },
    { label: '6', onClick: () => handlePress('6') },
    { label: '-', onClick: () => handlePress('-'), style: 'bg-neo-yellow text-black' },
    
    { label: '1', onClick: () => handlePress('1') },
    { label: '2', onClick: () => handlePress('2') },
    { label: '3', onClick: () => handlePress('3') },
    { label: '+', onClick: () => handlePress('+'), style: 'bg-neo-yellow text-black' },
    
    { label: '0', onClick: () => handlePress('0'), width: 'col-span-2' },
    { label: '.', onClick: () => handlePress('.') },
    { label: '=', onClick: handleCalculate, style: 'bg-neo-mint text-black border-black' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[90] animate-in zoom-in-95 duration-200 origin-bottom-right">
       <div className="bg-white border-2 border-black w-80 shadow-[8px_8px_0px_0px_black] overflow-hidden">
          {/* Header */}
          <div className="bg-neo-black text-white p-4 flex justify-between items-center border-b-2 border-black">
             <span className="font-heading font-black text-2xl tracking-tighter lowercase">calc.</span>
             <button onClick={handleToggle} className="hover:bg-white/20 p-1 rounded transition-colors focus:outline-none">
                <X className="w-5 h-5" />
             </button>
          </div>

          {/* Display */}
          <div className="bg-neutral-900 p-6 text-right border-b-2 border-black h-32 flex flex-col justify-end">
             <div className="text-slate-500 font-mono text-xs h-4 mb-1 truncate">{history}</div>
             <div className={`font-mono font-bold text-3xl tracking-widest truncate ${result ? 'text-neo-mint' : 'text-white'}`}>
                {/* Visual replacement for operators */}
                {(result || input).replace(/\*/g, '×').replace(/\//g, '÷')}
             </div>
          </div>

          {/* Keypad */}
          <div className="p-4 bg-paper grid grid-cols-4 gap-2">
             {buttons.map((btn, i) => (
               <button
                 key={i}
                 onClick={btn.onClick}
                 className={`
                    ${btn.width || ''} 
                    h-12 border-2 border-black font-bold font-mono text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] 
                    active:translate-y-[1px] active:shadow-none transition-all hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_0px_black]
                    flex items-center justify-center focus:outline-none
                    ${btn.style || 'bg-white text-black'}
                 `}
               >
                 {btn.label}
               </button>
             ))}
          </div>

          {/* Footer */}
          <div className="bg-neutral-100 p-2 text-center border-t-2 border-black">
             <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">Math only. Decisions are yours.</p>
          </div>
       </div>
    </div>
  );
};

export default CalculatorWidget;