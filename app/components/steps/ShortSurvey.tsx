import { ArrowLeft, CheckSquare, Square } from "lucide-react";
import { useState } from "react";
import SpecularButton from "../SpecularButton";

interface ShortSurveyProps {
  onNext: () => void;
  onPrev: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

const SURVEY_OPTIONS = [
  "Discover new events",
  "Find artists & music",
  "Meet people with similar taste",
  "Track my music journey",
  "Discover new communities",
  "Everything"
];

export default function ShortSurvey({ onNext, onPrev, formData, updateFormData }: ShortSurveyProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (option: string) => {
    const current = formData.interests || [];
    if (current.includes(option)) {
      updateFormData({ interests: current.filter((i: string) => i !== option) });
    } else {
      if (current.length < 3 || option === "Everything") { // limit to 3 if not everything
        updateFormData({ interests: [...current, option] });
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      updateFormData({ position: data.position || 0 });
      onNext();
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card w-full max-w-md rounded-2xl p-8 flex flex-col relative shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onPrev}
          className="text-gray-400 hover:text-white flex items-center text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-tight">Help Us Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple">RaveX</span></h2>
        <p className="text-gray-400 text-sm mt-2">
          What interests you most?<br/>
          (Select up to 3)
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {SURVEY_OPTIONS.map((option) => {
          const isSelected = formData.interests?.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleInterest(option)}
              className={`flex items-center text-left p-4 rounded-lg border transition-colors ${
                isSelected 
                  ? "border-ravex-purple bg-ravex-purple/10 text-white" 
                  : "border-white/10 glass-card-inner text-gray-300 hover:border-white/30"
              }`}
            >
              {isSelected ? (
                <CheckSquare className="w-5 h-5 text-ravex-purple mr-3 flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
              )}
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>
      
      {error && (
        <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <SpecularButton 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </SpecularButton>
    </div>
  );
}
