import { Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SpecularButton from "../SpecularButton";
import { supabase } from "@/lib/supabase";

interface EmailVerificationProps {
  onNext: () => void;
  email: string;
}

export default function EmailVerification({ onNext, email }: EmailVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async (otpCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid code provided');
      }
      
      onNext();
    } catch (err: any) {
      setError(err.message || 'Invalid code provided');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^[0-9]+$/.test(value)) return;

    const newOtp = [...otp];
    // Keep only the last character if multiple are entered somehow
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if complete
    const completeOtp = newOtp.join("");
    if (completeOtp.length === 6) {
      handleVerify(completeOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').substring(0, 6);
    
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      
      // Focus appropriate input or verify
      if (pastedData.length === 6) {
        inputRefs.current[5]?.focus();
        handleVerify(pastedData);
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setError(null);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to resend code');
      }

      setResendCooldown(60);
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    }
  };

  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative">
      <div className="w-16 h-16 rounded-full border border-ravex-purple flex items-center justify-center mb-6">
        <Mail className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Verify Your Email</h2>
      
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        We've sent a 6-digit code to<br/>
        <span className="text-ravex-cyan font-medium">{email || "jay@example.com"}</span>
      </p>

      <div className="flex gap-2 sm:gap-3 mb-6 w-full justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold text-white bg-black/50 border border-white/20 rounded-lg outline-none focus:border-ravex-purple focus:ring-1 focus:ring-ravex-purple transition-all"
            disabled={loading}
          />
        ))}
      </div>

      {error && (
        <div className="text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      <SpecularButton 
        onClick={() => handleVerify(otp.join(""))}
        disabled={loading || otp.join("").length !== 6}
        className="w-full mb-4 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify'}
      </SpecularButton>

      <button
        onClick={handleResend}
        disabled={resendCooldown > 0 || loading}
        className="text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-gray-400"
      >
        {resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : 'Resend Code'}
      </button>
    </div>
  );
}
