import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';

interface LandingPageProps {
  onSignIn: () => void;
}

export function LandingPage({ onSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSignIn={onSignIn}
        isAuthenticated={false}
      />
      <Hero />
      <Features />
      <Pricing onSignUp={onSignIn} />
    </div>
  );
}