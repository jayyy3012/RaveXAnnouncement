import SpecularButton from "../SpecularButton";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface SuccessPageProps {
  position: number;
}

export default function SuccessPage({ position }: SuccessPageProps) {
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
    <div className="flex w-full max-w-4xl gap-8 items-center justify-between">
      <div className="glass-card w-full max-w-md rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative mx-auto">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple">You're All Set!</h2>
        <p className="text-gray-400 text-sm mb-6">
          Thanks for joining the RaveX<br/>early-access list.
        </p>

        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your Position</p>
          <p className="text-3xl font-bold text-white">#{String(position).padStart(6, '0')}</p>
        </div>

        <SpecularButton 
          onClick={() => window.location.href = "/"}
          className="w-full mb-8"
        >
          Explore RaveX
        </SpecularButton>

        <div>
          <p className="text-xs text-gray-500 mb-3">Follow our journey</p>
          <div className="flex gap-4 justify-center">
            <a href="https://www.instagram.com/ravex.live?stkn=emtpdWwwMGRjcjg4" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
              <span className="text-[10px]">IG</span>
            </a>
            <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
              <span className="text-[10px]">X</span>
            </div>
            <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
              <span className="text-[10px]">YT</span>
            </div>
            <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
              <span className="text-[10px]">DC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
