import React, { useEffect, useRef } from "react";

// Changed from "export const" to "export default function" to handle default fallback resolution
export default function GridMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // ... rest of your canvas drawing node calculation framework code