import { ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import SpecularButton from "../SpecularButton";
import { supabase } from "@/lib/supabase";

interface RegistrationFormProps {
  onNext: () => void;
  onPrev: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export default function RegistrationForm({ onNext, onPrev, formData, updateFormData }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Save form data so it can be restored when they click the magic link
      localStorage.setItem("ravex_form_data", JSON.stringify(formData));

      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      onNext();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8 flex flex-col relative shadow-2xl">
      <button 
        onClick={onPrev}
        className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="text-center mt-8 mb-8">
        <h2 className="text-3xl font-bold uppercase tracking-tight">Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple">RaveX</span></h2>
        <p className="text-gray-400 text-sm mt-2">
          Be among the first to experience<br/>a new way to discover music.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Full Name (Optional)</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="Jay Chaudhari"
            className="glass-card-inner text-white rounded-lg px-4 py-3 outline-none focus:border-ravex-purple transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Email *</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="jay@example.com"
            className="glass-card-inner text-white rounded-lg px-4 py-3 outline-none focus:border-ravex-purple transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">City (Optional)</label>
          <select 
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="glass-card-inner text-white rounded-lg px-4 py-3 outline-none focus:border-ravex-purple transition-colors appearance-none"
          >
            <option value="" disabled>Select your city</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Favourite Music Genre (Optional)</label>
          <select 
            value={formData.genre}
            onChange={(e) => updateFormData({ genre: e.target.value })}
            className="glass-card-inner text-white rounded-lg px-4 py-3 outline-none focus:border-ravex-purple transition-colors appearance-none"
          >
            <option value="" disabled>Select genre</option>
            <option value="Electronic">Electronic</option>
            <option value="Techno">Techno</option>
            <option value="House">House</option>
            <option value="Trance">Trance</option>
          </select>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">
            {error}
          </div>
        )}

        <SpecularButton 
          type="submit"
          disabled={loading}
          className="w-full mt-4 disabled:opacity-50"
        >
          {loading ? 'Sending Code...' : 'Join Waitlist'}
        </SpecularButton>
      </form>
    </div>
  );
}
