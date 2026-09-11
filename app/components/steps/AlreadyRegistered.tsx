import { PartyPopper } from "lucide-react";
import SpecularButton from "../SpecularButton";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface AlreadyRegisteredProps {
  onHome: () => void;
}

export default function AlreadyRegistered({ onHome }: AlreadyRegisteredProps) {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8 flex flex-col items-center justify-center text-center relative shadow-2xl animate-fade-in-up">
      <div className="w-16 h-16 bg-ravex-purple/20 rounded-full flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 bg-ravex-purple/20 rounded-full animate-ping" />
        <PartyPopper className="w-8 h-8 text-ravex-pink" />
      </div>

      <h2 className="text-3xl font-bold uppercase tracking-tight mb-4">
        You're Already In!
      </h2>
      
      <p className="text-gray-400 text-sm mb-8">
        This email is already registered on our waitlist. We can't wait to show you what we've been working on.
      </p>

      <SpecularButton 
        onClick={onHome}
        className="w-full"
      >
        Explore RaveX
      </SpecularButton>
    </div>
  );
}
