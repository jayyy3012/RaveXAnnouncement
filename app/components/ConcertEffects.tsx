"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ConcertEffects() {
  const [sparks, setSparks] = useState<Array<{ id: number; left: number; duration: number; delay: number; size: number; color: string }>>([]);

  useEffect(() => {
    const colors = ['bg-ravex-pink', 'bg-ravex-purple', 'bg-ravex-cyan', 'bg-white'];
    
    // Generate pyrotechnic sparks only on client to avoid hydration mismatch
    const generatedSparks = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      duration: Math.random() * 3 + 3, // 3 to 6 seconds
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2, // 2px to 6px
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setSparks(generatedSparks);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
      
      {/* Light Beams (Spotlights) */}
      <motion.div 
        className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[150%] bg-gradient-to-t from-ravex-purple/20 to-transparent transform -rotate-[25deg] origin-bottom blur-3xl"
        animate={{
          rotate: [-25, -15, -25],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[150%] bg-gradient-to-t from-ravex-pink/20 to-transparent transform rotate-[25deg] origin-bottom blur-3xl"
        animate={{
          rotate: [25, 15, 25],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Pyrotechnic Sparks Floating Up */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className={`absolute bottom-0 rounded-full ${spark.color}`}
          style={{
            left: `${spark.left}%`,
            width: spark.size,
            height: spark.size,
            boxShadow: `0 0 ${spark.size * 3}px ${spark.size}px currentColor`
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: [-20, -1200],
            opacity: [0, 1, 0],
            x: Math.random() > 0.5 ? [0, 100] : [0, -100]
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
