import React, { useEffect, useRef } from 'react';

const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    // Configuration
    const spacing = 32; // Tighter grid
    const baseRadius = 1.5;
    const hoverRadius = 150; // Larger glow area

    const handleResize = () => {
      if (canvas.parentElement) {
        // Set actual canvas size to match display size for sharpness
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        if(e.touches.length > 0) {
            mouseX = e.touches[0].clientX - rect.left;
            mouseY = e.touches[0].clientY - rect.top;
        }
    }

    const draw = () => {
      // Clear canvas
      // Note: We use the scaled width/height for clearing
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);
      
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          
          // Calculate distance to mouse
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let currentRadius = baseRadius;
          let currentOpacity = 0.3; // Much clearer base state (30% opacity)
          
          if (dist < hoverRadius) {
            // Calculate intensity (0 to 1) based on distance
            const intensity = 1 - (dist / hoverRadius);
            // Ease the intensity for smoother glow
            const ease = intensity * intensity; 
            
            currentOpacity = 0.3 + (0.7 * ease); // Glow up to 100% opacity
            currentRadius = baseRadius + (1.5 * ease); // Grow slightly
            
            ctx.shadowBlur = 8 * ease;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          } else {
             ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();
        }
      }
      // Reset shadow for next frame to avoid state leakage if we add other things
      ctx.shadowBlur = 0; 
      
      animationFrameId = requestAnimationFrame(draw);
    };

    // Attach listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default DotGrid;