"use client";

import { useState, useEffect } from "react";
import LandingPage from "./steps/LandingPage";
import { supabase } from "@/lib/supabase";
import RegistrationForm from "./steps/RegistrationForm";
import EmailVerification from "./steps/EmailVerification";
import EmailVerified from "./steps/EmailVerified";
import ShortSurvey from "./steps/ShortSurvey";
import SuccessPage from "./steps/SuccessPage";

export default function FlowManager() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    genre: "",
    interests: [] as string[],
    base: "",
    source: "",
    position: 0,
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  
  // Listen for Magic Link sign-in
  useEffect(() => {
    // Try to restore form data on mount (in case they opened the link in the same browser)
    const saved = localStorage.getItem("ravex_form_data");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // User was authenticated (via OTP or magic link)
        setCurrentStep(4); // Go to EmailVerified step
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  if (currentStep === 1) {
    return <LandingPage onNext={nextStep} />;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black font-sans text-white flex flex-col items-center justify-center px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/rave-bg.jpg')" }}
      />
      
      {/* Overall Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-ravex-gradient pointer-events-none" />
      
      {/* Top Navigation / Branding */}
      <div className="absolute top-0 w-full p-6 sm:p-10 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black italic tracking-tighter">Rave<span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple pr-2">X</span></span>
        </div>
      </div>

      <div className="relative z-10 w-full flex justify-center">
        {currentStep === 2 && <RegistrationForm onNext={nextStep} onPrev={prevStep} formData={formData} updateFormData={updateFormData} />}
        {currentStep === 3 && <EmailVerification onNext={nextStep} email={formData.email} />}
        {currentStep === 4 && <EmailVerified onNext={nextStep} />}
        {currentStep === 5 && <ShortSurvey onNext={nextStep} onPrev={prevStep} formData={formData} updateFormData={updateFormData} />}
        {currentStep === 6 && <SuccessPage position={formData.position} />}
      </div>
    </main>
  );
}
