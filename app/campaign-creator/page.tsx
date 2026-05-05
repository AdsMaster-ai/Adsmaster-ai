'use client';

import { useState } from 'react';
import Step1Foundation from './../components/campaign-creator/Step1Foundation';
import Step2Ads from './../components/campaign-creator/Step2Ads';
import Step3Goals from './../components/campaign-creator/Step3Goals';
import Step4Keywords from './../components/campaign-creator/Step4Keywords';
import Step5Targeting from './../components/campaign-creator/Step5Targeting';
import Step6Launch from './../components/campaign-creator/Step6Launch';
import Navbar from '../../components/Navbar';
import Pricing from '../../components/Pricing';
import Footer from '../../components/Footer';

export default function CampaignCreator() {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    websiteUrl: '',
    goal: '',
    businessType: '',
    targetCity: '',
    dailyBudget: '',
    campaignName: '',
    headlines: ['', '', ''],
    descriptions: ['', ''],
    keywords: [],
    negativeKeywords: [],
    ageRange: '',
    device: '',
  });

  const updateData = (fields: Partial<typeof campaignData>) => {
    setCampaignData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
<div
  style={{
    width: '100%',
    minHeight: '100vh',
    padding: '28px 42px',
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg,#050814,#0b1224,#09101d)'
  }}
>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <Navbar />
              
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            background: 'linear-gradient(to right, #22d3ee, #a855f7)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            paddingTop: "5rem",
            textShadow: '0 0 15px rgba(34, 211, 238, 0.4)',
            margin: '0'
          }}>
            Create New Campaign
          </h1>
          <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>AI-Powered Setup • Step {step} of 6</p>
        </div>

        {/* Form Container with Glassmorphism Inline */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)'
        }}>

            
          {step === 1 && <Step1Foundation data={campaignData} updateData={updateData} nextStep={nextStep} />}
          {step === 2 && <Step2Ads data={campaignData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <Step3Goals data={campaignData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
          {step === 4 && <Step4Keywords data={campaignData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
          {step === 5 && <Step5Targeting data={campaignData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />}
          {step === 6 && <Step6Launch data={campaignData} prevStep={prevStep} />}
        </div>
      </div>
      <Pricing/>
      <Footer/>
    </div>
  );
}