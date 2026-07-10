import type { Metadata } from 'next';
import './onboarding.css';
import OnboardingPortal from './onboarding-portal';

export const metadata: Metadata = {
  title: 'Client Onboarding — shubsss.dev',
  description:
    'Configure your upcoming website details, colors, catalog, and features through our premium onboarding portal.',
};

export default function OnboardingPage() {
  return <OnboardingPortal />;
}
