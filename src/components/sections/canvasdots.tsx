"use client";

import React, { useEffect, useRef } from "react";
// import './styles.css'; // Import the CSS file

const CanvasDots: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<{ x: number, y: number, vx: number, vy: number }[]>([]);
  let dotCount = 300;
  const dotRadius = 1.5;
  const escapeRadius = 100;
  const dampingFactor = 0.978; // Damping factor to reduce velocity
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const screenX = window.innerWidth;
    const screenY = window.innerHeight;

    canvas.width = screenX * devicePixelRatio;
    canvas.height = screenY * devicePixelRatio;
    canvas.style.width = `${screenX}px`;
    canvas.style.height = `${screenY}px`;

    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Initialize dots with random positions and velocities
    dotsRef.current = Array.from({ length: dotCount }, () => ({
      x: Math.random() * screenX,
      y: Math.random() * screenY,
      vx: (Math.random() - 0.5) * 2, // Random velocity in x direction
      vy: (Math.random() - 0.5) * 2, // Random velocity in y direction
    }));

    const drawDots = () => {
      ctx.clearRect(0, 0, screenX, screenY);
      dotsRef.current.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#222";
        ctx.fill();
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      dotsRef.current = dotsRef.current.map(dot => {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < escapeRadius) {
          const angle = Math.atan2(dy, dx);
          dot.vx = Math.cos(angle) * (escapeRadius - distance);
          dot.vy = Math.sin(angle) * (escapeRadius - distance);
        }

        return dot;
      });
    };

    const updateDots = () => {
      dotsRef.current = dotsRef.current.map(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Add some randomness to the velocity to simulate erratic movement
        dot.vx += (Math.random() - 0.5) * 0.2;
        dot.vy += (Math.random() - 0.5) * 0.2;

        // Apply damping to reduce velocity over time
        dot.vx *= dampingFactor;
        dot.vy *= dampingFactor;

        // Ensure dots stay within canvas bounds
        if (dot.x < dotRadius || dot.x > screenX - dotRadius) dot.vx *= -1;
        if (dot.y < dotRadius || dot.y > screenY - dotRadius) dot.vy *= -1;

        return dot;
      });

      drawDots();
      animationFrameId = requestAnimationFrame(updateDots);
    };

    drawDots();
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateDots);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas className="background-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasDots;