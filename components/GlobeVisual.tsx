import React, { useEffect, useRef } from "react";

const GlobeVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let startTime: number | null = null;

    // Configuration
    const particleCount = 200; 
    const globeRadiusRatio = 0.25; 
    const connectionDistance = 50; 
    const formationDuration = 2500; 

    // State
    const particles: {
      targetX: number, targetY: number, targetZ: number,
      startX: number, startY: number, startZ: number,
      x: number, y: number, z: number
    }[] = [];

    const initParticles = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      } else {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }

      const radius = Math.min(width, height) * globeRadiusRatio;
      
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

        const tx = radius * Math.sin(phi) * Math.cos(theta);
        const ty = radius * Math.sin(phi) * Math.sin(theta);
        const tz = radius * Math.cos(phi);

        const side = Math.floor(Math.random() * 4);
        let sx, sy;
        if (side === 0) { sx = Math.random() * width - width/2; sy = -height/2 - 50; } 
        else if (side === 1) { sx = width/2 + 50; sy = Math.random() * height - height/2; } 
        else if (side === 2) { sx = Math.random() * width - width/2; sy = height/2 + 50; } 
        else { sx = -width/2 - 50; sy = Math.random() * height - height/2; } 

        particles.push({
          targetX: tx, targetY: ty, targetZ: tz,
          startX: sx, startY: sy, startZ: 0,
          x: sx, y: sy, z: 0
        });
      }
    };

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / formationDuration, 1);
      const easedProgress = easeOutCubic(progress);
      const rotationSpeed = 0.0005;
      const angle = (timestamp - startTime) * rotationSpeed;
      
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);

      const projectedPoints: {x: number, y: number, z: number}[] = [];

      particles.forEach(p => {
        let cx, cy, cz;
        if (progress < 1) {
          cx = p.startX + (p.targetX - p.startX) * easedProgress;
          cy = p.startY + (p.targetY - p.startY) * easedProgress;
          cz = p.startZ + (p.targetZ - p.startZ) * easedProgress;
        } else {
          cx = p.targetX;
          cy = p.targetY;
          cz = p.targetZ;
        }

        const rx = cx * Math.cos(angle) - cz * Math.sin(angle);
        const rz = cx * Math.sin(angle) + cz * Math.cos(angle);
        const ry = cy;

        const fov = 800;
        const scale = fov / (fov + rz);
        const px = rx * scale;
        const py = ry * scale;

        projectedPoints.push({ x: px, y: py, z: rz });

        const alpha = Math.max(0.1, (rz + (Math.min(width,height)*0.25)) / (Math.min(width,height)*0.5));
        ctx.beginPath();
        ctx.arc(px, py, 1.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 230, ${alpha})`;
        ctx.fill();
      });

      if (progress > 0.5) {
        ctx.strokeStyle = `rgba(0, 230, 153, ${0.15 * easedProgress})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i < projectedPoints.length; i++) {
          for (let j = i + 1; j < projectedPoints.length; j++) {
            const p1 = projectedPoints[i];
            const p2 = projectedPoints[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < connectionDistance) {
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
        ctx.stroke();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    initParticles();
    window.addEventListener('resize', initParticles);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', initParticles);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none" />;
};

export default GlobeVisual;