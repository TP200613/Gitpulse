import React, { useEffect, useRef } from "react";

export const GridMatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Array<{ x: number; y: number; baseOpacity: number; targetOpacity: number; speed: number; phase: number }> = [];

    const layout = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeMatrix();
    };

    const initializeMatrix = () => {
      points = [];
      const columns = Math.ceil(canvas.width / 40);
      const rows = Math.ceil(canvas.height / 40);

      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
          if (Math.random() > 0.88) {
            points.push({
              x: c * 40 + 20,
              y: r * 40 + 20,
              baseOpacity: Math.random() * 0.03,
              targetOpacity: Math.random() * 0.12,
              speed: 0.005 + Math.random() * 0.01,
              phase: Math.random() * Math.PI
            });
          }
        }
      }
    };

    window.addEventListener("resize", layout);
    layout();

    let frameId: number;
    const loop = () => {
      ctx.fillStyle = "#030407";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render micro structural linear tracks
      ctx.strokeStyle = "rgba(255, 255, 255, 0.006)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Dynamic Node updates
      points.forEach((p) => {
        p.phase += p.speed;
        const opacity = p.baseOpacity + (Math.sin(p.phase) + 1) * 0.5 * (p.targetOpacity - p.baseOpacity);
        
        ctx.fillStyle = `rgba(57, 211, 83, ${opacity})`;
        ctx.fillRect(p.x - 4, p.y - 4, 8, 8);
      });

      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", layout);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="grain-overlay absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030407]/40 to-[#030407]" />
    </div>
  );
};