import React, { useEffect, useRef } from "react";

const DNAVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
        const parent = canvas.parentElement;
        if(parent) {
            // Use client dimensions to avoid layout thrashing, scale for DPR
            const dpr = window.devicePixelRatio || 1;
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        }
    };

    const draw = () => {
        if (!canvas || !ctx) return;
        // Logic for unscaled coords
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.clearRect(0, 0, width, height);
        
        // DNA Configuration
        const strandCount = 25; // Number of base pairs
        const speed = 0.02;
        const amplitude = height * 0.25; // Dynamic height
        const spacing = width / strandCount; 
        const centerY = height / 2;
        
        t += speed;

        ctx.lineWidth = 3;

        for (let i = 0; i < strandCount + 5; i++) {
            // Extend slightly beyond width
            const x = (i * spacing) - (spacing * 2);
            
            // Calculate phases
            const phase = (i * 0.3) + t;
            const depth = Math.cos(phase); // -1 to 1 (back to front)
            
            // Calculate Y positions
            const y1 = centerY + Math.sin(phase) * amplitude;
            const y2 = centerY + Math.sin(phase + Math.PI) * amplitude;

            // Visual properties based on depth
            const scale = 1 + (depth * 0.3);
            const alpha = 0.2 + ((depth + 1) / 2) * 0.6; // 0.2 to 0.8 opacity
            
            // Draw Connector (Base pair)
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`; // Connector is fainter
            ctx.stroke();

            // Draw Strand 1 (Top/Bottom alternating)
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            // Square particles for NeoPOP feel
            const size1 = 8 * scale;
            ctx.rect(x - size1/2, y1 - size1/2, size1, size1);
            ctx.fill();

            // Draw Strand 2
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            const size2 = 8 * scale;
            ctx.rect(x - size2/2, y2 - size2/2, size2, size2);
            ctx.fill();
        }

        animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-overlay" />;
};

export default DNAVisual;