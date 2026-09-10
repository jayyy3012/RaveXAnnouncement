import { Check } from "lucide-react";
import SpecularButton from "../SpecularButton";

interface EmailVerifiedProps {
  onNext: () => void;
}

export default function EmailVerified({ onNext }: EmailVerifiedProps) {
  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative">
      <div className="w-16 h-16 rounded-full border border-ravex-pink flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-ravex-pink" />
      </div>

      <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">You're In.</h2>
      
      <p className="text-gray-400 text-sm mb-8">
        Welcome to RaveX!<br/>
        You're officially on the<br/>
        early-access list.
      </p>

      <div className="w-full glass-card-inner rounded-xl p-4 mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your Position</p>
        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple">
          #000127
        </p>
      </div>

      <p className="text-sm text-gray-400 mb-8">
        We'll let you know when RaveX<br/>
        is ready.
      </p>

      <SpecularButton 
        onClick={onNext}
        className="w-full"
      >
        Continue
      </SpecularButton>
    </div>
  );
}
