"use client";

import React, { useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface SpecularButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export default function SpecularButton({ children, className = "", ...props }: SpecularButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden ${className.includes('bg-') ? '' : 'bg-gradient-to-r from-ravex-purple to-ravex-pink'} border border-white/20 text-white font-bold py-4 px-10 rounded-xl text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all ${className}`}
      {...props}
    >
      {/* Specular Glare / Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 mix-blend-overlay"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.8), transparent 40%)`,
        }}
      />
      
      {/* Colored Border Specular effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.2)`,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.8), transparent 50%)`,
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px'
        }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
