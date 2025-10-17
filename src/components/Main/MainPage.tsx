import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import StatsSection from './sections/StatsSection/StatsSection';
import ValueProposition from './sections/ValueProposition/ValueProposition';
import BenefitsSection from './sections/BenefitsSection/BenefitsSection';
import AudienceSection from './sections/AudienceSection/AudienceSection';
import HowItWorksSection from './sections/HowItWorksSection/HowItWorksSection';
import SafetySection from './sections/SafetySection/SafetySection';
import CallToActionSection from './sections/CallToActionSection/CallToActionSection';
import FaqSection from './sections/FaqSection/FaqSection';
import Footer from '../Footer/Footer';

const MainPage: React.FC = () => {

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ValueProposition />
      <BenefitsSection />
      <AudienceSection />
      <HowItWorksSection />
      <SafetySection />
      <CallToActionSection />
      <FaqSection />
      <Footer />
    </main>
  );
};

export default MainPage;
